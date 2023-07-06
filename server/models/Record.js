const mongoose = require('mongoose');

const { Schema } = mongoose;

const recordSchema = new Schema({
  exercise: {
    type: String,
    required: true,
    trim: true
  },
  maxWeight:{
    type:Number
  },
  recordType:{
    type:String
  }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
