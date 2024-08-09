const express = require('express');
const app = express();
const attendance = require('./utils/arrangeWithDate')
const compression = require('compression');
const path = require('path');
const cookieParser = require('cookie-parser')
// const cpuProfilerMiddleware = require('./middlewares/checkPerformance');
require('dotenv').config();
require('./config/db.connect')

//App process
app.use(cookieParser())
app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }))
// app.use(cpuProfilerMiddleware);

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs')
app.use(express.static(path.join(__dirname, 'public')))


//Routers 
const studentRoutes = require('./routers/main/studentApi')
const departmentRoutes = require('./routers/main/departmentApi')
const attendanceRoutesC = require('./routers/main/attendance/attendanceCreateApi')
const attendanceRoutesG = require('./routers/main/attendance/attendanceGetApi')
const adminRoutes = require('./routers/auth/adminApi')
const sessionRoutes = require('./routers/main/sessionApi')
const subjRoutes = require('./routers/main/subjApi')
const sheetsRoutes = require('./routers/main/sheetsApi')

// Pages Routes 
const pageRoutes = require('./routers/pages/pages')


//Routes--
app.use('/apiv1', studentRoutes)
app.use('/apiv1', departmentRoutes);
app.use('/apiv1', attendanceRoutesC);
app.use('/apiv1', attendanceRoutesG);
app.use('/apiv1', sessionRoutes);
app.use('/apiv1', subjRoutes);
app.use('/auth/apiv1', adminRoutes);
app.use('/apiv1', sheetsRoutes)

// page 
app.use('/', pageRoutes);


app.listen(3000, () => console.log('Our app listening on port 3000!🚀'));