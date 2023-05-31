const { User } = require('./UsersModel');

exports.AddUser =async(data)=>{
  try {
    let addedUser = await User.create(data )
    return addedUser
  } catch (error) {
    throw error
  }
}

exports.UpdateUser =async(id,data)=>{
  try {
    let updatedUser = await User.findByIdAndUpdate(id,data)
    return updatedUser
  } catch (error) {
    throw error
  }
}

exports.UpdateUserSession =async(id,data,session)=>{
  try {
    let updatedUser = await User.findByIdAndUpdate(id,data,{new:true,session})
    return updatedUser
  } catch (error) {
    throw error
  }
}

exports.GetUserByQuery =async(query)=>{
  try {
    let user = await User.findOne(query);
    return user
  } catch (error) {
    throw error
  }
}

exports.GetUserById =async(id)=>{
  try {
    let user = await User.findById(id)
    return user
  } catch (error) {
    throw error
  }
}

exports.GetUserByIdProductsPopulated =async(id)=>{
  try {
    let user = await User.findById(id).populate({path:'favorited_products',populate:[{path:'reviews.user_id'},{path:'provider_id'}]})
    return user
  } catch (error) {
    throw error
  }
}

exports.GetUsersCount =async()=>{
  try {
    let userCount = await User.find().count()
    return userCount
  } catch (error) {
    throw error
  }
}

exports.GetAllUsersPaginated =async(page,itemPerPage)=>{
  try {
    let users = await User.find({}).sort({ _id: -1 }).skip(page * itemPerPage).limit(itemPerPage)
    return users
  } catch (error) {
    throw error
  }
}
exports.GetAllTeachers =async()=>{
  try {
    let users = await User.find({user_type:'teacher'}).sort({ _id: -1 })
    return users
  } catch (error) {
    throw error
  }
}

exports.DeleteUser =async(userId)=>{
  try {
    let users = await User.findByIdAndDelete(userId)
    return users
  } catch (error) {
    throw error
  }
}