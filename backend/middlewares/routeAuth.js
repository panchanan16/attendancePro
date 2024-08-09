const jwt = require('jsonwebtoken');
const adminModel = require('../models/auth/adminModel');

async function routeAuth(req, res, next) {
  jwt.verify(req.cookies.dispucollege, process.env.JWT_TOKEN, async function (err, decode) {
    if (err) { return res.status(401).redirect('/') }

    const admin = await adminModel.findOne({ _id: decode.id, email: decode.email });
    if (admin && admin.email == decode.email) { next() } else {
      return res.status(401).redirect('/')
    }
  });

}

module.exports = { routeAuth }