const express = require('express')
const attendanceRouter = express.Router()
const attendanceController = require('../../../controllers/main/attendance/attendanceCreateCtrl')

attendanceRouter.post('/create-subject', attendanceController.addSubject)
attendanceRouter.post('/create-month', attendanceController.addMonth)
attendanceRouter.post('/set-attendance', attendanceController.setAttendance)
attendanceRouter.post('/verify-attendance', attendanceController.getAttendanceVerify)
attendanceRouter.post('/add-students-tosheet', attendanceController.addStudentSheet)
attendanceRouter.post('/add-students-onedit', attendanceController.addStudentSheetOnEdit)

// 1. create createAttendanceSheet.
// 2. create subject.
// 3. create month.
// 4. create attedance.

module.exports = attendanceRouter