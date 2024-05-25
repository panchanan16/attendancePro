import React, { useContext } from 'react'
import LoginScreen from '../screen/login/loginScreen';
import HomeTab from './TabNavigation';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { AuthContext } from '../../contexts/userContext';


const Stacklog = createNativeStackNavigator();
const Stackmain = createNativeStackNavigator();

const MainNav = () => {

    const { isLoggedIn } = useContext(AuthContext)

    if (isLoggedIn) {
        return (
            <Stackmain.Navigator screenOptions={{ headerShown: false }}>
                <Stackmain.Screen name="Main" component={HomeTab} />
            </Stackmain.Navigator>
        )
    }

    return (
        <Stacklog.Navigator screenOptions={{ headerShown: false }}>
            <Stacklog.Screen name="Home" component={LoginScreen} />
        </Stacklog.Navigator>
    )
}

export default MainNav;