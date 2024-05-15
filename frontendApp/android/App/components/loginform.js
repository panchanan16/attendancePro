import { View, Text, TextInput, TouchableOpacity, Alert} from 'react-native'
import { styles } from '../screen/login/loginStyle'
import { useState } from 'react'


export default function LoginForm({head, nav}) {
    const [email, setemail] = useState()
    const [password, setpassword] = useState()

    function loginUser() {
        if (email && password && email === 'email.com' && password === '123') {
            nav.navigate('Main')
        } else {
            Alert.alert('Oops! Wrong crendentials')
        }
    }
    return (
        <View style={styles.loginBox}>
            <View style={styles.LoginTextBox}>
                <Text style={styles.loginTextHead}>Login</Text><Text style={styles.loginTextSub}>as {head ? 'teacher' : 'student'}</Text>
            </View>
            <View style={{ width: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 20 }}>
                <TextInput
                    editable
                    onChangeText={setemail}
                    maxLength={40}
                    placeholder="Enter Your Username"
                    placeholderTextColor="#888888"
                    style={styles.inputText}
                />
                <TextInput
                    editable
                    onChangeText={setpassword}
                    maxLength={40}
                    placeholderTextColor="#888888"
                    placeholder="Enter Your Password"
                    style={styles.inputText}
                />
                <TouchableOpacity style={styles.button} onPress={loginUser}>
                    <Text style={{ color: "white", fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

