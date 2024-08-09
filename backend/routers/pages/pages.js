const express = require('express');
const pageRouter = express.Router();
const pageController = require('../../controllers/page/pageController');
const { routeAuth } = require('../../middlewares/routeAuth');


pageRouter.get('/', pageController.dashboard); 
pageRouter.get('/students', routeAuth, pageController.students); 
pageRouter.get('/attendance', routeAuth, pageController.attendance); 
pageRouter.get('/:nest/create-attendance', routeAuth, pageController.createAttendance);
pageRouter.get('/:nestone/:nesttwo/add-students', routeAuth, pageController.addStudent);
pageRouter.get('/:nestone/:nesttwo/add-subjects', routeAuth, pageController.addSubject);
pageRouter.get('/:nestone/:nesttwo/add-months', routeAuth,  pageController.addMonth);
pageRouter.get('/settings', routeAuth, pageController.settings);
pageRouter.get('/analysis', routeAuth, pageController.depAnalyse);
pageRouter.get('/analysis/:dep', routeAuth, pageController.analytics);


module.exports = pageRouter;