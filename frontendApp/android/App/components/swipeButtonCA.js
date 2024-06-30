import { Alert, View } from 'react-native'
import { SwipeButton } from 'react-native-expo-swipe-button';
import { Feather } from '@expo/vector-icons';
import { useContext } from 'react';
import { AttedanceContext } from '../../contexts/attendanceSheetContext';
import dayjs from 'dayjs';
import { _POST } from '../../utils/apiReq';


const SwipeButtonCA = ({nav}) => {
    const {selecteddepartment, selectedsemester, selectedsubject} = useContext(AttedanceContext)
    
    async function gotoAttendanceList() {
        if (selecteddepartment && selectedsemester && selectedsubject) {
            console.log(selectedsubject);
            const todayDate = dayjs().format('DD-MM-YYYY')
            const displayData = {depName: selecteddepartment, semester: selectedsemester, subject: selectedsubject}

            const req = await _POST(`apiv1/verify-attendance?q=${selecteddepartment}_${selectedsemester}_${new Date().getFullYear()}`, { sub: selectedsubject, date: todayDate })

            if (req && req.status && req.msg.result) {
                nav.navigate('showSheet', { displayData } )
            } else {
                Alert.alert(req?.msg.msg)
            }
        } else { 
            Alert.alert('Please! Select all the fields 👌')
        }
    }

    return (
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

    )
}

export default SwipeButtonCA