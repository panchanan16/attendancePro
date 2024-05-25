import { createNativeStackNavigator } from '@react-navigation/native-stack';
import ProfileScreen from '../screen/profile/profileScreen';
import UpdateProfile from '../screen/profile/updateProfile';


export default function ProfileScreenNav() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Mainprofile" component={ProfileScreen} />
            <Stack.Screen name="updateProfile" component={UpdateProfile} />
        </Stack.Navigator>
    )
}