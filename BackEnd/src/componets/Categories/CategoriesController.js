const {
  ResponseSchema, MergeImageLink, SplitImageLink, PaginateSchema,
} = require('../../helper/HelperFunctions');
const { ErrorHandler, CheckValidIdObject } = require('../../helper/ErrorHandler');
const { AddCategory, GetCagtegoryById, UpdateCategory, GetAllCagtegories,
  GetCagtegoriesCount, GetAllCagtegoriesPaginated, DeleteCategory, GetAllUserCagtegories } = require('./CategoriesService');
const { DeleteImage } = require('../../helper/DeleteImage');
const { default: mongoose } = require('mongoose');
const { GetUserById } = require('../Users/UsersService');
const jwt = require('jsonwebtoken');

exports.createCategory = async(req, res) => {
  const { title_en ,title_ar ,parent_category_id,status } = req.body;
  const { file } = req;
  const token = req?.headers?.authorization?.split(' ')?.[1]
  const authedUser = jwt.decode(token);

  if(parent_category_id){
    if (!CheckValidIdObject(req, res, parent_category_id, req.t('Category Id is Invalid'))) return;
    const category = await GetCagtegoryById(parent_category_id)
    if(!category){
      return res.status(404).json(ResponseSchema(req.t('Parent Category doesn\'t exist'), false));
    }
  }
  if (!CheckValidIdObject(req, res, authedUser?.user_id, req.t('User Id is Invalid'))) return;
  const user = await GetUserById(authedUser?.user_id)
  if(!user){
    return res.status(404).json(ResponseSchema(req.t('User doesn\'t exist'), false));
  }
  if(user?.user_type ==1){
    return res.status(404).json(ResponseSchema(req.t('You Don\'t Have Permission To Add Category'), false));
  }
  // if(categories){
  //   categories?.forEach(async(category)=>{
  //     if (!CheckValidIdObject(req, res, category, req.t('Category Id is Invalid'))) return;
  //     const category = await GetCagtegoryById(category)
  //   })
  // }
  const session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    let addedData=[{
      'translation.en.title': title_en,
      'translation.ar.title': title_ar,
      image: file?.filename,
      parent_category:parent_category_id,
      user_id:authedUser?.user_id,
      status
    }]
    const addedCategory = await AddCategory(addedData,session)
    if(parent_category_id){
      const updatedData= {
          $push:{children_categories:addedCategory?.[0]?._id}
        }
      await UpdateCategory(parent_category_id,updatedData,session)
    }

    await session.commitTransaction();
    return res.status(201).json(ResponseSchema(req.t('Category Added Successfully'), true))
  } catch (error) {
    await session.abortTransaction();
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), true, ErrorHandler(error)))
  } finally {
    session.endSession();
  }
};

exports.updateCategory = async (req, res) => {
  const { title_en ,title_ar ,image ,parent_category_id,status} = req.body;

  const { file ,params:{id}} = req;

  if (!CheckValidIdObject(req, res, id, req.t('Category Id is Invalid'))) return;
  const category = await GetCagtegoryById(id);
  if (!category) {
    return res.status(404).json(ResponseSchema(req.t('Category doesn\'t exist'), false));
  }
  if(parent_category_id){
    if (!CheckValidIdObject(req, res, parent_category_id, req.t('Category Id is Invalid'))) return;
    const parentCategory = await GetCagtegoryById(parent_category_id)
    if(!parentCategory){
      return res.status(404).json(ResponseSchema(req.t('Parent Category doesn\'t exist'), false));
    }
  }

  const session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    let updatedData = {
      'translation.en.title': title_en,
      'translation.ar.title': title_ar,
      image: file ? file?.filename : image && SplitImageLink(req, image) ,
      parent_category:parent_category_id,
      status
    }
    if(category?.parent_category !=parent_category_id ){
      updatedData.parent_category = parent_category_id
    }

    await UpdateCategory(id,updatedData,session)
    if(category?.parent_category !=parent_category_id ){
      const updatedAddedCategoryData = {
        $push:{children_categories:category?._id}
      }
      const updateDeletedCategory = {
        $pull:{children_categories:id}
      }
      await UpdateCategory(category?.parent_category,updateDeletedCategory,session)

      await UpdateCategory(parent_category_id,updatedAddedCategoryData,session)
    }

    if(file){
      await DeleteImage(category?.image)
    }
    await session.commitTransaction();
    return res.status(201).json(ResponseSchema(req.t('Category Updated Successfully'), true))
  } catch (error) {
    await session.abortTransaction();
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), true, ErrorHandler(error)))
  } finally {
    session.endSession();
  }
};

