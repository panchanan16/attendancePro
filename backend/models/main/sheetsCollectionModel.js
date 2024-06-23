const mongoose = require('mongoose');

const sheetsSchema = new mongoose.Schema({
    name : { type: String, required: true, unique: true },
    students: { type: Number, required: true },
    subjects: { type: [String]},
    months: { type: [String]}
})

const createSheets = mongoose.model('Sheets', sheetsSchema);

module.exports = createSheets;
