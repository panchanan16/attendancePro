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
    }
})

const createStudent = mongoose.model('Students', studentSchema)

module.exports = createStudent