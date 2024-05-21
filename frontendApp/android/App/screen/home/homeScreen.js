import { View, Text, SafeAreaView, StyleSheet } from 'react-native'
import AttendanceTook from '../../components/attendanceTook'
import styles from './homeStyle'

const HomeScreen = ({navigation}) => {
  const date = new Date().toLocaleDateString()
 
  return (
    <SafeAreaView style={{backgroundColor: '#f0f0f5', height: '100%', flex: 1}}>
        <View style={{...styles.container, ...styles.headBox}}>
          <Text style={styles.headText}>Today Attendance</Text>
          <Text style={{fontWeight: 600, color: '#3399ff'}}>{date}</Text>
        </View>
        <View>
          <AttendanceTook navi={navigation} />
        </View>
    </SafeAreaView>
  )
}


export default HomeScreen