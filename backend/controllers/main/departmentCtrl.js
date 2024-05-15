const department = require('../../models/main/departmentModel')

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
            const departments = await department.find()
            res.status(200).send(departments)
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: `Some thing error occurred while fetching`})
        }
    }
}

module.exports = departmentControl;

