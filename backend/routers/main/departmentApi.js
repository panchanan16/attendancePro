const express = require('express')
const departmentRouter = express.Router()
const departmentController = require('../../controllers/main/departmentCtrl')

departmentRouter.post('/create-department', departmentController.create)
departmentRouter.get('/get-department', departmentController.get)

module.exports = departmentRouter;