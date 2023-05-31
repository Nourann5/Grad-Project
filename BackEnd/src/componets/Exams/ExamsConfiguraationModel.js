const mongoose = require('mongoose');
const { counter } = require('../Counter/CounterModel');

const ExamsConfigurationSchema = mongoose.Schema({
  item_number: {
    type: Number,
    default:0,
  },
  exam_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Exam',
    // required: [true, 'User Id Is Required'],
  },
  section_id:{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Section',
    // required: [true, 'User Id Is Required'],
  },
  
  exam_configuration:{
    exam_time:{
      type: Number,
      default:0
    },
    exam_available_for_who:{
      type: Number,
      enum: [1, 2 ,3,4],
      // required: [true, 'Exam Available for Who Is Required'],
      //  1 => All Users In Invo
      //  2 => All Users In My Groups
      //  3 => Users With Specific Codes
      //  4 => No One
    },
    exam_available_for_who_groups:{
      type:[String]
    },
    no_of_generated_code:{
      type: Number,
    },
    exam_available_for_when:{
      type: Number,
      enum: [1, 2],
      // required: [true, 'Exam Available for Who Is Required'],
      //  1 => For Ever
      //  2 => For Specific Time
    },
    exam_available_for_when_start_date:{
      type: Date,
    },
    exam_available_for_when_end_date:{
      type: Date,
    },
    show_exam_questions:{
      type: Number,
      enum: [1, 2],
      // required: [true, 'Exam Available for Who Is Required'],
      //  1 => In Added Order
      //  2 => Random For All Questions
    },
    show_exam_correct_answer:{
      type: Number,
      enum: [1, 2, 3],
      // required: [true, 'Exam Available for Who Is Required'],
      //  1 => After End Exam
      //  2 => After Answer Each Question
      //  3 => Never Show Answer
    },
  },
  question_configration:{
    question_numbers:{
      type: Number,
    },
    question_alpha:{
      type: String,
      enum: ['number', 'english', 'roman'],
      // required: [true, 'Exam Available for Who Is Required'],
      //  1 => Numeric 1-2-3
      //  2 => Alphabet A-B-C
      //  3 => Latin Ⅰ-Ⅱ-Ⅲ
    },
  },
  questions:[
    {
      question_mark:{
        type: Number,
      },
      screen_type:{
        type: String,
        enum: ['one', 'two'],
        // required: [true, 'Exam Available for Who Is Required'],
        //  1 => Two Screen
        //  2 => One Screen
      },
      answer_type:{
        type: String,
        enum: ['single', 'multi', 'input'],
        // required: [true, 'Exam Available for Who Is Required'],
        //  1 => One Answer
        //  2 => Multi Answer
        //  3 => Text Answer
      },
      question_information:{
        type:String
      },
      question_name:{
        type:String
      },
      question_correct_answer:{
        type:String
      },
      question_answers:[
        {
          answer_value:{
            type:String
          },
          is_correct_answer:{
            type:Boolean,
            default:false
          },
          is_correct_answer:{
            type:Boolean,
            default:false
          },
        }
      ]
    }
  ]

}, {
  timestamps: {
    createdAt: 'created_at',
    updatedAt: 'updated_at',
  },
});

ExamsConfigurationSchema.pre('save', function(next) {
  var doc = this;
  counter.findOneAndUpdate({id: 'examsConfigurationCounter'}, {$inc: { seq: 1} },async function(error, counterr)   {
    if(counterr==null){
      await counter.create({id:'examsConfigurationCounter',seq:1})
      return
    }
      if(error) return next(error);

      doc.item_number = counterr.seq;
      next();
  });
});

module.exports.ExamsConfigurations = mongoose.model('ExamsConfiguration', ExamsConfigurationSchema);
