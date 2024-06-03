const express = require('express')
const attendanceGetRouter = express.Router()
const attendanceGetController = require('../../../controllers/main/attendance/attendanceGetCtrl')

attendanceGetRouter.get('/get-Attendance', attendanceGetController.getAttendance)
attendanceGetRouter.get('/getToday-Attendance', attendanceGetController.getTodayAttendance)
attendanceGetRouter.get('/getOverall-Attendance-per-sub', attendanceGetController.getOverallAttendancePerSubject)
attendanceGetRouter.get('/get-Attendance-Per-Subject', attendanceGetController.getTodayAttendancePerSubject)
attendanceGetRouter.get('/get-Attendance-Per-Month', attendanceGetController.getAttendancePerMonth)



module.exports = attendanceGetRouter