import { StyleSheet } from "react-native";

const profileStyle = StyleSheet.create({
    dname : {
        fontSize: 24,
        fontWeight: "bold",
        color: "#102B77",
    },

    profileBox : {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        gap: 18
    },
    logout : {
        width: "100%",
        position: "absolute",
        bottom: 15,
        flexDirection: "row", 
        alignItems: "center",
        justifyContent: 'center',
        gap: 15,
        borderTopWidth: .2,
        borderColor: '#1C1678',
        paddingTop: 15
    },
    sname : {
        fontSize: 16,
        fontWeight: "bold",
        color: "#0095ff",
    }, 
    btn : {
        width: "50%",
        height: 50,
        backgroundColor: "#102B77",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 25,
        shadowColor: "rgba(255, 255, 255)",
        elevation: 20
    }
})

export default profileStyle;