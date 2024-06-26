import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';

const Semester = ({ navigation, route }) => {
    const { name, session } = route.params;

    async function goToSubject(semester) {
        navigation.navigate('subjects', {department: name, sem: semester})
    }

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.container}>
                <View style={{ padding: 8, marginLeft: 10 }}>
                    <Text style={{ fontSize: 25, fontWeight: 'bold', color: '#0073cc' }}>Current Semesters</Text>
                </View>
                {
                    session && session.map((sem, key) => (
                        <TouchableOpacity key={key} style={styles.semesterBox} onPress={() => goToSubject(sem)}>
                            <FontAwesome6 name="people-group" size={30} color="#0a4270" />
                            <Text style={{ fontSize: 20, fontWeight: 600, color: '#0a4270' }}>{sem} Semester</Text>
                        </TouchableOpacity>
                    ))
                }
            </View>
        </SafeAreaView>
    )
}

export default Semester

const styles = StyleSheet.create({
    container: { flexDirection: 'column', justifyContent: 'center', flexDirection: 'column', gap: 10, marginTop: 20 },
    semesterBox: {
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