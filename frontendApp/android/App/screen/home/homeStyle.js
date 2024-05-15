import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
    headText: {
      fontSize: 20,
      fontWeight: "bold",
      color: "#102B77"
    },
    container: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
      backgroundColor: "white"
  
    },
    headBox : {
      marginTop: 15,
      gap:5,
      padding: 10,
      borderRadius: 20,
      paddingHorizontal: 30,
      marginHorizontal: 10,
      shadowColor: 'black',
      shadowOffset: { width: 2, height: 10 },
      shadowOpacity: 0.5,
    }
  }
  )

  export default styles;
