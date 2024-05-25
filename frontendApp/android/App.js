import { StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { AuthProvider } from './contexts/userContext';
import MainNav from './App/navigation/mainNav';



export default function App() {
  return (
  <AuthProvider>
    <NavigationContainer>
      <MainNav />
    </NavigationContainer>
  </AuthProvider>
  );
}
