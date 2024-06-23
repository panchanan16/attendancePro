import { View, Text, SafeAreaView, Alert } from 'react-native'
import { useEffect, useState } from 'react'
import { SwipeButton } from 'react-native-expo-swipe-button';
import { Feather } from '@expo/vector-icons';
import DisplayAttendanceHead from '../../components/displayAttendanceHead'
import StudentListForAttendance from '../../components/studentListForAttendance';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import { _GET, _POST } from '../../../utils/apiReq';
import StudentContext from '../../../contexts/studentContext';
import dayjs from 'dayjs';



const AttendanceSheet = ({ route }) => {
  const { displayData } = route.params;
  const [students, setStudents] = useState([])
  const [studentsToDatabase, setStudentToDatabase] = useState([])
  const todayDate = dayjs().format('DD-MM-YYYY')

  async function submitAttendance() {
    let todayTotalPresent = 0;
    let todayTotalAbsent = 0;

    studentsToDatabase.forEach((el)=> {
       todayTotalPresent += el.p
       todayTotalAbsent += el.a
    })
    console.log(studentsToDatabase, students.length)
    if (studentsToDatabase.length === students.length) {
      const dataToSend = {subject: displayData.subject, month: "jan", todayTotalPresent, todayTotalAbsent, depName: displayData.depName, lastattendancedate: todayDate, attendance: studentsToDatabase}

      const req = await _POST(`apiv1/set-attendance?q=${displayData.depName}_${displayData.semester}_2024`, dataToSend)

      if (req.status) {
        Alert.alert(req.msg.msg)
      } else { Alert.alert("Oops! Something went wrong") }
    } else {
      Alert.alert('Please! Select all the students 👌')
    }
  }

  useEffect(() => {
    async function getStudentListForAttendance() {
      const req = await _GET(`apiv1/get-student-for-attendance?q=${displayData.depName}_${displayData.semester}_2024`)
      if (req) {
        setStudents(req)
        return req;
      } else {
        setStudents([])
        return false;
      }
    }
    getStudentListForAttendance()
  }, [])

  return (
    <StudentContext.Provider value={{ students, studentsToDatabase, setStudentToDatabase }}>
      <SafeAreaView style={{ flex: 1 }}>
        <DisplayAttendanceHead data={{ p: 0, a: 0 }} displayItem={displayData} />
        <StudentListForAttendance/>
        <View style={{ position: 'absolute', bottom: verticalScale(5), width: '100%' }}>
          <SwipeButton
            Icon={
              <Feather name="arrow-right" size={30} color="white" />
            }
            iconContainerStyle={{ backgroundColor: '#4f4f4f' }}
            circleBackgroundColor={`#008046`}
            onComplete={submitAttendance}
            title="Swipe to create >>"
            titleStyle={{ color: '#009954', fontWeight: 600 }}
            containerStyle={{ backgroundColor: '#e6fff4', borderWidth: 1.5, borderColor: '#009954' }}
            underlayTitle="Done"
            underlayStyle={{
              borderRadius: 0,
              backgroundColor: '#006638',
            }}
            goBackToStart={true}
            height={60}
            circleSize={65}
            borderRadius={80}
            underlayTitleStyle={{ color: 'white', fontWeight: 'bold' }}
          />
        </View>
      </SafeAreaView>
    </StudentContext.Provider>
  )
}

export default AttendanceSheet