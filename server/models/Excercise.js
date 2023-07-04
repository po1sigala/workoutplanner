const mongoose = require('mongoose');

const { Schema } = mongoose;

const exerciseSchema = new Schema({
  exerciseName: {
    type: String,
    required:false,
    trim:true
  },
  currentMaxWeight:{
    type: Number,
    required:false,
    trim:true
  },
  targetMaxWeight:{
    type:Number,
    required:false,
    trim:true
  },
  sessionWeight:{
    type:Number,
    required:false,
    
  },
  repsTarget:{
    type:Number,
    required:true,
    default:1
  },
  repsActual:{
    type:Number,
    required:true,
    default:0,
    min:0
  }
});

const Workout = mongoose.model('Workout', exerciseSchema);

module.exports = Workout;
