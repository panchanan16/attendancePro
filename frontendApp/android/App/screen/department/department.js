import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import React from 'react'
import { FontAwesome } from '@expo/vector-icons';

const Department = ({navigation}) => {
    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ height: '92%', paddingBottom: 10, marginTop: 15 }}>
                <ScrollView>
                    {
                        ['BCA', 'BBA'].map((el, key) => (
                            <TouchableOpacity  key={key} style={{ padding: 10 }} onPress={() => navigation.navigate('semester')}>
                                <View style={styles.abox}>
                                    <View style={{ flexDirection: 'row', gap: 15, marginHorizontal: 10, alignItems: 'center' }}>
                                        <View style={{ backgroundColor: '#b8e0ff', padding: 20, borderRadius: 50 }}>
                                            <FontAwesome name="book" size={25} color="#0a4270" />
                                        </View>
                                        <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline' }}>
                                            <Text style={styles.heading}>{el} department</Text>
                                        </View>
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ))
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
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

export default Department