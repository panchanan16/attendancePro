const mongoose = require('mongoose');

const adminSchema = new mongoose.Schema({
    name : String,
    email : { type : String, required : true, unique : true},
    password :  String,
    departments : { type : [String]},
    gender: String,
    token : String,
    
})

const createAdmin = mongoose.model('Admin', adminSchema);

module.exports = createAdmin;