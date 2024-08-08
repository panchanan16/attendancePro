import { FontAwesome5 } from '@expo/vector-icons';
import { useContext, useState, useEffect } from 'react';
import { styles, style } from '../screen/createSheet/createSheetStyle';
import { Dropdown } from 'react-native-element-dropdown';
import { AttedanceContext } from '../../contexts/attendanceSheetContext';
import { useIsFocused } from '@react-navigation/native';
import { AuthContext } from '../../contexts/userContext';


const CreateDepList = () => {   
    const [isFocus, setIsFocus] = useState(false);
    const {selecteddepartment, setselecteddepartment} = useContext(AttedanceContext)
    const {userInfo} = useContext(AuthContext)

    const departmentList = userInfo && userInfo.departments.map((dep)=> ({label: dep.toUpperCase(), value: dep.toLowerCase()}))

    const isFocused = useIsFocused();

    useEffect(() => {
      if (isFocused) {
        setselecteddepartment("") 
      }
    }, [isFocused]);

    return (
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
            value={selecteddepartment}
            onFocus={() => setIsFocus(true)}
            onBlur={() => setIsFocus(false)}
            onChange={item => {
                setselecteddepartment(item.value);
                setIsFocus(false);
            }}
            renderLeftIcon={() => (
                <FontAwesome5 name="book-reader" style={styles.icon} size={20} color="white" />
            )}
        />
    )
}

export default CreateDepList;