import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import React from 'react'
import AttendanceTook from '../../components/attendanceTook'
import styles from './homeStyle'

const HomeScreen = ({navigation}) => {
  return (
    <SafeAreaView style={{backgroundColor: '#f0f0f5', height: '100%', flex: 1}}>
        <View style={{...styles.container, ...styles.headBox}}>
          <Text style={styles.headText}>Today Attendance</Text>
          <Text style={{fontWeight: 600, color: '#3399ff'}}>23/23/2024</Text>
        </View>
        <View>
          <AttendanceTook navi={navigation} />
        </View>
    </SafeAreaView>
  )
}


export default HomeScreen