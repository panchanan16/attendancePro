import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, Alert } from 'react-native'
import React from 'react'
import { Dropdown } from 'react-native-element-dropdown';
import { SwipeButton } from 'react-native-expo-swipe-button';
import { Feather } from '@expo/vector-icons';
import DateTimePicker from 'react-native-ui-datepicker';
import { Fontisto } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { MaterialIcons } from '@expo/vector-icons';
import { styles, style } from './createSheetStyle';
import { _POST } from '../../../utils/apiReq';

const CreateSheetScreen = ({ navigation }) => {
    const departmentList = [
        { label: 'BCA', value: 'bca_' },
        { label: 'BBA', value: 'bba_' }
    ];
    const semesterList = [
        { label: '1st semester', value: '1sts' },
        { label: '2nd semester', value: '2nds' }
    ];
    const subjectList = [
        { label: 'Java', value: 'Java' },
        { label: 'C++', value: 'Cpp' }
    ];

    const [department, setDepartment] = React.useState(null);
    const [semester, setSemester] = React.useState(null);
    const [subject, setSubject] = React.useState(null);

    const [isFocus, setIsFocus] = React.useState(false);
    const [date, setDate] = React.useState()
    const [overlay, setoverlay] = React.useState(false)

    function displayDate() {
        setoverlay(true)
    }

    async function gotoAttendanceList(params) {
        if (department && semester && subject) {
            const displayData = {department, semester, subject}
            const req = await _POST(`apiv1/verify-attendance?q=bca_1sts`, { sub: 'Java', date: "1/06/2024" })
            if (req && req.status && req.msg.result) {
                navigation.navigate('showSheet', { displayData } )
            } else {
                Alert.alert(req?.msg.msg)
            }
        } else {
            Alert.alert('Please! Select all the fields 👌')
        }
    }

    return (
        <SafeAreaView style={{ marginHorizontal: 5, height: '100%' }}>
            <View style={{ display: 'felx', alignItems: 'center', marginTop: 10 }}>
                <Text style={styles.heading}>Create Attendance Sheet</Text>
            </View>
            <View style={styles.headBox}>
                <View style={styles.pickerBox}>
                    <Dropdown
                        style={[style.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={style.placeholderStyle}
                        selectedTextStyle={style.selectedTextStyle}
                        inputSearchStyle={style.inputSearchStyle}
                        iconStyle={style.iconStyle}
                        data={departmentList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Department' : '...'}
                        searchPlaceholder="Search..."
                        value={department}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setDepartment(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <FontAwesome5 name="book-reader" style={styles.icon} size={20} color="white" />
                        )}
                    />
                    <Dropdown
                        style={[style.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={style.placeholderStyle}
                        selectedTextStyle={style.selectedTextStyle}
                        inputSearchStyle={style.inputSearchStyle}
                        iconStyle={style.iconStyle}
                        data={semesterList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Semester' : '...'}
                        searchPlaceholder="Search..."
                        value={semester}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setSemester(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <MaterialIcons name="people" size={24} style={styles.icon} color="white" />
                        )}
                    />

                    <Dropdown
                        style={[style.dropdown, isFocus && { borderColor: 'blue' }]}
                        placeholderStyle={style.placeholderStyle}
                        selectedTextStyle={style.selectedTextStyle}
                        inputSearchStyle={style.inputSearchStyle}
                        iconStyle={style.iconStyle}
                        data={subjectList}
                        search
                        maxHeight={300}
                        labelField="label"
                        valueField="value"
                        placeholder={!isFocus ? 'Select Subject' : '...'}
                        searchPlaceholder="Search..."
                        value={subject}
                        onFocus={() => setIsFocus(true)}
                        onBlur={() => setIsFocus(false)}
                        onChange={item => {
                            setSubject(item.value);
                            setIsFocus(false);
                        }}
                        renderLeftIcon={() => (
                            <FontAwesome6 name="book" size={20} style={styles.icon} color="white" />
                        )}
                    />

                    <TouchableOpacity style={{ ...style.dropdown, display: 'flex', flexDirection: 'row', alignItems: 'center', paddingVertical: 18 }} onPress={() => displayDate()}>
                        <Fontisto name="date" size={20} color="white" style={{ marginRight: 10 }} />
                        <Text style={{ fontSize: 16, color: 'white', fontWeight: 400 }}>Select Date</Text>
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

            <View style={{ position: 'absolute', bottom: 10, width: '100%' }}>
                <SwipeButton
                    Icon={
                        <Feather name="arrow-right" size={30} color="white" />
                    }
                    circleBackgroundColor={`#008046`}
                    onComplete={gotoAttendanceList}
                    title="Swipe to create >>"
                    containerStyle={{ backgroundColor: '#e6fff4', borderWidth: 1.5, borderColor: '#009954' }}
                    underlayTitle="Done"
                    underlayStyle={{
                        borderRadius: 0,
                        backgroundColor: '#004d2a',
                    }}
                    goBackToStart={true}
                    height={60}
                    circleSize={65}
                    borderRadius={80}
                    titleStyle={{ color: '#009954', fontWeight: 600 }}
                    underlayTitleStyle={{ color: 'white', fontWeight: 'bold' }}
                />
            </View>

        </SafeAreaView>
    )
}



export default CreateSheetScreen