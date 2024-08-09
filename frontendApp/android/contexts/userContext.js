import { createContext, useEffect, useState } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { _POST } from "../utils/apiReq";

export const AuthContext = createContext()

export function AuthProvider({ children }) {
    const [isLoggedIn, setisLoggedIn] = useState(false)
    const [userInfo, setuserInfo] = useState(null)

    useEffect(() => {
        const checkLogin = async () => {
            const token = await AsyncStorage.getItem('my-key')
            const req = await _POST('auth/apiv1/admin-info', { token })
            if (req.status) {
                setisLoggedIn(true)
                setuserInfo(req.msg.msg)
                return;
            }

            setisLoggedIn(false)
            setuserInfo(null)
            return;
        }
        checkLogin()
    }, [])



    return (
        <AuthContext.Provider value={{ isLoggedIn, setisLoggedIn, userInfo, setuserInfo }}>
            {children}
        </AuthContext.Provider>
    )
}

