import { View, Text, TextInput, Switch, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native'
import React, { useState } from 'react'
import DepartmentList from '../../components/departmentList';
import { styles } from './profileStyle';

const UpdateProfile = () => {
  const [username, setusername] = useState('Panchanan Deka');
  const [isMale, setMale] = useState(false);

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
              [1, 1, 1, 1, 1, 11, 1, 1, 1, 1, 1,].map((el, key) => (
                <DepartmentList key={key} />
              ))

            }
          </ScrollView>
        </View>

        <View>
          <View style={styles.box}>
            <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Gender</Text>
            <View style={{flexDirection: 'row', alignItems: 'center', gap: 20}}>
              <Text style={{fontWeight: 500}}>MALE</Text>
              <Switch
                trackColor={{ false: '#0993ee', true: '#b8e0ff' }}
                thumbColor={setMale ? '#044f88' : 'black'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setMale(previousState => !previousState)}
                value={isMale}
              />
              <Text style={{fontWeight: 500}}>FEMALE</Text>
            </View>
          </View>
        </View>


        <TouchableOpacity style={styles.btn}>
          <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Update</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  )
}

export default UpdateProfile