exports.getAllCategories = async(req, res) => {
  const lang = req.headers['accept-language'] || 'en';
  try {
    let categories = await GetAllCagtegories()
    const sendedObject = categories.map((category) => ({
      id: category._id,
      item_number: category?.item_number,
      children_categories: category?.children_categories,
      children_exams: category?.children_exams,
      parent_category: category?.parent_category,
      title: category?.translation?.[`${lang}`]?.title,
      status:category?.status,
      image: category?.image ? MergeImageLink(req, category?.image) : '',
    }));
    return res.status(200).json(ResponseSchema(req.t('Categories'), true, sendedObject));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.getAllUserCategories = async(req, res) => {
  const lang = 'en';
  // const lang = req.headers['accept-language'] || 'en';
  const {user_id ,category_id} = req?.query
  if (!CheckValidIdObject(req, res, user_id, req.t('User Id is Invalid'))) return;
  try {
    
    let query = {user_id:user_id ,'parent_category': category_id!='null'? category_id:null}
    console.log(query )
    let categories = await GetAllUserCagtegories(query)
    const sendedObject = categories.map((category) => ({
      id: category._id,
      item_number: category?.item_number,
      children_categories: category?.children_categories,
      children_exams: category?.children_exams,
      parent_category: category?.parent_category?._id,
      parent_category_title: category?.parent_category?.translation?.[`${lang}`]?.title,
      title: category?.translation?.[`${lang}`]?.title,
      status:category?.status,
      image: category?.image ? MergeImageLink(req, category?.image) : '',
      // created_at:moment(notification?.created_at).locale(notification?.user_id?.current_language?notification?.user_id?.current_language:'en').format('MMMM Do YYYY, h:mm:ss a'),
    }));
    return res.status(200).json(ResponseSchema(req.t('Categories'), true, sendedObject));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.getAllCategoriesWithPagination = async (req, res) => {
  const lang = req.headers['accept-language'] || 'en';

  const page = req.query.page - 1 || 0;
  const itemPerPage = req.query.limit || 10;
  const count = await GetCagtegoriesCount();
  const pages = Math.ceil(count / itemPerPage);
  try {
    let categories= await GetAllCagtegoriesPaginated(page , itemPerPage)
    const sendedObject = categories.map((item) => ({
      title: item?.translation[`${lang}`]?.title,
      item_number: category?.item_number,
      id: item?._id,
      children_categories: item?.children_categories,
      children_exams: item?.children_exams,
      parent_category: item?.parent_category,
      title_en: item?.translation?.en?.title,
      title_ar: item?.translation?.ar?.title,
      title_ur: item?.translation?.ur?.title,
      status:item?.status,
      image: item?.image ? MergeImageLink(req, item?.image) : '',
    }));
    return res.status(200).json(ResponseSchema(req.t('Categories'), true, PaginateSchema(page + 1, pages, count, sendedObject)));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.deleteCategory = async (req, res) => {
  const { id } =req.params
    if (!CheckValidIdObject(req, res, id, req.t('Category Id is Invalid'))) return;

  const category = await GetCagtegoryById(id);

  if (!category) {
    return res.status(400).json(ResponseSchema(req.t('Category Id is wrong'), false));
  }
  if(category?.children_categories?.length!=0){
    return res.status(400).json(ResponseSchema(req.t('Can\'t Delete Category.It Has Children Categories'), false));
  }
  if(category?.children_exams?.length!=0){
    return res.status(400).json(ResponseSchema(req.t('Can\'t Delete Category.It Has Exams'), false));
  }
  const session = await mongoose.connection.startSession();
  try {
    
    session.startTransaction();
    await DeleteCategory(id,session)
    await DeleteImage(category?.image)
    if(category?.parent_category){
      const updatedData = {
        $pull:{children_categories:id}
      }
      await UpdateCategory(category?.parent_category,updatedData,session)
    }
    await session.commitTransaction();
    return res.status(201).json(ResponseSchema(req.t('Category Deleted Successfully'), true))
  } catch (error) {
    console.log(error)
    await session.abortTransaction();
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  } finally {
    session.endSession();
  }
};