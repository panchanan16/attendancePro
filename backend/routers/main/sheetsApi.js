const express = require('express')
const sheetsRouter = express.Router()
const sheetController = require('../../controllers/main/sheetsCtrl')

sheetsRouter.post('/add-sheets', sheetController.addSheets)
sheetsRouter.delete('/delete-sheet', sheetController.deleteSheet)

module.exports = sheetsRouter;