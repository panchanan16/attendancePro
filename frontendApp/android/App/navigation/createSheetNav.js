import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import CreateSheetScreen from '../screen/createSheet/createSheetScreen';
import AttendanceSheet from '../screen/createSheet/attendanceSheet';


const Stack = createNativeStackNavigator();

export default function AttendanceCreateScreenNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="createSheet" component={CreateSheetScreen} />
            <Stack.Screen name="showSheet" component={AttendanceSheet} />
        </Stack.Navigator>
    )
}