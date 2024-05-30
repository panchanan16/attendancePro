import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/userContext';
import MainNav from './App/navigation/mainNav';
import { DepartmentProvider } from './contexts/departmentContext';



export default function App() {
  return (
    <AuthProvider>
      <DepartmentProvider>
        <NavigationContainer>
          <MainNav />
        </NavigationContainer>
      </DepartmentProvider>
    </AuthProvider>
  );
}
