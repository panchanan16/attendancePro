const Student = require('../../models/main/studentModel')
const sheetModel = require('../../models/main/sheetsCollectionModel')
const todayTotal = require('../../models/main/totalModel');
const fs = require('fs')


const pageController = {
    dashboard : async (req, res) => {
        res.redirect('/analysis');
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
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const departments = JSON.parse(data)
        res.render('./main/attendance', {response, departments});
    },

    createAttendance : async  (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const departments = JSON.parse(data)
        res.render('./main/createAttendance', {departments});
    },

    addStudent : async  (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const departments = JSON.parse(data)
        res.render('./main/addStudents', {departments});
    },

    addSubject : async  (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const departments = JSON.parse(data)
        res.render('./main/addSubjects', {departments});
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
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const sendData = JSON.parse(data)
        res.status(200).render('./main/analytics', {sendData});
    },

    settings : async (req, res) => {
        const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
        const sendData = JSON.parse(data)
        res.status(200).render('./main/settings', {sendData});
    }

}

module.exports = pageController;