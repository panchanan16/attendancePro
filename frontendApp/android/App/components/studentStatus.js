import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

const StudentStatus = () => {
    const [status, setstatus] = React.useState(undefined)

    function presentRecord(params) {
        setstatus(1)
    }

    
    function absentRecord(params) {
        setstatus(0)
    }

    const getColor = (status) => {
        switch (status) {
          case 1:
            return '#ffcccc';
          case 0:
            return '#ccffcc';
          default:
            return 'white'; 
        }
    }

    const backgroundColor = getColor(status);

    return (
        <Pressable onLongPress={presentRecord} onPress={absentRecord} style={({ pressed }) => [styles.student, {backgroundColor}]}>
            <View style={styles.studentBox}>
                <MaterialCommunityIcons name="face-man" size={24} color="black" />
                <Text>Panchanan deka</Text>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    studentBox : {
        display : 'felx',
        flexDirection : 'row',
        alignItems : 'center',
        gap: 7,
        marginLeft : 15
        
    },
    student : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        width : '100%',
        height : 60,
        justifyContent: "space-between",
        // borderWidth : 1,
        borderColor : 'black',
        marginTop : 10,
        backgroundColor: 'white'
    },
})

export default StudentStatus