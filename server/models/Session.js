const mongoose = require('mongoose');

const { Schema } = mongoose;

const sessionSchema = new Schema({
  sessionDate: {
    type: Date,
    default: Date.now
  },
  excercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise'
    }
  ]
});

const Session = mongoose.model('Order', sessionSchema);

module.exports = Session;
