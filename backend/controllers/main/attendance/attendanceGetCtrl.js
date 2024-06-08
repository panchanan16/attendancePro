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
            res.status(500).send({ msg: "Something error occured in Insertion" })
        }
    },

    getTodayAttendancePerSubject: async function (req, res) {
        const attendance = mongoose.model(req.query.q, attendanceSchema)
        const aggregate = await attendance.aggregate([
            {
                $lookup: {
                    from: 'students',
                    localField: 'rollId',
                    foreignField: '_id',
                    as: 'studentsData'
                }
            },
            { $match: { attendance: { $elemMatch: { sub: req.query.sub } }, 'attendance.lastattendance': req.query.date } },
            { $project:{rollId: 1, 'attendance.sub': 1, 'attendance.todayabsent': 1, 'attendance.todaypresent': 1, 'studentsData.name': 1, 'studentsData.rollno': 1} }
        ]);
        if(aggregate.length > 0) {
            return res.status(200).send(aggregate)
        }
        return res.status(500).send(aggregate)
        
    },

    getTodayAttendance: async function (req, res) {
        const todayTotal = mongoose.model('todaytotal')
        const response = await todayTotal.find({ depName: { $in: ['bca'] }, date: req.query.date }, { _id: 0, __v: 0 })
        if (response.length > 0) {
            res.status(200).send(response)
        } else {
            res.status(500).send({ msg: "No data available" })
        }
    },

    getOverallAttendancePerSubject: async function (req, res) {
        try {
            const attendance = mongoose.model(req.query.q, attendanceSchema);
            const response = await attendance.aggregate([
                {
                    $lookup: {
                        from:'students',
                        localField: 'rollId',
                        foreignField: '_id',
                        as:'studentsData'
                    }
                },
                { $match: { attendance: { $elemMatch: { sub: req.query.sub } } } },
                { $project: { 'attendance.sub': 1, 'attendance.month': 1,'studentsData.name': 1,'studentsData.rollno': 1 } }
            ]);
            const sendData = [];
            response.forEach((Student) => {    
                const targetSubject = Student.attendance.find((subj)=> subj.sub == req.query.sub)
                const monthData = targetSubject.month;

                let p = 0;
                let a = 0;

                monthData.forEach((month) => {
                    p += month.count.p
                    a += month.count.a
                })

                sendData.push({ details: Student.studentsData[0], present: p, absent: a })
            })
            res.status(200).send({ sendData })
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Some error occcurd in fetching" })
        }

    }
}

module.exports = attendanceGetControl;

