// const attendance = require('../../models/main/attendanceModel')
const mongoose = require('mongoose');
const fs = require('fs')
const attendanceSchema = new mongoose.Schema({
    rollId: { type: mongoose.Schema.Types.ObjectId, ref: 'students', required: true, unique: true },
    attendance: { type: [{ _id: false, sub: String, todaypresent: Number, todayabsent: Number, todaytotalrecord: Number, lastattendance: String, lastatttendent: String, month: { type: [{ _id: false, name: String, count: { p: Number, a: Number }, presentDate: { type: [String] } }] } }] }
})

const attendanceGetControl = {
    getStudentForAttendance: async function (req, res) {
        try {
            const attendanceStudents = mongoose.model(req.query.q);
            const aggregate = await attendanceStudents.aggregate([
                {
                    $lookup: {
                        from: 'students',
                        localField: 'rollId',
                        foreignField: '_id',
                        as: 'studentsData'
                    }
                },
                { $project: { rollId: 1, 'studentsData.name': 1, 'studentsData.rollno': 1 } }
            ]);
            let sentData = []
            aggregate.forEach((item) => {
                item.studentsData[0]._id = item.rollId
                sentData.push(item.studentsData[0])
            })
            if (aggregate.length > 0) {
                return res.status(200).send(sentData)
            }
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: error })
        }
    },
    getAttendance: async function (req, res) {
        const attendance = mongoose.models[req.query.q] || mongoose.model(req.query.q, attendanceSchema);
        try {
            const data = await attendance.find()
            res.status(200).send(data)
        } catch (error) {
            res.status(500).send({ msg: "Something error occured in Insertion" })
        }
    },

    getTodayAttendancePerSubject: async function (req, res) {
        const attendance = mongoose.models[req.query.q] || mongoose.model(req.query.q, attendanceSchema)
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
            { $project: { rollId: 1, 'attendance.sub': 1, 'attendance.todayabsent': 1, 'attendance.todaypresent': 1, 'studentsData.name': 1, 'studentsData.rollno': 1 } }
        ]);
        if (aggregate.length > 0) {
            return res.status(200).send(aggregate)
        }
        return res.status(500).send(aggregate)

    },

    getTodayAttendance: async function (req, res) {
        const todayTotal = mongoose.model('todaytotal')
        const response = await todayTotal.find({ depName: { $in: ['bca', 'bba'] }, date: req.query.date }, { _id: 0, __v: 0 })
        if (response.length > 0) {
            res.status(200).send(response)
        } else {
            res.status(500).send({ msg: "No data available" })
        }
    },

    getAllTodayAttendace : async function (req, res) {
        const todayTotal = mongoose.model('todaytotal')
        const response = await todayTotal.find({ date: req.query.date }, { _id: 0, __v: 0 })
        if (response.length > 0) {
            res.status(200).send(response)
        } else {
            res.status(500).send({ msg: "No data available" })
        }
    },

    getOverallAttendancePerSubject: async function (req, res) {
        try {
            const attendance = mongoose.models[req.query.q] || mongoose.model(req.query.q, attendanceSchema);
            const response = await attendance.aggregate([
                {
                    $lookup: {
                        from: 'students',
                        localField: 'rollId',
                        foreignField: '_id',
                        as: 'studentsData'
                    }
                },
                { $match: { attendance: { $elemMatch: { sub: req.query.sub } } } },
                { $project: { 'attendance.sub': 1, 'attendance.month': 1, 'studentsData.name': 1, 'studentsData.rollno': 1 } }
            ]);
            const sendData = [];
            response.forEach((Student) => {
                const targetSubject = Student.attendance.find((subj) => subj.sub == req.query.sub)
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

    },

    getAttendanceByMonth: async function (req, res) {
        try {
            const attendance = mongoose.models[req.query.q] || mongoose.model(req.query.q, attendanceSchema);
            const response = await attendance.aggregate([
                {
                    $lookup: {
                        from: 'students',
                        localField: 'rollId',
                        foreignField: '_id',
                        as: 'studentsData'
                    }
                },
                { $project: { 'attendance.sub': 1, 'attendance.month.name': 1, 'attendance.month.count': 1, 'studentsData.name': 1, 'studentsData.rollno': 1 } }
            ]);
            const sendData = response.map((item) => {
                const attendanceData = [{ name: 'jan', value: [] }, { name: 'feb', value: [] }, { name: 'apr', value: [] }, { name: 'mar', value: [] }, { name: 'apr', value: [] }, { name: 'may', value: [] }, { name: 'Jun', value: [] }, { name: 'Jul', value: [] }, { name: 'Aug', value: [] }, { name: 'Sep', value: [] }, { name: 'oct', value: [] }, { name: 'nov', value: [] }, { name: 'dec', value: [] }]
                item.attendance.map((sub) => {
                    sub.month.map((month) => {
                        attendanceData.forEach((obj) => {
                            if (obj.name == month.name) {
                                obj.value.push(month.count)
                            }
                        })
                    })
                    attendanceData.forEach((mon) => {
                        let p = 0; let a = 0
                        mon.value.forEach((el) => {
                            p += el.p
                            a += el.a
                        })
                        mon.ptotal = p; mon.atotal = a
                    })
                    return attendanceData
                })


                return {
                    id: item._id,
                    name: item.studentsData[0].name,
                    rollno: item.studentsData[0].rollno,
                    attendanceData
                }
            })
            res.status(200).send(sendData);

        } catch (error) {
            console.log(error);
            return res.status(500).send({ msg: "Some error occcured" })
        }
    },

    getAttendanceBySubject: async function (req, res) {
        try {
            const attendance = mongoose.models[req.query.q] || mongoose.model(req.query.q, attendanceSchema);
            const response = await attendance.aggregate([
                {
                    $lookup: {
                        from: 'students',
                        localField: 'rollId',
                        foreignField: '_id',
                        as: 'studentsData'
                    }
                },
                // { $match: { attendance: { $elemMatch: { sub: 'java' } } } },
                { $project: { 'attendance.sub': 1, 'attendance.month.count': 1, 'attendance.month.name': 1, 'studentsData.name': 1, 'studentsData.rollno': 1 } }
            ]);

            const sendData = [];
            response.forEach((Student) => {
                let attendanceData = []
                Student.attendance.forEach((sub) => {
                    const subjectTotal = { name: sub.sub }

                    let p = 0;
                    let a = 0;

                    sub.month.forEach((month) => {
                        p += month.count.p
                        a += month.count.a
                    })

                    subjectTotal.ptotal = p;
                    subjectTotal.atotal = a;

                    attendanceData.push(subjectTotal)
                })

                sendData.push({ id: Student._id, name: Student.studentsData[0].name, rollno:  Student.studentsData[0].rollno, attendanceData })
            })

            res.status(200).send(sendData)
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Some error occcurd in fetching" })
        }
    },

    getAttendanceDatePerMonthPerStudent : async function(req, res) {
        try {
            const attendance = mongoose.models[req.query.q] || mongoose.model(req.query.q, attendanceSchema);
            const response = await attendance.aggregate([
                {
                    $match: { _id: new mongoose.Types.ObjectId(req.query.id)}
                },
                {
                    $lookup: {
                        from: 'students',
                        localField: 'rollId',
                        foreignField: '_id',
                        as: 'studentsData'
                    }
                },
                { 
                    $project: { 'attendance.sub': 1, 'attendance.month.name': 1, 'attendance.month.count': 1, 'attendance.month.presentDate' : 1, 'studentsData.name': 1, 'studentsData.rollno': 1} 
                }
            ]);
            // filter month--
            let attendanceData = [];
            response[0].attendance.forEach((sub)=> {
                sub.month.forEach((monthData)=>{
                    if(monthData.name == req.query.month) {
                        attendanceData.push({sub: sub.sub, month: {mname: monthData.name, date: monthData.presentDate}})
                        // console.log('data:- ', monthData.presentDate);
                    }
                })
            })
            // console.log(response[0].studentsData);
            const sendData = { studentData: response[0].studentsData, attendanceData }
            res.status(200).send({sendData})
            
        } catch (error) {
            res.status(500).send({ msg: "Some error occcurd in"})
            console.log(error);
        }

    },

    getStudentListPerSheet: async function (req, res) {
        try {
            const attendance = mongoose.models[req.query.q] || mongoose.model(req.query.q, attendanceSchema);
            const response = await attendance.aggregate([
                {
                    $lookup: {
                        from: 'students',
                        localField: 'rollId',
                        foreignField: '_id',
                        as: 'studentsData'
                    }
                },
                { 
                    $project: {'studentsData.name': 1, 'studentsData.rollno': 1} 
                }
            ]);
            res.status(200).send({response})
        } catch (error) {
            res.status(500).send({msg: 'some internal error has occured'})
            console.log(error); 
        }
    }
}

module.exports = attendanceGetControl;

