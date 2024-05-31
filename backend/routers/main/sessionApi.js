const express = require('express');
const sessionController = require('../../controllers/main/sessionControl');
const sessionRouter = express.Router()

sessionRouter.get('/get-session', sessionController.getSession);

sessionRouter.get('/get-session-by-name', sessionController.getSessionByName)

sessionRouter.post('/update-session', sessionController.updateSession)

module.exports = sessionRouter