import { StyleSheet, Text, View, ScrollView } from 'react-native'
import StudentStatus from './studentStatus';
import { useWindowDimensions } from 'react-native';
import StudentContext from '../../contexts/studentContext';
import { useContext } from 'react';

const StudentListForAttendance = () => {
    const { students } = useContext(StudentContext)
    const { width, height } = useWindowDimensions();

    return (
        <View style={{ marginTop: 15, height: height > 800 ? (height / 6) * 3.4 : (height / 6) * 3.2 }}>
            <ScrollView style={styles.container}>
                {
                    students.length > 0 && students.map((el, key) => (
                        <StudentStatus key={key} details={el} />
                    ))
                }
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    status: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        width: 30,
        height: 30,
        borderRadius: 15
    }
})

export default StudentListForAttendance