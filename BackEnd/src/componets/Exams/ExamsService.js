const { Exams } = require('./ExamsModel');

exports.AddExam=async(data,session)=>{
  try {
    let addedExam = await Exams.create(data,{session})
    return addedExam
  } catch (error) {
    throw error
  }
}

exports.UpdateExam=async(id,data,session)=>{
  try {
    let exam = await Exams.findByIdAndUpdate(id,data,{session,new:true})
    return exam
  } catch (error) {
    throw error
  }
}

exports.GetExamsCount=async()=>{
  try {
    let examsCount = await Exams.find().lean().count()
    return examsCount
  } catch (error) {
    throw error
  }
}

exports.GetExamById=async(id)=>{
  try {
    let exam = await Exams.findById(id).lean()
    return exam
  } catch (error) {
    throw error
  }
}

exports.GetAllExams=async()=>{
  try {
    let exams = await Exams.find({is_section:false}).lean()
    return exams
  } catch (error) {
    throw error
  }
}

exports.GetAllExamSections=async(id)=>{
  try {
    let sections = await Exams.find({parent_exam_id:id}).lean()
    return sections
  } catch (error) {
    throw error
  }
}

exports.GetAllCategoryExams=async(id)=>{
  try {
    let exams = await Exams.find({category_id:id}).lean()
    return exams
  } catch (error) {
    throw error
  }
}

exports.GetAllExamsPaginated=async(page,itemPerPage)=>{
  try {
    let exams = await Exams.find({}).lean().sort({ _id: -1 }).skip(page * itemPerPage).limit(itemPerPage)
    return exams
  } catch (error) {
    throw error
  }
}

exports.DeleteExam=async(id,session)=>{
  try {
    let deleteExam = await Exams.findByIdAndDelete(id,{session})
    return deleteExam
  } catch (error) {
    throw error
  }
}