const {
  ResponseSchema, MergeImageLink, SplitImageLink, PaginateSchema,
} = require('../../helper/HelperFunctions');
const { ErrorHandler, CheckValidIdObject } = require('../../helper/ErrorHandler');
const { AddExam,  GetAllExams, GetAllExamsPaginated, GetExamsCount, GetAllCategoryExams, GetExamById, DeleteExam, UpdateExam, GetAllExamSections } = require('./ExamsService');
const { default: mongoose } = require('mongoose');
const { GetCagtegoryById, UpdateCategory } = require('../Categories/CategoriesService');
const { GetUserById } = require('../Users/UsersService');
const jwt = require('jsonwebtoken');

const EXAM_MODEL =(exam)=>{
  return{
    id: exam._id,
    item_number: exam?.item_number,
    category_id: exam?.category_id,
    exam_sections: exam?.exam_sections,
    name: exam?.name,
    description: exam?.description,
    month: exam?.month,
    year: exam?.year,
    status:exam?.status,
    has_sections:exam?.has_sections,
  }
}

exports.createExam = async(req, res) => {
  const { name ,description ,month,year,status,category_id,has_sections ,is_section,parent_exam_id} = req.body;
  
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

  if(category_id){
    if (!CheckValidIdObject(req, res, category_id, req.t('Category Id is Invalid'))) return;
    const category = await GetCagtegoryById(category_id)
    if(!category){
      return res.status(404).json(ResponseSchema(req.t('Category doesn\'t exist'), false));
    }
  }
  const session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    let addedData=[{
      user_id:authedUser?.user_id,
      name,
      description,
      month,
      year,
      category_id,
      has_sections,
      is_section,
      parent_exam_id,
      status
    }]
    const addedExam = await AddExam(addedData,session)
    if(category_id){
      const updatedData= {
          $push:{children_exams:addedExam?.[0]?._id}
        }
      await UpdateCategory(category_id,updatedData,session)
    }

    await session.commitTransaction();
    return res.status(201).json(ResponseSchema(req.t('Exam Added Successfully'), true))
  } catch (error) {
    await session.abortTransaction();
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), true, ErrorHandler(error)))
  } finally {
    session.endSession();
  }
};

exports.updateExam = async (req, res) => {
  const { name ,description ,month,year,status,category_id,has_sections,is_section,parent_exam_id} = req.body;
  const { params:{id}} = req;

  if (!CheckValidIdObject(req, res, id, req.t('Exam Id is Invalid'))) return;
  const exam = await GetExamById(id);
  if (!exam) {
    return res.status(404).json(ResponseSchema(req.t('Exam doesn\'t exist'), false));
  }
  if(category_id){
    if (!CheckValidIdObject(req, res, category_id, req.t('Category Id is Invalid'))) return;
    const parentCategory = await GetCagtegoryById(category_id)
    if(!parentCategory){
      return res.status(404).json(ResponseSchema(req.t('Category doesn\'t exist'), false));
    }
  }

  const session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    let updatedData = {
      name,
      description,
      month,
      year,
      category_id,
      has_sections,
      is_section,
      parent_exam_id,
      status
    }
    if(exam?.category_id !=category_id &&category_id){
      updatedData.category_id = category_id
    }

    let x =await UpdateExam(id,updatedData,session)
    console.log('x',x)
    if(exam?.category_id !=category_id &&category_id){
      const updatedAddedCategoryData = {
        $push:{children_exams:exam?._id}
      }
      const updateDeletedCategory = {
        $pull:{children_exams:id}
      }
      await UpdateCategory(exam?.category_id,updateDeletedCategory,session)

      await UpdateCategory(category_id,updatedAddedCategoryData,session)
    }

    await session.commitTransaction();
    return res.status(201).json(ResponseSchema(req.t('Exam Updated Successfully'), true))
  } catch (error) {
    await session.abortTransaction();
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), true, ErrorHandler(error)))
  } finally {
    session.endSession();
  }
};

