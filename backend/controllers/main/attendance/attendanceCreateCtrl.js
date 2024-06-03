// const attendance = require('../../models/main/attendanceModel')
const mongoose = require('mongoose');
const todayTotal = require('../../../models/main/totalModel');
const attendanceModel = require('../../../models/main/attendanceModel')

const attendanceSchema = new mongoose.Schema({
    rollno: { type: String, required: true, unique: true },
    attendance: { type: [{ _id: false, sub: String, todaypresent: Number, todayabsent: Number, todaytotalrecord: Number, lastattendance: String, lastatttendent: String, month: { type: [{ _id: false, name: String, count: { p: Number, a: Number } }] } }] }
})

const attendanceCreateControl = {
    createAttendanceSheet: async function (req, res) {
        if (req.body.students && req.body.students.length) {
            const createSemModel = mongoose.model(req.query.q, attendanceSchema);
            const studentStatus = req.body.students
            const response = await createSemModel.insertMany(studentStatus)
            res.status(200).send(response);
        }
    },


    createAttendance: async function (req, res) {
        const createStudentAttendance = new attendance({
            rollno: "eigeygigg11111rrer",
            attendance: [{ sub: "math", lastattendance: "", month: [{ name: "jan", count: { p: 0, a: 1 } }] }]
        })
        try {
            await createStudentAttendance.save({ timestamps: true })
            res.status(200).send({ msg: `status added successfully 👌` })
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: `Something error occurred while saving` })
        }

    },

    addSubject: async function (req, res) {
        // const attendance = mongoose.connection.collection('bca_2nds');
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        const response = await attendance.updateMany(
            {},
            { $addToSet: { attendance: { sub: req.body.subject, lastattendance: "", lastatttendent: "", month: [] } } },
        )
        console.log(response);
        res.status(200).send({ msg: "subject added successfully" })
    },

    getAttendanceVerify: async function (req, res) {
        const { sub, date } = req.body
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        const subcheck = await attendance.find({ 'attendance.sub': sub }, { rollno: 1 })

        if (subcheck && subcheck.length > 0) {

            const dateCheck = await attendance.find({ 'attendance.lastattendance': date }, { rollno: 1 })

            if (dateCheck && dateCheck.length > 0) {
                return res.status(500).send({ result: false, msg: "Invalid selection" });
            }
            return res.status(200).send({ result: true });

        } else {
            return res.status(500).send({ result: false, msg: "Invalid selection" });
        }

    },

    setAttendance: async function (req, res) {
        const studentStatus= req.body.students
        const bulkIns = studentStatus.map(student => ({
            updateOne: {
                filter: { rollno: student.rollno },
                update: { $push: { 'attendance.$[elem].present' : new Date(student.status).toISOString() } },
                upsert: true,
                arrayFilters: [{ 'elem.subject': req.body.subject }]
            }
        }));

        try {
            const result = await attendanceModel.bulkWrite(bulkIns);
            return res.status(200).send(result)
        } catch (err) {
            console.error(err);
        }

    },

    addMonth: async function (req, res) {
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        req.body.month && req.body.month.forEach(async (month) => {
            const response = await attendance.updateMany(
                { 'attendance.sub': req.body.subject },
                { $addToSet: { 'attendance.$[].month': { name: month, count: { p: 0, a: 0 } } } },
            )
        })
        res.status(200).send({ msg: "month added successfully" })
    },

    addSubject: async function (req, res) {
        const response = await attendanceModel.updateMany(
            {},
            { $addToSet: { attendance: { subject: req.body.subject, present: [] } } },
        )
        res.status(200).send({ msg: "subject added successfully" })
    },

    addStudentToSheet: async function (req, res) {
        const students = req.body.students
        const bulkIns = students.map(student => ({
            updateOne: {
                filter: { rollno: student },
                update: { $push: { attendance: [{subject: 'java', present: []}, {subject: 'cpp', present: []}] } },
                upsert: true
            }
        }));

        try {
            const result = await attendanceModel.bulkWrite(bulkIns);
            return res.status(200).send(result)
        } catch (err) {
            console.error(err);
        }

    }
}

module.exports = attendanceCreateControl;

