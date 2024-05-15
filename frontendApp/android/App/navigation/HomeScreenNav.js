import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomeScreen from '../screen/home/homeScreen';
import ShowAttendance from '../screen/home/showAttendance';


const Stack = createNativeStackNavigator();

export default function HomeScreenNav() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Attentence" component={HomeScreen} />
            <Stack.Screen name="Sheet" component={ShowAttendance} />
        </Stack.Navigator>
    )
}