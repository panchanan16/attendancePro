const sheetModel = require('../../models/main/sheetsCollectionModel')
const mongoose = require('mongoose')


const sheetsController = {
    addSheets: async function (req, res) {
         const createSheet = new sheetModel({
            name: req.body.sheetName,
            students: 30,
        })
        try {
            await createSheet.save({ timestamps: true })
            res.status(200).send({ msg: `Sheet added successfully 👌` })
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: error })
        }
    },

    getSheets : async function (req, res) {
         const response = await sheetModel.find()
         console.log(req);
    },

    deleteSheet : async function (req, res) {
        const db = mongoose.connection.db
        await db.collection(req.query.q).drop();
        const del = await sheetModel.deleteOne({name: req.query.q})
        if (del.deletedCount > 0) {
            return res.status(200).send({ msg: 'Sheet deleted successfully'}) 
        }
        return res.status(500).send({ msg: "Some went wrong" })
       
    }
}

module.exports = sheetsController