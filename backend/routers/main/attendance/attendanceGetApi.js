const express = require('express')
const attendanceGetRouter = express.Router()
const attendanceGetController = require('../../../controllers/main/attendance/attendanceGetCtrl')

attendanceGetRouter.get('/get-Attendance', attendanceGetController.getAttendance)
attendanceGetRouter.get('/getToday-Attendance', attendanceGetController.getTodayAttendance)
attendanceGetRouter.get('/getOverall-Attendance', attendanceGetController.getOverallAttendance)

module.exports = attendanceGetRouter