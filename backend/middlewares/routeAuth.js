const jwt = require('jsonwebtoken');
const adminModel = require('../models/auth/adminModel');

async function routeAuth(req, res, next) {
    jwt.verify(req.body.token, process.env.JWT_TOKEN, async function(err, decode) {
      if (err) {
        res.status(401).send({ msg: 'You are not authorized to access this' })
      } else {
        const admin = await adminModel.findOne({ _id: decode.id, email: decode.email });
        if (admin) { next() } else {
          res.status(401).send({ msg: 'You are not authorized to access this' })
        }
      }
  
  });
  
}

module.exports = {routeAuth}