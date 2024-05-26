import { View, Text, SafeAreaView, BackHandler, Alert } from 'react-native'
import AttendanceTook from '../../components/attendanceTook'
import styles from './homeStyle'
import { useCallback, useEffect } from 'react'
import { useFocusEffect } from '@react-navigation/native'

const HomeScreen = ({ navigation }) => {
  const date = new Date().toLocaleDateString()

  useFocusEffect(
    useCallback(() => {
      const onBackPress = () => {
        Alert.alert('Alert', 'Are you sure to exit the app??', [
          { text: 'Cancel', onPress: () => null},
          {text: 'OK', onPress: () => BackHandler.exitApp()}
        ]);
        return true
      };

      const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);

      return () => subscription.remove();
    }, [])
  );

  return (
    <SafeAreaView style={{ backgroundColor: '#f0f0f5', height: '100%', flex: 1 }}>
      <View style={{ ...styles.container, ...styles.headBox }}>
        <Text style={styles.headText}>Today Attendance</Text>
        <Text style={{ fontWeight: 600, color: '#3399ff' }}>{date}</Text>
      </View>
      <View>
        <AttendanceTook navi={navigation} />
      </View>
    </SafeAreaView>
  )
}


export default HomeScreen