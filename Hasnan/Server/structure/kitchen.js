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
    },
    addedBy: { 
        type: mongoose.Schema.Types.ObjectId, ref: 'Kitchen' 
    },
  });
  
const Kitchen = mongoose.model('Kitchen', kitchenSchema);

module.exports = Kitchen;