import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { FontAwesome } from '@expo/vector-icons';
import { _GET } from '../../utils/apiReq';

const DepartmentToSem = ({nav, depname}) => {   
    async function goToSemester() {
        const sem = await _GET(`apiv1/get-session-by-name?name=${depname && depname}`)
        if (sem) {
            console.log(sem);
            nav.navigate('semester', {name: sem.data.department, session: sem.data.session}) 
        }
       
    }

    return (
        <TouchableOpacity  style={{ padding: 10 }} onPress={goToSemester}>
            <View style={styles.abox}>
                <View style={{ flexDirection: 'row', gap: 15, marginHorizontal: 10, alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#b8e0ff', padding: 20, borderRadius: 50 }}>
                        <FontAwesome name="book" size={25} color="#0a4270" />
                    </View>
                    <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                        <Text style={styles.heading}>{depname} department</Text>
                    </View>
                </View>
            </View>
        </TouchableOpacity>
    )
}

const styles = StyleSheet.create({
    abox: {
        padding: 14,
        marginTop: 8,
        width: '100%',
        padding: 10,
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent: 'space-around',
        borderRadius: 20,
        backgroundColor: '#f0f8ff', borderWidth: 1, borderColor: '#0a4270'
    },
    heading: {
        color: '#0a4270',
        fontSize: 20,
        fontWeight: 'bold'
    }

})

export default DepartmentToSem