import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Entypo } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import HomeScreenNav from './HomeScreenNav';
import AttendanceCreateScreenNav from './createSheetNav';
import DepartmentScreenNav from './departmentNav';
import { SafeAreaView } from 'react-native';
import ProfileScreenNav from './profileNav';

function HomeTab() {
  const Tab = createBottomTabNavigator();

  return (
    <SafeAreaView style={{flex: 1}}>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreenNav} options={{
          tabBarLabel: 'home',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="home" size={size} color={color} />
          ),
        }} />
        <Tab.Screen name="Sheet" component={AttendanceCreateScreenNav} options={{
          tabBarLabel: 'create',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="circle-with-plus" size={size} color={color} />
          ),
        }} />
        <Tab.Screen name="Department" component={DepartmentScreenNav} options={{
          tabBarLabel: 'department',
          tabBarIcon: ({ color, size }) => (
            <Entypo name="book" size={size} color={color} />
          ),
        }} />
        <Tab.Screen name="Profile" component={ProfileScreenNav} options={{
          tabBarLabel: 'My Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="face-man-profile" size={size} color={color} />
          ),
        }} />
      </Tab.Navigator>
    </SafeAreaView>
  );
}

export default HomeTab;