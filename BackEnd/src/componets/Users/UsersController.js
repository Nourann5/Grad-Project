const jwt = require('jsonwebtoken');
const { ResponseSchema, MergeImageLink, PaginateSchema, SplitImageLink } = require('../../helper/HelperFunctions');
const { ErrorHandler, CheckValidIdObject } = require('../../helper/ErrorHandler');
const { GetUserByQuery, UpdateUser, AddUser, GetUserById, GetAllUsersPaginated, DeleteUser, GetUsersCount, GetUserByIdProductsPopulated, GetAllTeachers } = require('./UsersService');
const NodeGeocoder = require('node-geocoder');
const distance = require('google-distance-matrix');
const bcrypt = require('bcrypt');

const options = {
  provider: 'google',
  apiKey: process.env.GOOGLE_API_KEY,
  formatter: null,
  language: 'en',
};
distance.key(process.env.GOOGLE_API_KEY);

exports.createUser = async (req, res) => {
  const {name,email,password,confirm_password,user_type} = req.body;
  const verififedCode = Math.floor(1000 + Math.random() * 900000);
  if(password !=confirm_password){
    return res.status(400).json(ResponseSchema('Confirm Password Doesn\'t Equal Password', false));
  }

  try {
    let addedData = {
      name: name,
      email: email,
      password: bcrypt.hashSync(password, bcrypt.genSaltSync()),
      user_type: user_type,
      verififed_code: {
        code: verififedCode,
      },
    }
    const createdUser = await AddUser(addedData)
    const token = jwt.sign({
      user_id:createdUser?._id,
      user: createdUser,
    }, process.env.JWT_SECRET);

    return res.status(201).json(ResponseSchema('User Created Successfully', true,{token,user:{id:createdUser?._id,name:createdUser?.name,email:createdUser?.email}}));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)));
  } 
};

exports.loginUser = async (req, res) => {
  const {email ,password} = req.body;
  const user = await GetUserByQuery({ email: email });
  if (user) {
    if (bcrypt.compareSync(password, user?.password)) {
      if (user?.status == 2) {
        return res.status(400).json(ResponseSchema('User is not active. Please contact admins', false));
      }
      const token = jwt.sign({
        user_id:user?._id,
        user,
      }, process.env.JWT_SECRET);
      return res.status(201).json(ResponseSchema('Login Successfully', true, {token,user:{id:user?._id,name:user?.name,email:user?.email}}))
    }else{
      return res.status(400).json(ResponseSchema('User Password Is Wrong', false));
    }
  } else {
    return res.status(400).json(ResponseSchema('User Email Doesn\'t Exist', false));
  }
};

exports.updateUser = async (req, res) => {
  const {name,email,password,confirm_password,personal_photo:personal_photo_body} = req.body;
  // const {name,whatsapp_number,current_latitude,current_longitude,firebase_token,current_language,email,personal_photo:personal_photo_body} = req.body;
  const { files:{personal_photo} } = req;
  const token = req?.headers?.authorization?.split(' ')?.[1];
  const authedUser = jwt.decode(token);

  if (!CheckValidIdObject(req, res, authedUser?.user_id, 'User Id is Invalid')) return;
  let user = await GetUserById(authedUser?.user_id)
  if(!user){
      return res.status(400).json(ResponseSchema('User Id is wrong',false))
  }
  if(!user?.verified){
      return res.status(400).json(ResponseSchema('User is not Verified yet. please verify user number first',false))
  }
  if(user?.status==3){
      return res.status(400).json(ResponseSchema('User is not active. Please contact admins',false))
  }
  try {
    let updatedData = {
      name: name,
      whatsapp_number: whatsapp_number,
      current_latitude: current_latitude,
      current_longitude: current_longitude,
      firebase_token: firebase_token,
      current_language: current_language,
      personal_photo: personal_photo ? personal_photo?.[0]?.filename : personal_photo_body ? SplitImageLink(req, personal_photo_body) : '',
      email: email,
    }
    await UpdateUser(authedUser?.user_id,updatedData)
    return res.status(201).json(ResponseSchema('User Updated Successfully', true))
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)))
  }
};

exports.verifyUser = async (req, res) => {
  const {user_id,code} = req.body;

  if (!CheckValidIdObject(req, res, user_id, 'User Id is Invalid')) return;
  const userQuery = { _id: user_id, 'verififed_code.code': Number(code) ? Number(code) : 0 }
  const user = await GetUserByQuery(userQuery);

  if (!user) {
    return res.status(400).json(ResponseSchema('Code Is Wrong', false));
  }
  if (user?.status == 3) {
    return res.status(400).json(ResponseSchema('User is not active. Please contact admins', false));
  }


  try {
    let updatedData = {
      verified: true,
    }
    await UpdateUser(user_id,updatedData)
    return res.status(201).json(ResponseSchema('User Verified Successfully', true))
  } catch (error) {
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)))
  }
};

