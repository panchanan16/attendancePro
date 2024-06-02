import { ActivityIndicator, SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import { useEffect, useState } from 'react'
import { FontAwesome5 } from '@expo/vector-icons';
import { _GET } from '../../../utils/apiReq';

const Subjects = ({ navigation, route }) => {
    const { department, sem } = route.params;
    const [subject, setsubject] = useState([])
    useEffect(() => {
        async function getSubjectFromDb() {
            if (department && sem) {
                const sub = await _GET(`apiv1/get-subj?dep=${department}&sem=${sem}`)
                if (sub) { setsubject(sub) }
            }
        }
        getSubjectFromDb()
    }, [sem])
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.container}>
                <View style={{ padding: 8, marginLeft: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#0073cc' }}>Subjects</Text>
                </View>

                <View>
                    <ScrollView>
                        {
                            subject.length > 0 ? subject.map((el, key) => (
                                <TouchableOpacity key={key} style={styles.semesterBox} onPress={() => navigation.navigate('prevattendance', {department, sem, subject: el})}>
                                    <FontAwesome5 name="book" size={24} color="#0a4270" />
                                    <Text style={{ fontSize: 20, fontWeight: 600, color: '#0a4270' }}>{el}</Text>
                                </TouchableOpacity>
                            )) : <ActivityIndicator size={'large'} />
                        }
                    </ScrollView>
                </View>

            </View>
        </SafeAreaView>
    )
}

export default Subjects;

const styles = StyleSheet.create({
    container: { flexDirection: 'column', justifyContent: 'center', flexDirection: 'column', gap: 10, marginTop: 20 },
    semesterBox: {
        marginTop: 10,
        flexDirection: 'row',
        gap: 10,
        width: '96%',
        padding: 18,
        marginLeft: 8,
        backgroundColor: '#f0f8ff',
        borderLeftColor: '#0073cc',
        borderLeftWidth: 10,
        marginRight: 30
    }
})