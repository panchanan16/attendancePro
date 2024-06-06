import { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { styles, style } from '../screen/createSheet/createSheetStyle';
import { MaterialIcons } from '@expo/vector-icons';
import { _GET } from '../../utils/apiReq';
import { AttedanceContext } from '../../contexts/attendanceSheetContext';

const CreateSemList = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [semesterList, setsemesterList] = useState([])
    const {selecteddepartment, selectedsemester, setselectedsemester} = useContext(AttedanceContext)

    useEffect(()=> {
        async function getSemesterList() {
            if(selecteddepartment === null) { return; }
            const req = await _GET('apiv1/get-session-by-name?name=BCA')
            if (req) {
               const semTemp = []
               req.data.session.length > 0 && req.data.session.forEach((sess) => {
                 semTemp.push({ label: `${sess} semester`, value: sess })
               })
               setsemesterList(semTemp)
            } else {
                setsemesterList([])
                return;
            }
        }
        getSemesterList()
    }, [selecteddepartment])


    return (
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
            value={selectedsemester}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                selecteddepartment && setselectedsemester(item.value);
                setIsFocus(false);
            }}
            renderLeftIcon={() => (
                <MaterialIcons name="people" size={24} style={styles.icon} color="white" />
            )}
        />
    )
}

export default CreateSemList;