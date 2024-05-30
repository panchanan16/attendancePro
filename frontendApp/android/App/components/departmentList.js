import { View, Text, Switch, Button } from 'react-native'
import { useState } from 'react'
import { useContext } from 'react';
import { DepartmentContext } from '../../contexts/departmentContext';
import { departmentToDb } from '../../utils/insertToDbArr';

const DepartmentList = ({name}) => {
    const { departToDb, setdepartToDb } = useContext(DepartmentContext)
    const [isChecked, setChecked] = useState(true);

    function ifValueChange() {
        departmentToDb(!isChecked, name, departToDb, setdepartToDb)
        setChecked(!isChecked)
    }
    
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 15, borderBottomColor: '#1b418d', borderBottomWidth: .8}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>{name && name}</Text>
            <Switch
                trackColor={{ false: '#0993ee', true: '#b8e0ff' }}
                thumbColor={setChecked ? '#044f88' : 'black'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={ifValueChange}
                value={isChecked}
            />
        </View>
    )
}

export default DepartmentList; 