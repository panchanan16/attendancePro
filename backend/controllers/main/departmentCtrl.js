const department = require('../../models/main/departmentModel')
const fs = require('fs')

const departmentControl = {
    create : async function(req, res) {
        const createDepartment = new department({ 
            depName: req.body.depName
         })
        try {
            await createDepartment.save({timestamps: true})
            res.status(200).send({ msg: `Department added successfully 👌` })
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: `Some thing error occurred while saving`})
        }
    },

    get : async function(req, res) {
        try {
            const data = fs.readFileSync('./currentSession.json', { encoding: 'utf8' })
            const departments = JSON.parse(data)
            const sendData = departments.currentSession.map((dep)=> dep.department)
            res.status(200).send(sendData)
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: `Some thing error occurred while fetching`})
        }
    }
}

module.exports = departmentControl;

