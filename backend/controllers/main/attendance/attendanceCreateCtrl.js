// const attendance = require('../../models/main/attendanceModel')
const mongoose = require('mongoose');
const todayTotal = require('../../../models/main/totalModel');
const sheetModel = require('../../../models/main/sheetsCollectionModel')

const attendanceSchema = new mongoose.Schema({
    rollId: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true, unique: true },
    attendance: { type: [{ _id: false, sub: String, todaypresent: Number, todayabsent: Number, todaytotalrecord: Number, lastattendance: String, lastatttendent: String, month: { type: [{ _id: false, name: String, count: { p: Number, a: Number }, presentDate: { type: [String] } }] } }] }
})

const attendanceCreateControl = {
    addStudentSheet: async function (req, res) {
        try {
            console.log(req.body.students);
            const sheetRespond = await sheetModel.find({ name: req.query.q })
            if (sheetRespond.length > 0) {
                return res.status(500).send({ msg: "Sheet Already exist" })
            }

            const attendance = mongoose.model(req.query.q, attendanceSchema);
            const subjects = [];

            const studentsArray = req.body.students.map((stud) => {
                return { rollId: stud, attendance: subjects }
            })

            const response = await attendance.insertMany(studentsArray)
            if (response.length > 0) {
                await sheetModel.collection.insertOne({ name: req.query.q, students: req.body.students.length })
                return res.status(200).send({ msg: "student added to sheet successfully" });
            }
            return res.status(500).send({ msg: "Some error occurred" })

        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: "Something went wrong!" })
        }

    },

    addStudentSheetOnEdit: async function (req, res) {
        try {
            const sheetRespond = await sheetModel.find({ name: req.query.q })
            if (sheetRespond.length > 0) {
                const attendance = mongoose.model(req.query.q, attendanceSchema);
                let subjects = [];
                let months = [];

                if (req.body.months) {
                    months = req.body.months && req.body.months.map((month) => (
                        { name: month, count: { p: 0, a: 0 }, presentDate: [] }
                    ))
                }

                if (req.body.subjects) {
                    subjects = req.body.subjects.map((sub) => {
                        return { sub: sub, lastattendance: "", lastatttendent: "", month: months }
                    })
                }

                const studentsArray = req.body.students.map((stud) => {
                    return { rollId: stud, attendance: subjects }
                })

                const response = await attendance.insertMany(studentsArray)
                if (response.length > 0) {
                    await sheetModel.updateOne({ name: req.query.q }, {$inc : {students: req.body.students.length}})
                    return res.status(200).send({ msg: "student added to sheet successfully" });
                }
                return res.status(500).send({ msg: "Some error occurred" })
            }

            return res.status(500).send({ msg: "Sheet does not exist" })

        } catch (error) {
            return res.status(500).send({ msg: "Something went wrong!" })
        }

    },

    addSubject: async function (req, res) {
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        let months = [];
        if (req.body.months) {
            months = req.body.months.map((month)=> ({ name: month, count: { p: 0, a: 0 }, presentDate: [] }))
        }
        const subCheck = await sheetModel.findOne({ name : req.query.q })
        const subjects = req.body.subjects.map((sub) => {
            if (!subCheck.subjects.includes(sub)) {
                return { sub: sub, lastattendance: "", lastatttendent: "", month: months.length > 0 ? months : [] }
            }else {
                return null;
            }
            
        })
        
        if(!subjects.includes(null)) {
            const response = await attendance.updateMany(
                {  }, 
                { $addToSet: { attendance: subjects } },
            )
    
            const toSheet = await sheetModel.updateOne({ name: req.query.q }, { $addToSet: { subjects: req.body.subjects } })
            return res.status(200).send({ msg: "subject added successfully" })
        }
        return res.status(500).send({msg : "Something went wrong!"})
    },

    addMonth: async function (req, res) {
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        const monthToadd = req.body.month && req.body.month.map((month) => (
            { name: month, count: { p: 0, a: 0 }, presentDate: [] }
        ))

        const response = await attendance.updateMany(
            {},
            { $addToSet: { 'attendance.$[].month': monthToadd } },
        )

        const toSheet = await sheetModel.updateOne({ name: req.query.q }, { $addToSet: { months: req.body.month } })
        res.status(200).send(response)
    },

    getAttendanceVerify: async function (req, res) {
        const { sub, date } = req.body
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        const subcheck = await attendance.find({ 'attendance.sub': sub }, { 'attendance.sub': 1, 'attendance.lastattendance': 1 }).limit(20)

        if (subcheck && subcheck.length > 0) {
            const verification = []
            subcheck.forEach((el) => {
                const target = el.attendance.find((e) => e.sub === sub);
                if (target.sub == sub && target.lastattendance == date) {
                    verification.push(false)
                }
            })

            if (verification.includes(false)) {
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
                    { subject: req.body.subject, depName: req.body.depName, semName: req.query.q.split('_')[1] },
                    { date: req.body.lastattendancedate, todayTotalPresent: req.body.todayTotalPresent, todayTotalAbsent: req.body.todayTotalAbsent }, { upsert: true }
                )
                return res.status(200).send({ msg: "Attendance updated successfully" })
            }
            return res.status(500).send({ msg: "Something went wrong!" })
        } catch (err) {
            console.error(err);
        }

    }
}

module.exports = attendanceCreateControl;

