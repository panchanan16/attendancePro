import { View, Text, SafeAreaView, Alert } from 'react-native'
import React from 'react'
import { SwipeButton } from 'react-native-expo-swipe-button';
import { Feather } from '@expo/vector-icons';
import DisplayAttendanceHead from '../../components/displayAttendanceHead'
import StudentListForAttendance from '../../components/studentListForAttendance';
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';





const AttendanceSheet = () => {
 
  return (
    <SafeAreaView style={{flex: 1}}>
      <DisplayAttendanceHead data={{p: 0, a: 0}} />
      <StudentListForAttendance />
      <View style={{position: 'absolute', bottom: verticalScale(5),  width: '100%'}}>
                <SwipeButton
                    Icon={
                        <Feather name="arrow-right" size={30} color="white" />
                    }
                    iconContainerStyle={{backgroundColor: '#4f4f4f'}}
                    circleBackgroundColor={`#008046`}
                    onComplete={() => Alert.alert("Ok fine !")}
                    title="Swipe to create >>"
                    titleStyle={{ color: '#009954', fontWeight: 600 }}
                    containerStyle={{backgroundColor: '#e6fff4', borderWidth: 1.5, borderColor: '#009954'}}
                    underlayTitle="Done"
                    underlayStyle={{
                        borderRadius: 0,
                        backgroundColor: '#006638',
                    }}
                    goBackToStart = {true}
                    height={60}
                    circleSize={65}
                    borderRadius={80}
                    underlayTitleStyle={{ color: 'white', fontWeight: 'bold' }}
                />
            </View>
    </SafeAreaView>
  )
}

export default AttendanceSheet