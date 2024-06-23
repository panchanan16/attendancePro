const Student = require('../../models/main/studentModel')
const sheetModel = require('../../models/main/sheetsCollectionModel')
const subModel = require('../../models/main/subjModel')
const fs = require('fs')


const pageController = {
    dashboard : async (req, res) => {
        res.render('./main/index');
    },

    students : async (req, res) => {
        try {
            const students = await Student.find()
            const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
            const departments = JSON.parse(data)
            res.status(200).render('./main/students', {students, departments});
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: error })
        }
    },

    attendance : async  (req, res) => {
        const response = await sheetModel.find()
        res.render('./main/attendance', {response});
    },

    createAttendance : async  (req, res) => {
        res.render('./main/createAttendance');
    },

    addStudent : async  (req, res) => {
        res.render('./main/addStudents');
    },

    addSubject : async  (req, res) => {
        res.render('./main/addSubjects');
    },

    addMonth : async (req, res) => {
        res.render('./main/addMonths');
    },

    depAnalyse : async (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const sendData = JSON.parse(data)
        res.status(200).render('./main/departmentAnalyse', {sendData});
    },

    analytics : async (req, res) => {
        res.status(200).render('./main/analytics')
    },

    settings : async (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const sendData = JSON.parse(data)
        res.status(200).render('./main/settings', {sendData});
    }

}

module.exports = pageController;