const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Workout = require('./Excercise');

const userSchema = new Schema({
  firstName: {
    type: String,
    required: true,
    trim: true
  },
  lastName: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  password: {
    type: String,
    required: true,
    minlength: 10
  },
  heightFt:{
    type:Number,
    required:false,
    trim:true
  },
  heightIn:{
    type:Number,
    required:false,
    trim:true
  },
  heightCm:{
    type:Number,
    required:false,
    trim:true
  },
  agressiveness:{
    type:String,
    trim:true,
    default:"regular"
  },
  workoutDays:{
    type:Number,
    required:true,
    default: 4
  },
  weight:{
    type:Number,
    required:false,
  },
  sessions: [Session.schema]
});

// set up pre-save middleware to create password
userSchema.pre('save', async function(next) {
  if (this.isNew || this.isModified('password')) {
    const saltRounds = 10;
    this.password = await bcrypt.hash(this.password, saltRounds);
  }

  next();
});

// compare the incoming password with the hashed password
userSchema.methods.isCorrectPassword = async function(password) {
  return await bcrypt.compare(password, this.password);
};

const User = mongoose.model('User', userSchema);

module.exports = User;
