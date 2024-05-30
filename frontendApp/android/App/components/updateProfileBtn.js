import { useContext } from 'react';
import { Text, TouchableOpacity, StyleSheet } from 'react-native'
import { DepartmentContext } from '../../contexts/departmentContext';

const UpdateProfileBtn = () => {
    const {departToDb} = useContext(DepartmentContext);

    return (
        <TouchableOpacity style={styles.btn} onPress={() => console.log(departToDb)}>
            <Text style={{ color: 'white', fontWeight: 'bold', fontSize: 16 }}>Update</Text>
        </TouchableOpacity>
    )
}


export const styles = StyleSheet.create({
    btn: {
      marginTop: 20,
      width: "50%",
      height: 50,
      backgroundColor: "#102B77",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      borderRadius: 25,
      shadowColor: "rgba(255, 255, 255)",
      elevation: 20,
      alignSelf: 'center'
    }
  });

export default UpdateProfileBtn