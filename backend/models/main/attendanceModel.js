const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    rollno: { type: String, required: true, unique: true },
    attendance : {type: [{ _id: false, subject: String, present: { type: [{type: String}] }}]}
})


const createSemModel = mongoose.model('bca_1st_attent', attendanceSchema);

module.exports = createSemModel;