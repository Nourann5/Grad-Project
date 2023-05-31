const mongoose = require('mongoose');
const { counter } = require('../Counter/CounterModel');

const CategoriesSchema = mongoose.Schema({
  item_number: {
    type: Number,
    default:0,
  },
  translation: {
    en: {
      title: {
        type: String,
        required: [true, 'Category English Title is required'],
      },
    },
    ar: {
      title: {
        type: String,
        // required: [true, 'Category Arabic Title is required'],
      },
    },
  },
  image: {
    type: String,
    required: [true, 'Category Image is required'],
  },
  children_categories:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Category',
    // required: [true, 'City Id Is Required'],
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User Id Is Required'],
  },
  children_exams:{
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'Exams',
    // required: [true, 'City Id Is Required'],
  },

  parent_category:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Category',
    // required: [true, 'City Id Is Required'],
  },
  status: {
    type: Number,
    enum: [1, 2],
    default: 1,
    // 1 => Active
    // 2 => Not Active
  },
  

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});
CategoriesSchema.pre('save', function(next) {
  var doc = this;
  counter.findOneAndUpdate({id: 'categoriesCounter'}, {$inc: { seq: 1} },async function(error, counterr)   {
    if(counterr==null){
      await counter.create({id:'categoriesCounter',seq:1})
      return
    }
      if(error) return next(error);

      doc.item_number = counterr.seq;
      next();
  });
});

module.exports.Categories = mongoose.model('Category', CategoriesSchema);
