const mongoose = require('mongoose');

const UserSchema = mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name Is Required'],
  },
  email: {
    type: String,
    required: [true, 'Email Is Required'],
    unique:[true,'Email alredy exists']
  },
  password: {
    type: String,
    required: [true, 'Password Is Required'],
  },
  // phone_number: {
  //   type: String,
  //   required: [true, 'User phone Is Required'],
  //   // unique:[true,'Phone alredy exists']
  // },
  verififed_code: {
    code: {
      type: Number,
    },
    date: {
      type: Date,
      default: Date.now,
    },
    expires_date: {
      type: Date,
      default: new Date(+new Date() + 1 * 24 * 60 * 60 * 1000),
    },
  },
  // whatsapp_number: {
  //   type: String,
  //   default: '',
  // },

  verified: {
    type: Boolean,
    default: false,
  },
  personal_photo: {
    type: String,
    default: '',
    // required:'Personal Photo Is Required',
  },
  // current_latitude: {
  //   type: String,
  // },
  // current_longitude: {
  //   type: String,
  // },
  
  // firebase_token: {
  //   type: String,
  //   default: '',
  // },
  api_token: {
    type: String,
    default: '',
  },
  // current_language: {
  //   type: String,
  //   enum: ['en', 'ar', 'ur'],
  //   default: 'ar',
  // },
  // default_user_address_id: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'UserAddress',
  // },
  // favorited_products: {
  //   type: [mongoose.Schema.Types.ObjectId],
  //   ref: 'Product',
  // },
  status: {
    type: Number,
    enum: [1, 2],
    default: 1,
    // 1 => Active
    // 2 => Block
  },
  user_type: {
    type: String,
    enum: ['student', 'teacher'],
    default: 'student',
    // 1 => Student
    // 2 => Teacher
  },
}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

module.exports.User = mongoose.model('User', UserSchema);
