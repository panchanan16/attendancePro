import { SafeAreaView } from 'react-native'
import React, { useEffect } from 'react'
import DisplayAttendanceHead from '../../components/displayAttendanceHead';
import DisplayAttendancedetails from '../../components/displayAttendancedetails';

const ShowAttendance = ({route}) => {
    const { subject, depName, semName, tp, ta } = route.params
    console.log(subject);
   
    return (
        <SafeAreaView style={{ backgroundColor: '#f0f0f5', height: '100%', flex: 1 }}>
            <DisplayAttendanceHead data={{p: tp, a: ta}} displayItem={{subject, depName}}/>
            <DisplayAttendancedetails attendanceMetaData={{subject, depName, semName}} />
        </SafeAreaView>
    )
}

export default ShowAttendance
