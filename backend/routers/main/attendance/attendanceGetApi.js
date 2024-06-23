const express = require('express')
const attendanceGetRouter = express.Router()
const attendanceGetController = require('../../../controllers/main/attendance/attendanceGetCtrl')

attendanceGetRouter.get('/get-Attendance', attendanceGetController.getAttendance)
attendanceGetRouter.get('/getToday-Attendance', attendanceGetController.getTodayAttendance)
attendanceGetRouter.get('/getOverall-Attendance-per-sub', attendanceGetController.getOverallAttendancePerSubject)
attendanceGetRouter.get('/get-Attendance-Per-Subject', attendanceGetController.getTodayAttendancePerSubject)
attendanceGetRouter.get('/get-Attendance-by-month', attendanceGetController.getAttendanceByMonth)
attendanceGetRouter.get('/get-Attendance-by-subject', attendanceGetController.getAttendanceBySubject)
attendanceGetRouter.get('/get-all-today-attendace', attendanceGetController.getAllTodayAttendace)
attendanceGetRouter.get('/get-student-for-attendance', attendanceGetController.getStudentForAttendance)


module.exports = attendanceGetRouter