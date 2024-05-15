const mongoose = require('mongoose');


mongoose.connect(process.env.DATABASE_URL)
  .then(() => console.log('Connected to mongodb server 🖥️!')).catch((err)=>{ console.log('Failed to connect to mongodb server', err)})

module.exports = mongoose;

