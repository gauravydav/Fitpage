const mongoose = require('mongoose');

//const dataSchema = 
//module.exports = mongoose.model('Data', dataSchema);
const dataSchema = new mongoose.Schema({
  data: {
    type: Object,
    required: true,
  },
});

// Create the data model
const Data = mongoose.model('Data', dataSchema);
module.exports = Data;