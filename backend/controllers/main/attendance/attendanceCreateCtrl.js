// const attendance = require('../../models/main/attendanceModel')
const mongoose = require('mongoose');

const attendanceSchema = new mongoose.Schema({
    rollno: { type: String, required: true, unique: true },
    attendance: { type: [{ _id: false, sub: String, todaypresent: Number, todayabsent: Number, todaytotalrecord: Number, lastattendance: String, lastatttendent : String, month: { type: [{ _id: false, name: String, count: { p: Number, a: Number } }] } }] }
})

const attendanceCreateControl = {
    createAttendanceSheet: async function (req, res) {
        if(req.body.students && req.body.students.length) {
            const createSemModel = mongoose.model(req.query.q, attendanceSchema);
            const studentStatus = req.body.students
            const response = await createSemModel.insertMany(studentStatus)
            res.status(200).send(response);
        }
    },


    createAttendance: async function (req, res) {
        const createStudentAttendance = new attendance({
            rollno: "eigeygigg11111rrer",
            attendance: [{ sub: "math", lastattendance: "", month: [{ name: "jan", count: { p: 0, a: 1} }] }]
        })
        try {
            await createStudentAttendance.save({ timestamps: true })
            res.status(200).send({ msg: `status added successfully 👌` })
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: `Something error occurred while saving` })
        }

    },

    addSubject : async function (req, res) {
        // const attendance = mongoose.connection.collection('bca_2nds');
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        const response = await attendance.updateMany(
            { },
            { $addToSet : { attendance : { sub: req.body.subject, lastattendance: "", lastatttendent: "", month: [] } }},
        )
        console.log(response);
        res.status(200).send({ msg: "subject added successfully"})
    },

    addMonth : async function (req, res) {
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        req.body.month && req.body.month.forEach(async (month)=> {
            const response = await attendance.updateMany(
                {'attendance.sub' : req.body.subject},
                { $addToSet : { 'attendance.$[].month' : { name: month, count: { p: 0, a: 0} } } },
            ) 
            console.log(response);
        })
        res.status(200).send({ msg: "month added successfully"})  
    },

    getAttendanceVerify: async function(req, res) {
        const {sub, date} = req.body
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        const response = await attendance.find({'attendance.sub': sub, 'attendance.lastattendance': date }, {rollno: 1}) 
        if(response && response.length > 0) {
            return res.status(500).send({result: false});
        }
        console.log(response);
        return res.status(200).send({result: true});
    },

    setAttendance: async function (req, res) {
        const attendance = mongoose.model(req.query.q, attendanceSchema);
        req.body.attendance.forEach(async (element) => {
            const response = await attendance.updateOne(
                { rollno: element.rollno },
                {
                    $inc: { 'attendance.$[element].month.$[item].count.p': element.p, 'attendance.$[element].month.$[item].count.a': element.a },
                    $set : { 'attendance.$[element].lastattendance': req.body.lastattendancedate, 'attendance.$[element].lastatttendent' : req.body.lastatttendent, 'attendance.$[element].todaypresent' : element.p, 'attendance.$[element].todayabsent' : element.a}
                },
                { arrayFilters: [{ 'element.sub': req.body.subject }, { 'item.name': req.body.month }], upsert: true }
            )

            console.log(response);

        });
    }
}

module.exports = attendanceCreateControl;

