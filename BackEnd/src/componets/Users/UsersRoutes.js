const express = require('express');

const router = express.Router();
const multer = require('multer');
const {
  createUser, updateUser, verifyUser, getAllUsers, getUser, cahengeActiveStatusUser, 
  logOutOrDelete,  loginUser, getAllTeachers,
} = require('./UsersController');
const { checkUserStatus } = require('../../middleware/CheckUserStatus');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './public/uploads');
  },
  filename: (req, file, cb) => {
    const savedFileName = `${file.fieldname}-user-${Date.now()}-${Math.round(Math.random() * 1E9)}-${file.originalname}`;

    cb(null, savedFileName);
  },
});
const upload = multer({
  storage,
}).fields([
  { name: 'personal_photo', maxCount: 1 },
]);

router.post('/create-user', multer().none(), createUser);
router.post('/login-user', multer().none(), loginUser);
router.post('/verify-user', multer().none(), verifyUser);
router.put('/change-user-status/:id', multer().none(), cahengeActiveStatusUser);
router.get('/all-teachers', getAllTeachers);

router.put('/update-user', upload, updateUser);

router.get('/all-users', getAllUsers);

router.get('/single-user', getUser);

router.post('/logout', multer().none(), logOutOrDelete);


module.exports = router;
