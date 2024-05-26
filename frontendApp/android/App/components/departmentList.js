import { View, Text, Switch } from 'react-native'
import { useState } from 'react'


const DepartmentList = () => {
    const [isChecked, setChecked] = useState(false);
    return (
        <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', marginHorizontal: 15, borderBottomColor: '#1b418d', borderBottomWidth: .8}}>
            <Text style={{fontSize: 15, fontWeight: 'bold'}}>BCA</Text>
            <Switch
                trackColor={{ false: '#0993ee', true: '#b8e0ff' }}
                thumbColor={setChecked ? '#044f88' : 'black'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setChecked(previousState => !previousState)}
                value={isChecked}
            />
        </View>
    )
}

export default DepartmentList; 