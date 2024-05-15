const Student = require('../../models/main/studentModel')

const studentControl = {
    create : async function(req, res) {
        const createStudent = new Student({ 
            name: req.body.name, rollno: req.body.rollno
         })
        try {
            await createStudent.save({timestamps: true})
            res.status(200).send({ msg: `Student added successfully 👌` })
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: error })
        }
    },

    get : async function(req, res) {
        try {
            const students = await Student.find()
            res.status(200).send(students)
        } catch (error) {
            console.log(error)
            res.status(500).send({ msg: error })
        }
    },
}

// {
//   "name" : "Panchanan Deka",
//   "rollno" : "BCA/23/23",
//   "token" : "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJmb28iOiJiYXIiLCJpYXQiOjE3MTUxNTMxMjgsImV4cCI6MTcxNTE1NjcyOH0.zZMXzDmjr1gXS38FApQ-G5Fduyh0fWooS1SGND41vFI"
// }

module.exports = studentControl