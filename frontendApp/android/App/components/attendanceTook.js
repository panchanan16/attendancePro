import { View, Text, StyleSheet, ScrollView, TouchableOpacity, useWindowDimensions} from 'react-native'
import React from 'react'

const AttendanceTook = ({navi}) => {
    const { width, height } = useWindowDimensions();

    return (
        <View style={{ height: `${height > 800 ? '92%' : '91%'}`, paddingBottom: 10, marginTop: 15 }}>
            <ScrollView style={styles.container}>
                {
                    [1, 2, 3, 4, 400, 3, 3, 3, 3, 3, 3].map((el, key) => (
                    <TouchableOpacity key={key} onPress={() => navi.navigate('Sheet')}>
                        <View style={styles.abox}>
                            <View>
                                <View style={{display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'baseline'}}>
                                  <Text style={styles.heading}>BCA {el} sem</Text>
                                  <Text style={{...styles.subheading, color:'#8A8D8B'}}>Panchanan Deka</Text>
                                </View>
                                <Text style={styles.subheading}>Web development</Text>
                            </View>
                            <View style={styles.pabox}>
                                <View style={{backgroundColor: '#ccffe8',  borderWidth: 1, borderColor: '#00b362', ...styles.pbox}}>
                                    <Text style={[styles.paboxText, {color: '#00b362'}]}>Present {el}</Text>
                                </View>
                                <View style={{backgroundColor: '#ffcccc', borderWidth: 1, borderColor: '#cc0000', ...styles.pbox}}>
                                    <Text style={[styles.paboxText, {color: '#cc0000'}]}>Absent 20</Text>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                    ))
                }
            </ScrollView>
        </View>

    )
}

const styles = StyleSheet.create({
    container: {
        height: '100%',
        paddingHorizontal: 10
    },
    abox: {
        padding: 14,
        marginTop: 10,
        width: '100%',
        border: '1px solid black',
        height: 100,
        display: 'flex',
        flexDirection: 'column',
        gap: 2,
        justifyContent:'space-around',
        borderRadius: 20, backgroundColor: 'white'
    },
    heading: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    subheading: {
        fontSize: 13,
        color: '#3399ff',
        fontWeight: '600'
    },
    pabox: { display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between',
     },
    pbox: {
        padding: 3,
        paddingHorizontal: 15,
        borderRadius: 10,
        paddingVertical: 5
    },
    paboxText: {
        color: 'white',
        fontSize: 13,
        fontWeight: 'bold'
    }
})

export default AttendanceTook;