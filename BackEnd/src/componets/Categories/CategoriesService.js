const { Categories } = require('./CategoriesModel');

exports.AddCategory=async(data,session)=>{
  try {
    let addedCategory = await Categories.create(data,{session})
    return addedCategory
  } catch (error) {
    throw error
  }
}

exports.UpdateCategory=async(id,data,session)=>{
  try {
    let category = await Categories.findByIdAndUpdate(id,data,{session})
    return category
  } catch (error) {
    throw error
  }
}

exports.GetCagtegoriesCount=async()=>{
  try {
    let categoriesCount = await Categories.find().lean().count()
    return categoriesCount
  } catch (error) {
    throw error
  }
}

exports.GetCagtegoryById=async(id)=>{
  try {
    let category = await Categories.findById(id).lean()
    return category
  } catch (error) {
    throw error
  }
}

exports.GetAllCagtegories=async()=>{
  try {
    let categories = await Categories.find({}).lean()
    return categories
  } catch (error) {
    throw error
  }
}
exports.GetAllUserCagtegories=async(query)=>{
  try {
    let categories = await Categories.find(query).populate('parent_category').lean()
    return categories
  } catch (error) {
    throw error
  }
}

exports.GetAllCagtegoriesPaginated=async(page,itemPerPage)=>{
  try {
    let categories = await Categories.find({}).lean().sort({ _id: -1 }).skip(page * itemPerPage).limit(itemPerPage)
    return categories
  } catch (error) {
    throw error
  }
}

exports.DeleteCategory=async(id,session)=>{
  try {
    let deleteCategory = await Categories.findByIdAndDelete(id,{session})
    return deleteCategory
  } catch (error) {
    throw error
  }
}