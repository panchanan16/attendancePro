import { View, Text, SafeAreaView, TouchableOpacity } from 'react-native'
import React from 'react'
import DateTimePicker from 'react-native-ui-datepicker';
import { Fontisto } from '@expo/vector-icons';
import { styles, style } from './createSheetStyle';
import { _POST } from '../../../utils/apiReq';
import dayjs from 'dayjs';
import CreateSubList from '../../components/createSubList';
import CreateDepList from '../../components/createDepList';
import CreateSemList from '../../components/createSemList';
import SwipeButtonCA from '../../components/swipeButtonCA';
import { AttendanceProvider } from '../../../contexts/attendanceSheetContext';

const CreateSheetScreen = ({ navigation }) => {
    const [date, setDate] = React.useState()
    const [overlay, setoverlay] = React.useState(false)
    const todayDate = dayjs().format('DD-MM-YYYY')

    return (
    <AttendanceProvider>
        <SafeAreaView style={{ marginHorizontal: 5, height: '100%' }}>
            <View style={{ display: 'flex', alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.heading}>Create Attendance Sheet</Text>
            </View>
            <View style={styles.headBox}>
                <View style={styles.pickerBox}>
                    <CreateDepList /> 
                    <CreateSemList />  
                    <CreateSubList />
                    <TouchableOpacity style={{ ...style.dropdown, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 18 }}>
                        <Fontisto name="date" size={20} color="white" style={{ marginRight: 10 }} />
                        <Text style={{ fontSize: 16, color: 'white', fontWeight: 400 }}>{todayDate}</Text>
                    </TouchableOpacity>
                </View>
            </View>

            <View style={{ ...styles.overlay, display: `${overlay ? 'block' : 'none'}` }}>
                <View style={styles.dateBox}>
                    <DateTimePicker
                        mode="single"
                        date={date}
                        height={230}
                        onChange={(params) => setDate(params.date)}
                    />
                </View>
                <TouchableOpacity onPress={() => setoverlay(false)} style={{ backgroundColor: 'transparent', width: '100%', height: 100 }}></TouchableOpacity>
            </View>

            <SwipeButtonCA nav={navigation} />    
        </SafeAreaView>
    </AttendanceProvider>
    )
}



export default CreateSheetScreen