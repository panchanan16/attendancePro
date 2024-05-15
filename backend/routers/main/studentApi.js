const express = require('express');
const studentRouter = express.Router();
const studentController = require('../../controllers/main/studentCtrl')
const { routeAuth } = require('../../middlewares/routeAuth')


studentRouter.post('/create-student', routeAuth,  studentController.create)
studentRouter.get('/get-student', studentController.get)

module.exports = studentRouter;