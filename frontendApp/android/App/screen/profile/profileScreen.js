import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React, { useContext } from 'react'
import profile from '../../../assets/profile.webp'
import profileStyle from './profileStyle'
import profilebg from '../../../assets/profilebg.png'
import { AntDesign } from '@expo/vector-icons';
import { AuthContext } from '../../../contexts/userContext'
import AsyncStorage from '@react-native-async-storage/async-storage'

const ProfileScreen = ({navigation}) => {
  const {setisLoggedIn, userInfo} = useContext(AuthContext)

  async function LogOutHandler() {
      await AsyncStorage.removeItem('my-key')
      setisLoggedIn(false)
  }
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        <Image source={profilebg} style={{ width: '100%', height: 150}} />
        <View style={profileStyle.profileBox}>
          <Image source={profile} style={{ width: 100, height: 100 }} />
          <Text style={profileStyle.dname}>{userInfo?.name}</Text>
          <Text style={profileStyle.sname}>BCA, BBA</Text>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop: 50}}>
        <TouchableOpacity style={profileStyle.btn} onPress={()=> navigation.navigate('updateProfile')}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Update Profile</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={profileStyle.logout} onPress={LogOutHandler}>
        <AntDesign name="logout" size={24} color="#102B77" />
        <View><Text style={{color: '#102B77', fontWeight: 'bold'}}>LogOut</Text></View>
      </TouchableOpacity>

    </SafeAreaView>
  )
}

export default ProfileScreen