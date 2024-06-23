const mongoose = require('mongoose')


const studentSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rollno: {
        type: String,
        required: true,
        unique: true
    },
    department: {
        type: String,
        required: true
    },
    sem: {
        type: String,
        required: true
    },
    year: {
        type: String,
        required: true
    }
})

const createStudent = mongoose.model('Students', studentSchema)

module.exports = createStudent