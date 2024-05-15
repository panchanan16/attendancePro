import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'
import DisplayAttendanceHead from '../../components/displayAttendanceHead';
import DisplayAttendancedetails from '../../components/displayAttendancedetails';

const ShowAttendance = () => {
    return (
        <SafeAreaView style={{ backgroundColor: '#f0f0f5', height: '100%', flex: 1 }}>
            <DisplayAttendanceHead data={{p: 20, a: 6}} />
            <DisplayAttendancedetails />
        </SafeAreaView>
    )
}

export default ShowAttendance
