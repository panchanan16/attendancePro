// const attendance = require('../../models/main/attendanceModel')
const mongoose = require('mongoose');
const todayTotal = require('../../../models/main/totalModel');

const attendanceSchema = new mongoose.Schema({
    rollId: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true, unique: true },
    attendance: { type: [{ _id: false, sub: String, todaypresent: Number, todayabsent: Number, todaytotalrecord: Number, lastattendance: String, lastatttendent: String, month: { type: [{ _id: false, name: String, count: { p: Number, a: Number }, presentDate: { type: [String] } }] } }] }
})

const attendanceCreateControl = {
    addSubject: async function (req, res) {
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        const response = await attendance.updateMany(
            {},
            { $addToSet: { attendance: { sub: req.body.subject, lastattendance: "", lastatttendent: "", month: [] } } },
        )
        console.log(response);
        res.status(200).send({ msg: "subject added successfully" })
    },

    addMonth: async function (req, res) {
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        const monthToadd = req.body.month && req.body.month.map((month) => (
            { name: month, count: { p: 0, a: 0 }, presentDate: [] }
        ))

        const response = await attendance.updateMany(
            { 'attendance.sub': req.body.subject },
            { $addToSet: { 'attendance.$[].month': monthToadd } },
        )
        res.status(200).send(response)
    },

    getAttendanceVerify: async function (req, res) {
        const { sub, date } = req.body
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        const subcheck = await attendance.find({ 'attendance.sub': sub }, { 'attendance.sub': 1 , 'attendance.lastattendance': 1}).limit(20)

        if (subcheck && subcheck.length > 0) {
            const verification = []
            subcheck.forEach((el)=> {
                const target = el.attendance.find((e)=> e.sub === sub);
                if(target.sub == sub && target.lastattendance == date) {
                    verification.push(false)
                }
            })

            if(verification.includes(false)) {
                return res.status(500).send({ result: false, msg: "Invalid selection ❌" });
            }

            return res.status(200).send({ result: true });

        } else {
            return res.status(500).send({ result: false, msg: "Invalid selection ❌" });
        }

    },

    setAttendance: async function (req, res) {
        const attendance = mongoose.model(req.query.q, attendanceSchema);

        const bulkIns = req.body.attendance.map((attend) => ({
            updateOne: {
                filter: { rollId: attend.rollno },
                update: {
                    $inc: { 'attendance.$[element].month.$[item].count.p': attend.p, 'attendance.$[element].month.$[item].count.a': attend.a },
                    $set: { 'attendance.$[element].lastattendance': req.body.lastattendancedate, 'attendance.$[element].lastatttendent': req.body.lastatttendent, 'attendance.$[element].todaypresent': attend.p, 'attendance.$[element].todayabsent': attend.a },
                    $addToSet: { 'attendance.$[element].month.$[item].presentDate': attend.p && req.body.lastattendancedate }
                },
                arrayFilters: [{ 'element.sub': req.body.subject, 'element.lastattendance': { $ne: req.body.lastattendancedate } }, { 'item.name': req.body.month }]
            }
        }))

        try {
            const result = await attendance.bulkWrite(bulkIns);
            if (result.modifiedCount > 0) {
                const totalInsert = await todayTotal.updateOne(
                    { subject: req.body.subject, depName: req.body.depName },
                    { date: req.body.lastattendancedate, todayTotalPresent: req.body.todayTotalPresent, todayTotalAbsent: req.body.todayTotalAbsent }, { upsert: true }
                )
                return res.status(200).send({ msg: "Attendance updated successfully" })
            }
            return res.status(500).send({ msg: "Something went wrong!" })
        } catch (err) {
            console.error(err);
        }

    },

    addStudentSheet: async function (req, res) {
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        const monthsArray = req.body.months.map((mon) => {
            return { name: mon, count: { p: 0, a: 0 }, presentDate: [] }
        })
        const subjects = req.body.subjects.map((sub) => {
            return { sub: sub, lastattendance: "", lastatttendent: "", month: monthsArray }
        })
        const studentsArray = req.body.students.map((stud) => {
            return { rollId: stud, attendance: subjects }
        })
        const response = await attendance.insertMany(studentsArray)
        res.status(200).send(response);
    }
}

module.exports = attendanceCreateControl;

