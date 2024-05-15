const mongoose = require('mongoose')

const departmentSchema = new mongoose.Schema({
    depName : { type: String, required: true}
})


const createDepartment = mongoose.model('Departments', departmentSchema) 

module.exports = createDepartment;