const mongoose = require('mongoose');

const attendanceSheetSchema = new mongoose.Schema({
    rollId: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true, unique: true },
    attendance: { type: [{ _id: false, sub: String, todaypresent: Number, todayabsent: Number, todaytotalrecord: Number, lastattendance: String, lastatttendent: String, month: { type: [{ _id: false, name: String, count: { p: Number, a: Number }, presentDate: { type: [String] } }] } }] }
})

module.exports = {attendanceSheetSchema}