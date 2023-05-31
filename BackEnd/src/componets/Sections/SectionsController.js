const {
  ResponseSchema, MergeImageLink, SplitImageLink, PaginateSchema,
} = require('../../helper/HelperFunctions');
const { ErrorHandler, CheckValidIdObject } = require('../../helper/ErrorHandler');
const { AddSection, GetAllSections, GetAllExamSections, GetSectionsCount, GetAllSectionsPaginated, GetSectionById, UpdateSection, DeleteSection } = require('./SectionsService');
const { default: mongoose } = require('mongoose');
const { GetExamById, UpdateExam } = require('../Exams/ExamsService');
const jwt = require('jsonwebtoken');
const { GetUserById } = require('../Users/UsersService');

const SECTION_MODEL =(exam)=>{
  return{
    id: exam._id,
    item_number: exam.item_number,
    exam_id: exam?.exam_id,
    name: exam?.name,
    description: exam?.description,
    status:exam?.status,
  }
}

exports.createSection = async(req, res) => {
  const { name ,description ,status,exam_id} = req.body;
    if (!CheckValidIdObject(req, res, exam_id, req.t('Exam Id is Invalid'))) return;
    const exam = await GetExamById(exam_id)
    if(!exam){
      return res.status(404).json(ResponseSchema(req.t('Exam doesn\'t exist'), false));
    }
    
    const token = req?.headers?.authorization?.split(' ')?.[1]
    const authedUser = jwt.decode(token);

    if (!CheckValidIdObject(req, res, authedUser?.user_id, req.t('User Id is Invalid'))) return;
    const user = await GetUserById(authedUser?.user_id)
    if(!user){
      return res.status(404).json(ResponseSchema(req.t('User doesn\'t exist'), false));
    }
    if(user?.user_type ==1){
      return res.status(404).json(ResponseSchema(req.t('You Don\'t Have Permission To Add Category'), false));
    }
  const session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    let addedData=[{
      name,
      user_id:authedUser?.user_id,
      description,
      exam_id,
      status
    }]
    const addedSection = await AddSection(addedData,session)
    const updatedData= {
        $push:{exam_sections:addedSection?.[0]?._id}
      }
    await UpdateExam(exam_id,updatedData,session)

    await session.commitTransaction();
    return res.status(201).json(ResponseSchema(req.t('Section Added Successfully'), true,addedSection))
  } catch (error) {
    await session.abortTransaction();
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), true, ErrorHandler(error)))
  } finally {
    session.endSession();
  }
};

exports.updateSection = async (req, res) => {
  const { name ,description ,status} = req.body;
  const { params:{id}} = req;

  const token = req?.headers?.authorization?.split(' ')?.[1]
  const authedUser = jwt.decode(token);

  if (!CheckValidIdObject(req, res, authedUser?.user_id, req.t('User Id is Invalid'))) return;
  const user = await GetUserById(authedUser?.user_id)
  if(!user){
    return res.status(404).json(ResponseSchema(req.t('User doesn\'t exist'), false));
  }
  if(user?.user_type ==1){
    return res.status(404).json(ResponseSchema(req.t('You Don\'t Have Permission To Add Category'), false));
  }

  if (!CheckValidIdObject(req, res, id, req.t('Section Id is Invalid'))) return;
  const section = await GetSectionById(id);
  if (!section) {
    return res.status(404).json(ResponseSchema(req.t('Section doesn\'t exist'), false));
  }
  
  const session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    let updatedData = {
      user_id:authedUser?.user_id,
      name,
      description,
      status
    }

    let x =await UpdateSection(id,updatedData,session)

    await session.commitTransaction();
    return res.status(201).json(ResponseSchema(req.t('Section Updated Successfully'), true))
  } catch (error) {
    await session.abortTransaction();
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), true, ErrorHandler(error)))
  } finally {
    session.endSession();
  }
};

exports.getAllSections = async(req, res) => {
  try {
    let sections = await GetAllSections()
    const sendedObject = sections.map((section) => {
      return SECTION_MODEL(section)
    });
    return res.status(200).json(ResponseSchema(req.t('Sections'), true, sendedObject));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.getAllExamsSections = async(req, res) => {
  const {id} = req?.params
    if (!CheckValidIdObject(req, res, id, req.t('Exam Id is Invalid'))) return;
    const exam = await GetExamById(id)
    if(!exam){
      return res.status(404).json(ResponseSchema(req.t('Exam doesn\'t exist'), false));
    }
  try {
    let sections = await GetAllExamSections(id)
    const sendedObject = sections.map((section) => {
      return SECTION_MODEL(section)
    });
    return res.status(200).json(ResponseSchema(req.t('Sections'), true, sendedObject));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.getAllSectionsWithPagination = async (req, res) => {
  const lang = req.headers['accept-language'] || 'en';

  const page = req.query.page - 1 || 0;
  const itemPerPage = req.query.limit || 10;
  const count = await GetSectionsCount();
  const pages = Math.ceil(count / itemPerPage);
  try {
    let sections= await GetAllSectionsPaginated(page , itemPerPage)
    const sendedObject = sections.map((section) => {
      return SECTION_MODEL(section)
    });
    return res.status(200).json(ResponseSchema(req.t('Sections'), true, PaginateSchema(page + 1, pages, count, sendedObject)));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.deleteSection = async (req, res) => {
  const { id } =req.params

    if (!CheckValidIdObject(req, res, id, req.t('Section Id is Invalid'))) return;
  const section = await GetSectionById(id);
  if (!section) {
    return res.status(400).json(ResponseSchema(req.t('Section Id is wrong'), false));
  }

  const session = await mongoose.connection.startSession();
  try {
    
    session.startTransaction();
    await DeleteSection(id,session)
      const updatedData = {
        $pull:{exam_sections:id}
      }
      await UpdateExam(section?.exam_id,updatedData,session)
    await session.commitTransaction();
    return res.status(201).json(ResponseSchema(req.t('Exam Deleted Successfully'), true))
  } catch (error) {
    console.log(error)
    await session.abortTransaction();
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  } finally {
    session.endSession();
  }
};