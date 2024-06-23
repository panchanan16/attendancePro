import { View, Text, Pressable, StyleSheet, Alert } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import StudentContext from '../../contexts/studentContext';
import { useContext } from 'react';

const StudentStatus = ({ details }) => {
    const [status, setstatus] = React.useState(undefined)
    const { studentsToDatabase, setStudentToDatabase } = useContext(StudentContext)

    function insertRecord(student) {
        const checkDuplicacy = studentsToDatabase.find((stud)=> stud.rollno === student.rollno)
        if (checkDuplicacy) {
            const index = studentsToDatabase.indexOf(checkDuplicacy) 
            studentsToDatabase.splice(index, 1)
            setStudentToDatabase([...studentsToDatabase, student]) 
        } else {
            setStudentToDatabase([...studentsToDatabase, student])
        }
        return;
    }

    function presentRecord() {
        setstatus(1)
        const eachStudent = { rollno : details && details._id, p: 1, a: 0}
        insertRecord(eachStudent)   
    }

    function absentRecord() {
        setstatus(0)
        const eachStudent = { rollno : details && details._id, p: 0, a: 1}
        insertRecord(eachStudent) 
    }

    const getColor = (status) => {
        switch (status) {
            case 1:
                return '#ccffcc'; 
            case 0:
                return '#ffcccc';
            default:
                return 'white';
        }
    }

    const backgroundColor = getColor(status);

    return (
        <Pressable onLongPress={presentRecord} onPress={absentRecord} style={({ pressed }) => [styles.student, { backgroundColor }]}>
            <View style={styles.studentBox}>
                <MaterialCommunityIcons name="face-man" size={30} color="black" />
                <View>
                    <Text style={{fontWeight: 500}}>{details && details.name}</Text>
                    <Text style={{fontSize: 12}}>{details && details.rollno}</Text>
                </View>
            </View>
        </Pressable>
    )
}

const styles = StyleSheet.create({
    studentBox: {
        display: 'felx',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        marginLeft: 15

    },
    student: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
        justifyContent: "space-between",
        borderColor: 'black',
        marginTop: 10,
        backgroundColor: 'white'
    },
})

export default StudentStatus