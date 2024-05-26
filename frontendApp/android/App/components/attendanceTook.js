import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions, RefreshControl} from 'react-native'
import { useCallback, useEffect, useState } from 'react'
import { _GET } from '../../utils/apiReq';

const AttendanceTook = ({navi, todayData}) => {
    const { width, height } = useWindowDimensions();

    const [attendanceData, setattendanceData] = useState([])

    const [refreshing, setRefreshing] = useState(false);

    async function getTodayAttendance() {
        const req = await _GET('apiv1/getToday-Attendance?date=15/06/2024')
        if (req) { setattendanceData(req) }
        return;
    }

    const onRefresh = useCallback(() => {
      setRefreshing(true);
      setTimeout(async () => {
        await getTodayAttendance();
        setRefreshing(false);
      }, 1500);
    }, []);

    useEffect(() => {
      getTodayAttendance()
  }, [])

    return (
        <View style={{ height: `${height > 800 ? '92%' : '91%'}`, paddingBottom: 10, marginTop: 15 }}>
            <ScrollView style={styles.container} refreshControl={<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />}>
                {
                    attendanceData.length > 0 && attendanceData.map((el, key) => (
                    <TouchableOpacity key={key} onPress={()=> navi.navigate('Sheet', {subject: 'Java', depName: "BCA", tp: el.todayTotalPresent, ta: el.todayTotalAbsent})}>
                        <View style={styles.abox}>
                            <View>
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                  <Text style={styles.heading}>{el.depName}</Text>
                                  <Text style={{...styles.subheading, color:'#8A8D8B'}}>Panchanan Deka</Text>
                                </View>
                                <Text style={styles.subheading}>{el.subject }</Text>
                            </View>
                            <View style={styles.pabox}>
                                <View style={{backgroundColor: '#ccffe8',  borderWidth: 1, borderColor: '#00b362', ...styles.pbox}}>
                                    <Text style={[styles.paboxText, {color: '#00b362'}]}>Present {el.todayTotalPresent}</Text>
                                </View>
                                <View style={{backgroundColor: '#ffcccc', borderWidth: 1, borderColor: '#cc0000', ...styles.pbox}}>
                                    <Text style={[styles.paboxText, {color: '#cc0000'}]}>Absent {el.todayTotalAbsent}</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 10
    },
    abox: {
        padding: 14,
        marginTop: 10,
        width: '100%',
        border: '1px solid black',
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent:'space-around',
        borderRadius: 20, backgroundColor: 'white'
    },
    heading: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    subheading: {
        fontSize: 13,
        color: '#3399ff',
        fontWeight: '600'
    },
    pabox: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
     },
    pbox: {
        padding: 3,
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingVertical: 5
    },
    paboxText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold'
    }
})

export default AttendanceTook;