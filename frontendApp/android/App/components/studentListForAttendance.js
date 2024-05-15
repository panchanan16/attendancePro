import React from 'react'
import { StyleSheet, Text, View, ScrollView} from 'react-native'
import { scale, verticalScale, moderateScale } from 'react-native-size-matters';
import StudentStatus from './studentStatus';
import { useWindowDimensions } from 'react-native';

const StudentListForAttendance = () => {
    const { width, height } = useWindowDimensions();
    console.log(height);
  return (
    <View style={{marginTop: 15, height: height > 800 ? (height / 6)*3.4  : (height / 6)*3.2 }}>
    <ScrollView style={styles.container}>
             {
                 [1, 2, 3, 4, 400, 3, 3, 3, 3, 3, 3].map((el, key) => (
                  <StudentStatus key={key} />
                 ))
             }
         </ScrollView>
 </View>
  )
}

const styles = StyleSheet.create({
    status : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        marginRight :15,
        width : 30,
        height : 30,
        borderRadius : 15
    }
})

export default StudentListForAttendance