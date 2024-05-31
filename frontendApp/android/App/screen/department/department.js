import { View, Text, SafeAreaView, StyleSheet, TouchableOpacity, ScrollView } from 'react-native'
import {useContext, useState} from 'react'
import { AuthContext } from '../../../contexts/userContext';
import DepartmentToSem from '../../components/departmentToSem';

const Department = ({navigation}) => {
    const {userInfo} = useContext(AuthContext)

    return (
        <SafeAreaView style={{ backgroundColor: 'white', flex: 1 }}>
            <View style={{ height: '92%', paddingBottom: 10, marginTop: 15 }}>
                <ScrollView>
                    {
                        userInfo && userInfo?.departments.map((el, key) => (
                           <DepartmentToSem depname={el} key={key} nav={navigation} />
                        ))
                    }
                </ScrollView>
            </View>
        </SafeAreaView>
    )
}


export default Department