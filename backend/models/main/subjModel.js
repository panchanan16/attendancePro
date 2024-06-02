const mongoose = require('mongoose')


const subjSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    subjects: {type: [{sem: String, sub: {type: [String]}}]}
})

const createSubj = mongoose.model('Allrsubjected', subjSchema)

module.exports = createSubj