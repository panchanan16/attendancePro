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
            token: req.body.token,
            departments: req.body.departments
        })

        try {
            const response = await createAdmin.save({timestamps: true})
            console.log(response);
            res.status(200).send({ msg: `Admin added successfully 👌` }) 
        } catch (error) {
            console.log(error);
            res.status(500).send({ msg: "Some error occurred!"})
        }
    },

    adminLogin: async function (req, res) {
        const {email, password} = req.body
        const response = await adminModel.find({email: email}) 
        const verify = await bcrypt.compare(password, response[0].password);
        if (verify) { 
            const token = jwt.sign({ id : response[0]._id, email: response[0].email }, process.env.JWT_TOKEN, { expiresIn: '1h' });
            res.status(200).send({ msg: "You are Authenticated", token: token})
            const dbresponse = await adminModel.updateOne({_id: response[0]._id}, {token: token})
            console.log(dbresponse);
        } else {
            res.status(401).send({ msg: "You are not Authenticated"}) 
        }
       
    }
}

module.exports = adminControl;