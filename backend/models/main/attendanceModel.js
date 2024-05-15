const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    rollno: { type: String, required: true, unique: true },
    attendance: { type: [{ _id: false, sub: String, lastattendance: String, lastatttendent : String, month: { type: [{ _id: false, name: String, count: { p: Number, a: Number } }] } }] }
})


const createSemModel = mongoose.model('bca_1sts', attendanceSchema);

module.exports = createSemModel;