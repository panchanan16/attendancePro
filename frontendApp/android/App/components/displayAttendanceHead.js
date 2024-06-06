import { View, Text, StyleSheet } from 'react-native'
import React, { useContext } from 'react'
import { Entypo } from '@expo/vector-icons';
import { FontAwesome5 } from '@expo/vector-icons';
import { useWindowDimensions } from 'react-native';


const DisplayAttendanceHead = ({data, displayItem}) => {
    const { width, height } = useWindowDimensions();
    return (
        <View style={[styles.abox, {height : height/6}]}>
            <View style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: 10 }}>
                <Text style={styles.heading}>{displayItem && displayItem.depName != undefined ? displayItem.depName.toUpperCase() : "Dummy"} {displayItem && displayItem.semester != undefined ? displayItem.semester : ""} sem</Text>
                <View style={styles.headBox}>
                    <View style={styles.iconBox}>
                        <Entypo name="open-book" size={20} color="black" />
                        <Text style={styles.subheading}>{displayItem && displayItem.subject != undefined ? displayItem.subject.toUpperCase() : "Dummy"}</Text>
                    </View>
                    <View style={styles.iconBox}>
                        <FontAwesome5 name="book-reader" size={20} color="black" />
                        <Text style={{ ...styles.subheading, color: '#8A8D8B' }}>Panchanan Deka</Text>
                    </View>
                </View>
            </View>
            <View style={styles.pabox}>
                <View style={{ backgroundColor: '#ccffe8', borderWidth: 1, borderColor: '#00b362', ...styles.pbox }}>
                    <Text style={[styles.paboxText, { color: '#00b362'}]}>Present {data && data.p}</Text>
                </View>
                <View style={{ backgroundColor: '#ffcccc', ...styles.pbox, borderWidth: 1, borderColor: '#cc0000' }}>
                    <Text style={[styles.paboxText, { color: '#cc0000'}]}>Absent {data && data.a}</Text>
                </View>
            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    abox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 15
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#102B77'
    },
    pbox : {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        width: 150,
        height: 40,
        paddingHorizontal: 25,
        borderRadius: 15,
        paddingVertical: 5,
        marginTop: 10
    },
    pabox : {
        display: 'flex',
        alignItems: 'center',
        flexDirection: 'row',
        gap: 15
    },
    paboxText : {
        fontSize: 16,
        fontWeight: 'bold'
    },
    subheading : {
        fontSize: 13,
        color: '#3399ff',
        fontWeight: '600',
      
    },
    iconBox : {
        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, marginHorizontal: 6
    },
    headBox : {width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
     backgroundColor: "white", padding: 12, borderRadius: 10}

})

export default DisplayAttendanceHead