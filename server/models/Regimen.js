const mongoose = require('mongoose');

const { Schema } = mongoose;

const regimenSchema = new Schema({
day:{
    //days still stored as UMTWRFS
    type:String
},
excercises: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Exercise'
    }

  ]
});

const Regimen = mongoose.model('Regimen', regimenSchema);

module.exports = Regimen;