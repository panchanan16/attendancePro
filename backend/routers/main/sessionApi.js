const express = require('express');
const sessionController = require('../../controllers/main/sessionControl');
const sessionRouter = express.Router()

sessionRouter.get('/get-session', sessionController.getSession);
sessionRouter.post('/add-session', sessionController.addSession);

sessionRouter.get('/get-session-by-name', sessionController.getSessionByName)
sessionRouter.put('/update-session', sessionController.updateSession)

sessionRouter.delete('/delete-session', sessionController.deleteSession)

module.exports = sessionRouter