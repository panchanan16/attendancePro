import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    loginBox: {
        display: "flex",
        flexDirection: "column",
        gap: 20,
        backgroundColor: "white",
        width: '100%',
        height: '60%',
        justifyContent: "center",
        alignItems: "center"
    },
    LoginTextBox: {
        display: "flex",
        flexDirection: "row",
        gap: 10,
        alignItems: "baseline",
        marginRight: 80
    
    },
    loginTextHead: {
        color: "#102B77",
        fontSize: 30,
        fontWeight: "bold"
    },
    loginTextSub: {
        color: "#33aefd",
        fontSize: 16,
    },
    optbox: {
        backgroundColor: "white",
        width: 110,
        height: 100,
        justifyContent: "center",
        alignItems: "center",
        borderRadius: 10,
        borderWidth: 2,
        borderColor: "#B2C0E6"
    },
    inputText: { padding: 10, paddingLeft: 15, backgroundColor: "white", width: "80%", borderRadius: 10, borderWidth: 2, borderColor: "#102B77"},
    button: {width: '40%', padding: 15, backgroundColor: "#102B77", display: "flex", alignItems: "center", borderRadius: 20}

});