import { View, Text, SafeAreaView, ScrollView, ActivityIndicator } from 'react-native'
import { useWindowDimensions } from 'react-native';
import { styles } from './prevStyle';
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useEffect, useState } from 'react';
import { _GET } from '../../../utils/apiReq';

const PrevAttendance = ({ route }) => {
    const { department, sem, subject } = route.params;
    const { width, height } = useWindowDimensions();
    const [attendancePerSub, setAttendancePerSub] = useState([])
    useEffect(() => {
        async function getStudentAttendance() {
            const req = await _GET(`apiv1/getOverall-Attendance-per-sub?sub=${subject}&q=${department.toLowerCase()}_1st`)
            if (req) { return setAttendancePerSub(req.sendData) }
        }
        getStudentAttendance()
    }, [subject])

    return (
        <SafeAreaView style={{ backgroundColor: '#f0f0f5', height: '100%', flex: 1 }}>
            <View style={[styles.abox, { height: height / 6 }]}>
                <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                    <Text style={styles.heading}>BCA 1st sem</Text>
                    <View style={styles.headBox}>
                        <View style={styles.iconBox}>
                            <Entypo name="open-book" size={20} color="black" />
                            <Text style={styles.subheading}>{subject && subject.toUpperCase()}</Text>
                        </View>
                        <View style={styles.iconBox}>
                            <FontAwesome5 name="book-reader" size={20} color="black" />
                            <Text style={{ ...styles.subheading }}>Total class - {attendancePerSub.length > 0 && attendancePerSub[0].present + attendancePerSub[0].absent}</Text>
                        </View>
                    </View>
                </View>
            </View>

            <View style={{ height: '78%' }}>
                <ScrollView style={styles.container}>
                    {
                        attendancePerSub.length > 0 ? attendancePerSub.map((el, key) => (
                            <View key={key} style={styles.student}>
                                <View style={styles.studentBox}>
                                    <MaterialCommunityIcons name="face-man" size={24} color="black" />
                                    <View>
                                        <Text style={{fontSize: 13, fontWeight: 500}}>{el.details?.name}</Text>
                                        <Text style={{fontSize: 11}}>{el.details?.rollno}</Text>
                                    </View>
                                </View>
                                <View style={{ flexDirection: 'row', gap: 5 }}>
                                    <View style={{ ...styles.status, backgroundColor: '#53c68c' }}>
                                        <View><Text style={{ color: 'white', fontWeight: 'bold' }}>{el.present}</Text></View>
                                    </View>
                                    <View style={{ ...styles.status, backgroundColor: '#ff4d4d' }}>
                                        <View><Text style={{ color: 'white', fontWeight: 'bold' }}>{el.absent}</Text></View>
                                    </View>
                                </View>
                            </View>
                        )) : <ActivityIndicator size="large" color="#0000ff" />
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}

export default PrevAttendance                  