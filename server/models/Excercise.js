const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseSchema = new Schema({
  exerciseName: {
    type: String,
    required:false,
    trim:true
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  },
 isHeavy:{
    type:String,
    required:false
  },
  records:[{
    type:Schema.Types.ObjectId,
    ref:"Record"
  }],
});

const Workout = mongoose.model('Workout', exerciseSchema);

module.exports = Workout;
