import { StyleSheet, Text, View, ScrollView } from 'react-native'
import { useEffect, useState } from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { _GET } from '../../utils/apiReq';
import dayjs from 'dayjs';

export default function DisplayAttendancedetails({ attendanceMetaData }) {
    const [status, setstatus] = useState([])
    const { subject, depName } = attendanceMetaData
    const todayDate = dayjs().format('DD-MM-YYYY')
    useEffect(() => {
        async function getStudentStatus() {
            const req = await _GET(`apiv1/get-Attendance-Per-Subject?sub=${subject}&q=${depName}_1st&date=${todayDate}`)
            if (req) {
                const data = []
                req.forEach((stud) => {
                    stud.attendance.forEach((subj) => {
                        if (subj.sub == subject) {
                            data.push({ id: stud.rollId, status: subj })
                        }
                    })
                })
                console.log(data);
                return setstatus(data)
            }
            return;
        }
        getStudentStatus()

    }, [])

    return (
        <View style={{ marginTop: 15, height: '73%' }}>
            <ScrollView style={styles.container}>
                {
                    status.length > 0 && status.map((el, key) => (
                        <View key={key} style={styles.student}>
                            <View style={styles.studentBox}>
                                <MaterialCommunityIcons name="face-man" size={24} color="black" />
                                <Text>{el.id}</Text>
                            </View>
                            <View style={{ ...styles.status, backgroundColor: `${el.status.todaypresent === 1 ? '#53c68c' : '#ff4d4d'}` }}>
                                <View><Text style={{ color: 'white', fontWeight: 'bold' }}>{el.status.todaypresent === 1 ? 'P' : 'A'}</Text></View>
                            </View>
                        </View>
                    ))
                }
            </ScrollView>
        </View>
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
        // borderWidth : 1,
        borderColor: 'black',
        marginTop: 10,
        backgroundColor: 'white'
    },
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