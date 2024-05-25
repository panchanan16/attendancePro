import { View, Text, TextInput, TouchableOpacity, Alert } from 'react-native'
import { styles } from '../screen/login/loginStyle'
import { useContext, useEffect, useState } from 'react'
import { _POST } from '../../utils/apiReq'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { AuthContext } from '../../contexts/userContext';


export default function LoginForm({ head, nav }) {
    const [email, setemail] = useState()
    const [password, setpassword] = useState()
    const {setisLoggedIn} = useContext(AuthContext)

    const storeData = async (value) => {
        try {
          await AsyncStorage.setItem('my-key', value);
        } catch (err) {
           console.log(err);
        }
      }

    async function loginUser() {
        if (email && password) {
            const req = await _POST('auth/apiv1/admin-login', { email, password })
            if (req.status && req.msg.token) {
                await storeData(req.msg.token)
                setisLoggedIn(true)
            } else { Alert.alert('Oops! Wrong crendentials 👎') }
        } else {
            Alert.alert('Please! Enter your crendentials 👌')
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
                    secureTextEntry={true}
                />
                <TouchableOpacity style={styles.button} onPress={loginUser}>
                    <Text style={{ color: "white", fontWeight: 'bold' }}>Login</Text>
                </TouchableOpacity>

            </View>
        </View>
    )
}

