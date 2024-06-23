const express = require('express');
const pageRouter = express.Router();
const pageController = require('../../controllers/page/pageController')


pageRouter.get('/', pageController.dashboard); 
pageRouter.get('/students', pageController.students); 
pageRouter.get('/attendance', pageController.attendance); 
pageRouter.get('/:nest/create-attendance', pageController.createAttendance);
pageRouter.get('/:nestone/:nesttwo/add-students', pageController.addStudent);
pageRouter.get('/:nestone/:nesttwo/add-subjects', pageController.addSubject);
pageRouter.get('/:nestone/:nesttwo/add-months', pageController.addMonth);
pageRouter.get('/settings', pageController.settings);
pageRouter.get('/analysis', pageController.depAnalyse);
pageRouter.get('/analysis/:dep', pageController.analytics);


module.exports = pageRouter;