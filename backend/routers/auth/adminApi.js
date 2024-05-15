const express = require('express');
const adminRouter = express.Router();
const adminController = require('../../controllers/auth/adminCtrl');

adminRouter.post('/admin-signin', adminController.adminSign)
adminRouter.post('/admin-login', adminController.adminLogin)

module.exports = adminRouter;