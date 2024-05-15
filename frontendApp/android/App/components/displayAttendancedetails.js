import { StyleSheet, Text, View, ScrollView } from 'react-native'
import React from 'react'
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function DisplayAttendancedetails() {
  return (
    <View style={{marginTop: 15, height: '73%'}}>
       <ScrollView style={styles.container}>
                {
                    [1, 2, 3, 4, 400, 3, 3, 3, 3, 3, 3].map((el, key) => (
                    <View key={key} style={styles.student}>
                        <View style={styles.studentBox}> 
                           <MaterialCommunityIcons name="face-man" size={24} color="black" />
                           <Text>Panchanan deka</Text>
                        </View>
                        <View style={{...styles.status, backgroundColor : `${el === 3 ? '#53c68c' : '#ff4d4d'}`}}>
                            <View><Text style={{color: 'white', fontWeight: 'bold'}}>{el === 3 ? 'P' : 'A'}</Text></View>
                        </View>
                    </View>
                    ))
                }
            </ScrollView>
    </View>
  )
}

const styles = StyleSheet.create({
    studentBox : {
        display : 'felx',
        flexDirection : 'row',
        alignItems : 'center',
        gap: 7,
        marginLeft : 15
        
    },
    student : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        width : '100%',
        height : 60,
        justifyContent: "space-between",
        // borderWidth : 1,
        borderColor : 'black',
        marginTop : 10,
        backgroundColor: 'white'
    },
    status : {
        display : 'flex',
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'center',
        marginRight :15,
        width : 30,
        height : 30,
        borderRadius : 15
    }
})