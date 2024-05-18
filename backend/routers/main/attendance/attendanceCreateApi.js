const express = require('express')
const attendanceRouter = express.Router()
const attendanceController = require('../../../controllers/main/attendance/attendanceCreateCtrl')

attendanceRouter.post('/create-attendance', attendanceController.createAttendance)
attendanceRouter.post('/create-subject', attendanceController.addSubject)
attendanceRouter.post('/create-month', attendanceController.addMonth)
attendanceRouter.post('/create-attendancesheet', attendanceController.createAttendanceSheet)
attendanceRouter.post('/set-attendance', attendanceController.setAttendance)
attendanceRouter.post('/verify-attendance', attendanceController.getAttendanceVerify)

// 1. create createAttendanceSheet.
// 2. create subject.
// 3. create month.
// 4. create attedance.

module.exports = attendanceRouter