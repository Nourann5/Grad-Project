const { Sections } = require('./SectionsModel');

exports.AddSection=async(data,session)=>{
  try {
    let addedSection = await Sections.create(data,{session})
    return addedSection
  } catch (error) {
    throw error
  }
}

exports.UpdateSection=async(id,data,session)=>{
  try {
    let section = await Sections.findByIdAndUpdate(id,data,{session,new:true})
    return section
  } catch (error) {
    throw error
  }
}

exports.GetSectionsCount=async()=>{
  try {
    let sectionsCount = await Sections.find().lean().count()
    return sectionsCount
  } catch (error) {
    throw error
  }
}

exports.GetSectionById=async(id)=>{
  try {
    let section = await Sections.findById(id).lean()
    return section
  } catch (error) {
    throw error
  }
}

exports.GetAllSections=async()=>{
  try {
    let sections = await Sections.find({}).lean()
    return sections
  } catch (error) {
    throw error
  }
}

exports.GetAllExamSections=async(id)=>{
  try {
    let sections = await Sections.find({exam_id:id}).lean()
    return sections
  } catch (error) {
    throw error
  }
}

exports.GetAllSectionsPaginated=async(page,itemPerPage)=>{
  try {
    let sections = await Sections.find({}).lean().sort({ _id: -1 }).skip(page * itemPerPage).limit(itemPerPage)
    return sections
  } catch (error) {
    throw error
  }
}

exports.DeleteSection=async(id,session)=>{
  try {
    let deleteSection = await Sections.findByIdAndDelete(id,{session})
    return deleteSection
  } catch (error) {
    throw error
  }
}