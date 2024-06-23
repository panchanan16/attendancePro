const express = require('express');
const subjRouter = express.Router();
const subjController = require('../../controllers/main/subjCtrl')


subjRouter.post('/add-subj', subjController.addSubj)
subjRouter.get('/get-subj', subjController.getSubj)
subjRouter.get('/get-subj-by-dep', subjController.getSubjByDep)
subjRouter.get('/delete-subj', subjController.deleteSubj)


module.exports = subjRouter;