import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { FontAwesome6 } from '@expo/vector-icons';

const Semester = ({ navigation }) => {
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={styles.container}>
                <View style={{padding: 8, marginLeft: 10}}>
                    <Text style={{fontSize: 25, fontWeight: 'bold', color: '#0073cc'}}>Semesters</Text>
                </View>

                <TouchableOpacity style={styles.semesterBox} onPress={() => navigation.navigate('subjects')}>
                    <FontAwesome6 name="people-group" size={30} color="#0a4270" />
                    <Text style={{ fontSize: 20, fontWeight: 600, color: '#0a4270' }}>1st Semester</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.semesterBox} onPress={() => navigation.navigate('subjects')}>
                    <FontAwesome6 name="people-group" size={30} color="#0a4270" />
                    <Text style={{ fontSize: 20, fontWeight: 600, color: '#0a4270' }}>1st Semester</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.semesterBox} onPress={() => navigation.navigate('subjects')}>
                    <FontAwesome6 name="people-group" size={30} color="#0a4270" />
                    <Text style={{ fontSize: 20, fontWeight: 600, color: '#0a4270' }}>1st Semester</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.semesterBox} onPress={() => navigation.navigate('subjects')}>
                    <FontAwesome6 name="people-group" size={30} color="#0a4270" />
                    <Text style={{ fontSize: 20, fontWeight: 600, color: '#0a4270' }}>1st Semester</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.semesterBox} onPress={() => navigation.navigate('subjects')}>
                    <FontAwesome6 name="people-group" size={30} color="#0a4270" />
                    <Text style={{ fontSize: 20, fontWeight: 600, color: '#0a4270' }}>1st Semester</Text>
                </TouchableOpacity>

                <TouchableOpacity style={styles.semesterBox} onPress={() => navigation.navigate('subjects')}>
                    <FontAwesome6 name="people-group" size={30} color="#0a4270" />
                    <Text style={{ fontSize: 20, fontWeight: 600, color: '#0a4270' }}>1st Semester</Text>
                </TouchableOpacity>


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