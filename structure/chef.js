//handle only one record
//schema for database

const mongoose = require('mongoose')

const chefDetail = new mongoose.Schema({
    username: {
        //properties
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    }
})

//export schema
module.exports = mongoose.model('Chef', chefDetail)