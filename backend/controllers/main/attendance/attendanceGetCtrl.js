// const attendance = require('../../models/main/attendanceModel')
const mongoose = require('mongoose');
const fs = require('fs')

const attendanceSchema = new mongoose.Schema({
    rollno: { type: String, required: true, unique: true },
    attendance: { type: [{ _id: false, sub: String, lastattendance: String, lastatttendent: String, month: { type: [{ _id: false, name: String, count: { p: Number, a: Number } }] } }] }
})

const attendanceGetControl = {

    getAttendance: async function (req, res) {
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        try {
            const data = await attendance.find()
            res.status(200).send(data)
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: "Something error occured in Insertion" })
        }
    },

    getTodayAttendancePerSubject: async function (req, res) {
       const attendance = mongoose.model(req.query.q, attendanceSchema)
       const response = await attendance.find({ 'attendance.sub' : req.query.sub}, { 'attendance.subject' : 1, 'attendance.todayabsent' : 1, 'attendance.todaypresent' : 1})
       if(response.length > 0) {
         return res.status(200).send(response)
       }else {
         return res.status(500).send({ msg: "data do not exist!" })
       }
    },

    getTodayAttendance : async function(req, res) {
        const todayTotal = mongoose.model('todaytotal')
        const response  = await todayTotal.find({ depName : { $in :  ['BCA']}, date: req.query.date}, { _id: 0, __v: 0 })
        if (response.length > 0) {
            res.status(200).send(response)
        } else {
            res.status(500).send({msg : "No data available"})
        }
    },

    getOverallAttendance : async function (req, res) {
        try {
            const attendance = mongoose.model(req.query.q, attendanceSchema);
            const response = await attendance.find(
            {},
            {rollno: 1, 'attendance.sub': 1, 'attendance.month': 1}
            )
            res.status(200).send({response})
        } catch (error) {
            console.log(error);
            res.status(500).send({msg : "Some error occcurd in fetching"})
        }
        
    }
}

module.exports = attendanceGetControl;

