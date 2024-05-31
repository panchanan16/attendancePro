const express = require('express');
const app = express();
const attendance = require('./utils/arrangeWithDate')
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
const sessionRoutes = require('./routers/main/sessionApi')


//Routes--
app.use('/apiv1', studentRoutes)
app.use('/apiv1', departmentRoutes);
app.use('/apiv1', attendanceRoutesC);
app.use('/apiv1', attendanceRoutesG);
app.use('/apiv1', sessionRoutes);
app.use('/auth/apiv1', adminRoutes);


app.listen(3000, () => console.log('Our app listening on port 3000!🚀'));