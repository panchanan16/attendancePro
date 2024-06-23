const Student = require('../../models/main/studentModel')

const studentControl = {
    create: async function (req, res) {
        const createStudent = new Student({
            name: req.body.name,
            rollno: req.body.rollno,
            department: req.body.department,
            sem: req.body.semester,
            year: req.body.enroll
        })
        try {
            await createStudent.save({ timestamps: true })
            res.status(200).send({ msg: `Student added successfully 👌` })
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: error })
        }
    },

    get: async function (req, res) {
        try {
            const students = await Student.find()
            res.status(200).send(students)
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: error })
        }
    },
    getWithFilter: async function (req, res) {
        try {
            const students = await Student.find({ department: req.query.dep, sem: req.query.sem })
            res.status(200).send(students)
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: error })
        }
    }
}


module.exports = studentControl