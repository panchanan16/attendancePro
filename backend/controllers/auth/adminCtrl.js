const adminModel = require('../../models/auth/adminModel')
const jwt = require('jsonwebtoken')
const bcrypt = require('bcryptjs');

const adminControl = {
    adminSign: async function (req, res) {
        const hashPassword = await bcrypt.hash(req.body.password, 10);
        const createAdmin = new adminModel({
            name: req.body.name,
            email: req.body.email,
            password: hashPassword,
            departments: req.body.departments
        })
        1
        try {
            const response = await createAdmin.save({ timestamps: true })
            console.log(response);
            res.status(200).send({ msg: `Admin added successfully 👌` })
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Some error occurred!" })
        }
    },

    adminLogin: async function (req, res) {
        const { email, password } = req.body
        const response = await adminModel.find({ email: email }, { email: 1, name: 1, password: 1, departments: 1})
        if (response[0]?.password) {
            const verify = await bcrypt.compare(password, response[0].password);
            if (verify) {
                const token = jwt.sign({ id: response[0]._id, email: response[0].email }, process.env.JWT_TOKEN, { expiresIn: '1h' });
                res.status(200).send({ msg: "You are Authenticated", token: token, userInfo: response })
                const dbresponse = await adminModel.updateOne({ _id: response[0]._id }, { token: token })
            } else {
                res.status(401).send({ msg: "You are not Authenticated" })
            }
        } else {
            res.status(401).send({ msg: "You are not Authenticated" })
        }

    },

    admininfo: async function(req, res) {
        jwt.verify(req.body.token, process.env.JWT_TOKEN, async function(err, decode) {
            if (err) {
              res.status(401).send({ msg: null })
            } else {
              const admin = await adminModel.findOne({ _id: decode.id, email: decode.email, token: req.body.token }, { name: 1, email: 1, departments: 1 });
              if (admin) {res.status(200).send({msg: admin}) } else {
                res.status(401).send({ msg: null })
              }
            }
        });
    },

    updateAdminInfo : async function(req, res) {
        console.log(req.body);
        const { id, name, departments, gender} = req.body
        const response = await adminModel.updateOne({ _id: id}, { name: name, departments: departments, gender: gender})
        console.log(response);
        if(response.modifiedCount > 0) {
            return res.status(200).send({msg: "Updated Successfully 🙌"})
        }

        return res.status(500).send({msg: "Something went wrong!"})
       
    }
}

module.exports = adminControl;