exports.createSection = async(req, res) => {
  const { name ,description ,status,exam_id} = req.body;
  
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

    if (!CheckValidIdObject(req, res, exam_id, req.t('Exam Id is Invalid'))) return;
    const exam = await GetExamById(exam_id)
    if(!exam){
      return res.status(404).json(ResponseSchema(req.t('Exam doesn\'t exist'), false));
    }
  const session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    let addedData=[{
      user_id:authedUser?.user_id,
      name,
      description,
      parent_exam_id:exam_id,
      is_section:true,
      status
    }]
    const addedSection = await AddExam(addedData,session)

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
  const section = await GetExamById(id);
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

    let x =await UpdateExam(id,updatedData,session)

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

exports.getAllExams = async(req, res) => {
  try {
    let exams = await GetAllExams()
    const sendedObject = exams.map((exam) => {
      return EXAM_MODEL(exam)
    });
    return res.status(200).json(ResponseSchema(req.t('Exams'), true, sendedObject));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.getAllExamSections = async(req, res) => {
  const {id} = req?.params
    if (!CheckValidIdObject(req, res, id, req.t('Exam Id is Invalid'))) return;
    const exam = await GetExamById(id)
    if(!exam){
      return res.status(404).json(ResponseSchema(req.t('Exam doesn\'t exist'), false));
    }
  try {
    let sections = await GetAllExamSections(id)

    const sendedObject = sections.map((section) => {
      return EXAM_MODEL(section)
    });
    return res.status(200).json(ResponseSchema(req.t('Sections'), true, sendedObject));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.getExam = async(req, res) => {
  const { params:{id}} = req;
  if (!CheckValidIdObject(req, res, id, req.t('Exam Id is Invalid'))) return;
  
  try {
  const exam = await GetExamById(id);
  if (!exam) {
    return res.status(404).json(ResponseSchema(req.t('Exam doesn\'t exist'), false));
  }
    // const sendedObject = exams.map((exam) => {
    //   return EXAM_MODEL(exam)
    // });
    return res.status(200).json(ResponseSchema(req.t('Exams'), true, exam));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.getAllCategoryExams = async(req, res) => {
  const {id} = req?.params
    if (!CheckValidIdObject(req, res, id, req.t('Category Id is Invalid'))) return;
    const category = await GetCagtegoryById(id)
    if(!category){
      return res.status(404).json(ResponseSchema(req.t('Category doesn\'t exist'), false));
    }
  try {
    let exams = await GetAllCategoryExams(id)
    const sendedObject = exams.map((exam) => {
      return EXAM_MODEL(exam)
    });
    return res.status(200).json(ResponseSchema(req.t('Exams'), true, sendedObject));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.getAllExamsWithPagination = async (req, res) => {
  const lang = req.headers['accept-language'] || 'en';

  const page = req.query.page - 1 || 0;
  const itemPerPage = req.query.limit || 10;
  const count = await GetExamsCount();
  const pages = Math.ceil(count / itemPerPage);
  try {
    let exams= await GetAllExamsPaginated(page , itemPerPage)
    const sendedObject = exams.map((exam) => {
      return EXAM_MODEL(exam)
    });
    return res.status(200).json(ResponseSchema(req.t('Exams'), true, PaginateSchema(page + 1, pages, count, sendedObject)));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), false, ErrorHandler(error)))
  }
};

exports.deleteExam = async (req, res) => {
  const { id } =req.params

    if (!CheckValidIdObject(req, res, id, req.t('Exam Id is Invalid'))) return;

  const exam = await GetExamById(id);
  if (!exam) {
    return res.status(400).json(ResponseSchema(req.t('Exam Id is wrong'), false));
  }
  if(exam?.exam_sections?.length!=0){
    return res.status(400).json(ResponseSchema(req.t('Can\'t Delete Exam.It Has Children Sections'), false));
  }
  const session = await mongoose.connection.startSession();
  try {
    
    session.startTransaction();
    await DeleteExam(id,session)
    if(exam?.category_id){
      const updatedData = {
        $pull:{children_exams:id}
      }
      await UpdateCategory(exam?.category_id,updatedData,session)
    }
    if(exam?.parent_exam_id){
      const updatedData = {
        $pull:{exam_sections:id}
      }
      await UpdateExam(exam?.parent_exam_id,updatedData,session)
    }
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


exports.addExamConfiguration = async(req, res) => {
  const { 
    exam_time,
    exam_available_for_who,
    exam_available_for_who_groups,
    no_of_generated_code,
    exam_available_for_when,
    exam_available_for_when_start_date,
    exam_available_for_when_end_date,
    show_exam_questions,
    show_exam_correct_answer,
    question_numbers,
    question_alpha,
    questions,
  } = req.body;
  const { params:{id}} = req;

  if (!CheckValidIdObject(req, res, id, req.t('Exam Id is Invalid'))) return;
  const exam = await GetExamById(id);
  if (!exam) {
    return res.status(404).json(ResponseSchema(req.t('Exam doesn\'t exist'), false));
  }
  
  const session = await mongoose.connection.startSession();
  try {
    session.startTransaction();
    const updatedQuestions = questions?.map((question)=>{
      const questionAnswers = question?.answers?.map(answer=>{
        return{
          answer_value:answer?.answer_value,
          is_correct_answer:answer?.is_correct_answer,
        }
      })
      return{
          question_mark:question?.question_mark,
          screen_type:question?.screen_type,
          answer_type:question?.answer_type,
          question_information:question?.question_information,
          question_name:question?.question_name,
          question_correct_answer:question?.question_correct_answer,
          question_answers:questionAnswers
      }
    })
    let updatedData = {
      exam_configuration:{
        exam_time,
        exam_available_for_who,
        exam_available_for_who_groups,
        no_of_generated_code,
        exam_available_for_when,
        exam_available_for_when_start_date,
        exam_available_for_when_end_date,
        show_exam_questions,
        show_exam_correct_answer,
      },
      question_configration:{
        question_numbers,
        question_alpha,
      },
      questions:updatedQuestions
    }
    let updatedExam =await UpdateExam(id,updatedData,session)

    await session.commitTransaction();
    return res.status(201).json(ResponseSchema(req.t('Exam Questions Updated Successfully'), true,updatedExam))
  } catch (error) {
    await session.abortTransaction();
    console.log(error)
    return res.status(400).json(ResponseSchema(req.t('Somethings Went wrong'), true, ErrorHandler(error)))
  } finally {
    session.endSession();
  }
};