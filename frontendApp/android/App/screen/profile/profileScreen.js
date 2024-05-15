import { View, Text, SafeAreaView, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import profile from '../../../assets/profile.webp'
import profileStyle from './profileStyle'
import profilebg from '../../../assets/profilebg.png'
import { AntDesign } from '@expo/vector-icons';

const ProfileScreen = () => {
  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      <View>
        <Image source={profilebg} style={{ width: '100%', height: 150}} />
        <View style={profileStyle.profileBox}>
          <Image source={profile} style={{ width: 100, height: 100 }} />
          <Text style={profileStyle.dname}>Panchanan Deka</Text>
          <Text style={profileStyle.sname}>BCA, BBA</Text>
        </View>
      </View>

      <View style={{alignItems: 'center', marginTop: 50}}>
        <TouchableOpacity style={profileStyle.btn}>
          <Text style={{color: 'white', fontWeight: 'bold'}}>Update Profile</Text>
        </TouchableOpacity>
      </View>


      <View style={profileStyle.logout}>
        <AntDesign name="logout" size={24} color="#102B77" />
        <View><Text style={{color: '#102B77'}}>LogOut</Text></View>
      </View>
    </SafeAreaView>
  )
}

export default ProfileScreen