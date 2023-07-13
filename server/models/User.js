const mongoose = require('mongoose');

const { Schema } = mongoose;
const bcrypt = require('bcrypt');
const Session = require('./Session');
const Record = require("./Record")
const Regimen= require("./Regimen")

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
  planAgressiveness:{
    type:String,
    trim:true,
    default:"strength"
  },
  weightLb:{
    type:Number,
    required:false,
  },
  isAdmin:{
    type:Boolean,
    default:false
  },
  regimen: [Regimen.schema]
  ,
  sessions: [Session.schema],
  
  
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
