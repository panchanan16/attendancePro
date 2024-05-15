const express = require('express');
const app = express();
const attendance = require('./utils/arrangeWithDate')
const fs = require('fs');
const compression = require('compression');
// const cpuProfilerMiddleware = require('./middlewares/checkPerformance');
require('dotenv').config();
const connect = require('./config/db.connect')

//App process
app.use(compression());
app.use(express.json());
// app.use(cpuProfilerMiddleware);


//Routers 
const studentRoutes = require('./routers/main/studentApi')
const departmentRoutes = require('./routers/main/departmentApi')
const attendanceRoutesC = require('./routers/main/attendance/attendanceCreateApi')
const attendanceRoutesG = require('./routers/main/attendance/attendanceGetApi')
const adminRoutes = require('./routers/auth/adminApi')


//Routes--
app.use('/apiv1', studentRoutes)
app.use('/apiv1', departmentRoutes);
app.use('/apiv1', attendanceRoutesC);
app.use('/apiv1', attendanceRoutesG);
app.use('/auth/apiv1', adminRoutes);


app.get('/', (req, res) => {
  const data = fs.readFileSync('./data.json', { encoding: 'utf8'})
  const sendData = JSON.parse(data)
  const student = sendData.bca.sem.students
  let respond = attendance.ArrangeAttendanceWithDate(student)
//   const ans = [1,2,3,4].reduce((acc, student) => acc + student)
  res.send({ result : respond });
});


app.listen(3000, () => console.log('Our app listening on port 3000!🚀'));