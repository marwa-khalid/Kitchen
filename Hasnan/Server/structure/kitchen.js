const mongoose = require("mongoose");

// Kitchen schema
const kitchenSchema = new mongoose.Schema({
    fullName: {
      type: String,
      required: true,
    },
    image:{
        type: String,
        required: true,
    },
    expertise:{
        type: String,
        required:true
    },
    address:{
        type:String,
        required:true
    }
  });
  
const Kitchen = mongoose.model('Kitchen', kitchenSchema);

module.exports = Kitchen;