exports.cahengeActiveStatusUser = async (req, res) => {
  const { id } = req.params
  if (!CheckValidIdObject(req, res, id, 'User Id is Invalid')) return;

  const user = await GetUserById(id);

  if (!user) {
    return res.status(400).json(ResponseSchema('User Id is wrong', false));
  }
  try {
    let updatedData={ status: user?.status == 1 ? 2 : 1 }
    await UpdateUser(id,updatedData )
    return res.status(201).json(ResponseSchema('User Status Changed Successfully.', true))
  } catch (error) {
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)))
  }
};

exports.getAllUsers = async (req, res) => {
  const page = req.query.page - 1 || 0;
  const itemPerPage = req.query.limit || 10;
  const count = await GetUsersCount();
  const pages = Math.ceil(count / itemPerPage);

  try {
    let users = await GetAllUsersPaginated(page , itemPerPage)
    const sendedObject = users.map((user) => ({
      id: user._id,
      name: user?.name,
      phone_number: user?.phone_number,
      whatsapp_number: user?.whatsapp_number,
      current_latitude: user?.current_latitude,
      current_longitude: user?.current_longitude,
      firebase_token: user?.firebase_token,
      current_language: user?.current_language,
      personal_photo: user?.personal_photo ? MergeImageLink(req, user?.personal_photo) : '',
      email: user?.email,
      firebase_token: user?.firebase_token,
      current_language: user?.current_language,
      status: user?.status,
      api_token: user?.api_token,
    }));
    return res.status(200).json(ResponseSchema('Users', true, PaginateSchema(page + 1, pages, count, sendedObject)));
  } catch (error) {
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)))
  }
};

exports.getAllTeachers = async (req, res) => {
  // const page = req.query.page - 1 || 0;
  // const itemPerPage = req.query.limit || 10;
  // const count = await GetUsersCount();
  // const pages = Math.ceil(count / itemPerPage);

  try {
    let users = await GetAllTeachers()
    const sendedObject = users.map((user) => ({
      id: user._id,
      name: user?.name,
      personal_photo: user?.personal_photo ? MergeImageLink(req, user?.personal_photo) : '',
      status: user?.status,
    }));
    return res.status(200).json(ResponseSchema('Users', true, sendedObject));
  } catch (error) {
    console.log(error)
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)))
  }
};

exports.getUser = async (req, res) => {
  const lang = req.headers['accept-language'] || 'en';
  const token = req?.headers?.authorization?.split(' ')?.[1];
  const authedUser = jwt.decode(token);

  options.language = `${lang}`;
  const geocoderr = NodeGeocoder(options);
  if (!CheckValidIdObject(req, res, authedUser?.user_id, 'User Id is Invalid')) return;

  try {
    const user = await GetUserById(authedUser?.user_id);

    if (!user) {
      return res.status(400).json(ResponseSchema('User Id is wrong', false));
    }
    const modifiedAdress = await geocoderr.geocode(`${user?.default_user_address_id?.latitude},${user?.default_user_address_id?.longitude}`);

    const sendedObject = {
      id: user._id,
      name: user?.name,
      phone_number: user?.phone_number,
      whatsapp_number: user?.whatsapp_number,
      current_latitude: user?.current_latitude,
      current_longitude: user?.current_longitude,
      firebase_token: user?.firebase_token,
      current_language: user?.current_language,
      personal_photo: user?.personal_photo ? MergeImageLink(req, user?.personal_photo) : '',
      email: user?.email,
      firebase_token: user?.firebase_token,
      current_language: user?.current_language,
      status: user?.status,
      default_user_address_id: modifiedAdress?.[0]?.formattedAddress,
      api_token: user?.api_token ,
    };

    return res.status(200).json(ResponseSchema('User', true, sendedObject));
  } catch (error) {
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)));
  }
};

exports.logOutOrDelete = async (req, res) => {
  const token = req?.headers?.authorization?.split(' ')?.[1]
  const authedUser = jwt.decode(token);
  
  if (!CheckValidIdObject(req, res, authedUser?.user_id, 'User Id is Invalid')) return;

  const user = await GetUserById(authedUser?.user_id);

  if (!user) {
    return res.status(400).json(ResponseSchema('User Id is wrong', false));
  }
  try {
    await UpdateUser(authedUser?.user_id,{api_token: ''})
    return res.status(201).json(ResponseSchema('User Loggedout Successfully.', true))
  } catch (error) {
    return res.status(400).json(ResponseSchema('Somethings Went wrong', false, ErrorHandler(error)))
  }
};
