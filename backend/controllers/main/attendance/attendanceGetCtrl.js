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

    getTodayAttendance: async function (req, res) {
        const adminDepartment = ['bca_1sts', 'bba_1sts']
        const date = "06/06/2024"
        const attendent = "Panchanan Deka"
        const promises = []

        adminDepartment.forEach( async (collectionName)=> {
            const perquery = new Promise(async (resolve, reject) => {
                try {
                    const attendance = mongoose.model(collectionName, attendanceSchema);
                    const response = await attendance.find(
                        { 'attendance.lastattendance': date },
                        { lastatttendent: 1, 'attendance.todaypresent': 1, 'attendance.todayabsent': 1, rollno: 1, 'attendance.sub': 1 }
                    )
                    resolve(response)
                } catch (error) {
                    console.log(error);
                    reject(error);
                }
            }
        )
            promises.push(perquery)
        })

      
      Promise.all(promises).then((data)=>{
        res.status(200).send(data)
      }).catch((error)=>{
        console.log(error);
        res.status(500).send({msg : "Some Internal Server Error Has Occurred"})
      })

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

