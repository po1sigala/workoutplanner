const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseSchema = new Schema({
  exerciseName: {
    type: String,
    required:false,
    trim:true
  },
  targetHeavy:{
    type:Number,
    required:true,
    trim:true
  },
  targetReps:{
    type:Number,
    required:true,
    default:1
  },
  repsActual:{
    type:Number,
    required:true,
    default:0,
    min:0
  },
  heavyActual:{
    type:Number,
    required:false,
    
  },
  category: {
    type: Schema.Types.ObjectId,
    ref: 'Category',
    required: true
  }
});

const Workout = mongoose.model('Workout', exerciseSchema);

module.exports = Workout;
