import { View, Text, TextInput, Switch, SafeAreaView, ScrollView, TouchableOpacity, Alert } from 'react-native'
import { useContext, useState } from 'react'
import DepartmentList from '../../components/departmentList';
import { styles } from './profileStyle';
import { AuthContext } from '../../../contexts/userContext';
import { DepartmentContext } from '../../../contexts/departmentContext';
import { _POST } from '../../../utils/apiReq';

const UpdateProfile = () => {
  const { userInfo, setuserInfo } = useContext(AuthContext)
  const [username, setusername] = useState(userInfo?.name ? userInfo?.name : 'username')
  const [isMale, setMale] = useState(false)
  const {departToDb} = useContext(DepartmentContext);

  async function profileUpdate() { 
    const depts =  departToDb.length > 0 ? departToDb : userInfo.departments
    const gender = isMale ? 'FEMALE' : 'MALE'
    const req = await _POST('auth/apiv1/update-admin-info', {id: userInfo._id, name: username, departments: depts, gender})
    if (req.status) {
      Alert.alert(req.msg.msg)
      setuserInfo(null)
    } else { Alert.alert(req.msg.msg) }
  }

  return (
      <SafeAreaView style={{ flex: 1 }}>
        <View style={{ width: '100%', padding: 15 }}>
          <View style={{ alignItems: 'center', justifyContent: 'center' }}>
            <Text style={{ fontSize: 20, fontWeight: 'bold' }}>Update Your Profile Here</Text>
          </View>

          <View style={{ marginTop: 20 }}>
            <View style={styles.box}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Name</Text>
              <TextInput
                style={styles.input}
                onChangeText={setusername}
                value={username}
              />
            </View>
          </View>


          <View style={{ height: 300, alignItems: 'flex-start', padding: 10, backgroundColor: 'white' }}>
            <View>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Department</Text>
            </View>
            <ScrollView style={{ width: '100%' }}>
              {
                ['BCA', 'BBA', 'BCOM', 'BSC', 'BVOC', 'BA'].map((el, key) => (
                  <DepartmentList name={el} key={key} />
                ))

              }
            </ScrollView>
          </View>

          <View>
            <View style={styles.box}>
              <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Gender</Text>
              <View style={{ flexDirection: 'row', alignItems: 'center', gap: 20 }}>
                <Text style={{ fontWeight: 500 }}>MALE</Text>
                <Switch
                  trackColor={{ false: '#0993ee', true: '#b8e0ff' }}
                  thumbColor={setMale ? '#044f88' : 'black'}
                  ios_backgroundColor="#3e3e3e"
                  onValueChange={() => setMale(previousState => !previousState)}
                  value={isMale}
                />
                <Text style={{ fontWeight: 500 }}>FEMALE</Text>
              </View>
            </View>
          </View>

          <TouchableOpacity style={styles.btn} onPress={profileUpdate}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Update</Text>
          </TouchableOpacity>

        </View>
      </SafeAreaView>
  )
}

export default UpdateProfile