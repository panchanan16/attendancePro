import { useContext, useEffect, useState } from 'react';
import { Dropdown } from 'react-native-element-dropdown';
import { FontAwesome6 } from '@expo/vector-icons';
import { styles, style } from '../screen/createSheet/createSheetStyle';
import { _GET } from '../../utils/apiReq';
import { AttedanceContext } from '../../contexts/attendanceSheetContext';

const CreateSubList = () => {
    const [isFocus, setIsFocus] = useState(false);
    const [subjectList, setsubjectList] = useState([]);
    const {selectedsemester, selectedsubject, selecteddepartment, setselectedsubject} = useContext(AttedanceContext)

    useEffect(()=> {
        async function getsubjectList() {
            if(selectedsemester === null) { return}
            const req = await _GET(`apiv1/get-subj?dep=${selecteddepartment.toUpperCase()}&sem=${selectedsemester}`)
            if (req) {
               const subTemp = []
               req.length > 0 && req.forEach((sess) => {
                 subTemp.push({ label: sess, value: sess })
               })
               setsubjectList(subTemp)
            } else {
                setsubjectList([])
                return;
            }
        }
        getsubjectList()
    }, [selectedsemester])

    return (
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
                value={selectedsubject}
                onFocus={() => {setIsFocus(true)}}
                onBlur={() => setIsFocus(false)}
                onChange={item => {
                    selectedsemester && setselectedsubject(item.value);
                    setIsFocus(false);
                }}
                renderLeftIcon={() => (
                    <FontAwesome6 name="book" size={20} style={styles.icon} color="white" />
                )}
            />
    )
}

export default CreateSubList
