import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Department from '../screen/department/department';
import Semester from '../screen/department/semester';
import Subjects from '../screen/department/subjects';
import PrevAttendance from '../screen/department/prevAttendance';


export default function DepartmentScreenNav() {
    const Stack = createNativeStackNavigator();

    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="DepartmentHome" component={Department} />
            <Stack.Screen name="semester" component={Semester} />
            <Stack.Screen name="subjects" component={Subjects} />
            <Stack.Screen name="prevattendance" component={PrevAttendance} />
        </Stack.Navigator>
    )
}