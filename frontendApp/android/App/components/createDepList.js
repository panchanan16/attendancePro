import { FontAwesome5 } from '@expo/vector-icons';
import { useContext, useState } from 'react';
import { styles, style } from '../screen/createSheet/createSheetStyle';
import { Dropdown } from 'react-native-element-dropdown';
import { AttedanceContext } from '../../contexts/attendanceSheetContext';


const CreateDepList = () => {   
    const [isFocus, setIsFocus] = useState(false);
    const {selecteddepartment, setselecteddepartment} = useContext(AttedanceContext)

    const departmentList = [
        { label: 'BCA', value: 'bca' },
        { label: 'BBA', value: 'bba' }
    ];

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