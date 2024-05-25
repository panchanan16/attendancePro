import { View, Text, Image, TouchableOpacity, StatusBar, SafeAreaView } from 'react-native'
import login from '../../../assets/login.png'
import { useContext, useState } from 'react'
import loginend from '../../../assets/loginend.png'
import LoginForm from '../../components/loginform'
import { styles } from './loginStyle'
import { FontAwesome5 } from '@expo/vector-icons';
import { FontAwesome6 } from '@expo/vector-icons';
import { AuthContext } from '../../../contexts/userContext'

export default function LoginScreen({ navigation }) {
    const [loginType, setloginType] = useState(true)
    const {username} = useContext(AuthContext)
    console.log(username);
    return (
        <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }} >
            <StatusBar />
            <View style={{ padding: 10, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
                <Image source={login} style={{ zIndex: 10, position: 'absolute', right: 0, top: 0, width: 200, height: 150 }} />

                <LoginForm head={loginType} nav={navigation} />

                <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'center', marginTop: 80 }}>
                    <View style={{ zIndex: 10, width: "100%", display: 'flex', flexDirection: 'column', marginTop: -85, justifyContent: 'center', alignItems: 'center', gap: 20 }}>
                        <Text style={{ fontWeight: 'bold', color: "#102B77" }}>Login As</Text>
                        <View style={{ width: "100%", display: 'flex', flexDirection: 'row', justifyContent: 'space-evenly' }}>
                            <TouchableOpacity style={styles.optbox} onPress={()=> setloginType(true)}>
                                <FontAwesome5 name="chalkboard-teacher" size={35} color="#0a4270" />
                                <Text style={{ color: '#0a4270', fontWeight: 'bold' }}>teacher</Text>
                            </TouchableOpacity>
                            <TouchableOpacity onPress={()=> setloginType(false)} style={styles.optbox}>
                                <FontAwesome6 name="people-group" size={40} color="#0a4270" />
                                <Text style={{ color: '#0a4270', fontWeight: 'bold' }}>student</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </View>
                <Image source={loginend} style={{ position: 'absolute', left: 0, bottom: 0, width: 200, height: 200 }} />
            </View>
            
        </SafeAreaView>
    )
}

