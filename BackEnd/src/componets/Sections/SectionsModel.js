const mongoose = require('mongoose');
const { counter } = require('../Counter/CounterModel');

const SectionsSchema = mongoose.Schema({
  item_number: {
    type: Number,
    default:0,
  },
  user_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User Id Is Required'],
  },
  name: {
    type: String,
    required: [true, 'Exam Name is required'],
  },
  description: {
    type: String,
  },
  exam_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    required: [true, 'Exam Id Is Required'],
  },
  status: {
    type: Number,
    enum: [1, 2],
    default: 1,
    // 1 => Active
    // 2 => Not Active
  },
  has_sections: {
    type: Number,
    enum: [1, 2],
    default: 1,
    // 1 => Has Sections
    // 2 => Doesn't Have Sections
  },
  

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

SectionsSchema.pre('save', function(next) {
  var doc = this;
  counter.findOneAndUpdate({id: 'sectionCounter'}, {$inc: { seq: 1} },async function(error, counterr)   {
    if(counterr==null){
      await counter.create({id:'sectionCounter',seq:1})
      return
    }
      if(error) return next(error);

      doc.item_number = counterr.seq;
      next();
  });
});

module.exports.Sections = mongoose.model('Section', SectionsSchema);
