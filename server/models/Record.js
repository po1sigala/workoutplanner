const mongoose = require('mongoose');

const { Schema } = mongoose;

const recordSchema = new Schema({

  exercise: {
    type: String,
    required: true,
    trim: true
  },
  weight:{
    type:Number
  },
  recordType:{
    type:Number
  }
});

const Record = mongoose.model('Record', recordSchema);

module.exports = Record;
