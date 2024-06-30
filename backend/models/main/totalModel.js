const mongoose = require('mongoose')

const todayTotalSchema = new mongoose.Schema({
    depName : { type: String, required: true},
    semName : { type: String, required: true},
    subject : { type: String, required: true},
    todayTotalPresent : { type: Number, required: true},
    todayTotalAbsent : { type: Number, required: true},
    date : { type: String }
})


const createTodayTotalSchema = mongoose.model('todaytotal', todayTotalSchema) 

module.exports = createTodayTotalSchema;