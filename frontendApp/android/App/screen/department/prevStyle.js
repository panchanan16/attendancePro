import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    abox: {
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    heading: {
        fontSize: 25,
        fontWeight: 'bold',
        color: '#102B77'
    },
    subheading: {
        fontSize: 13,
        color: '#3399ff',
        fontWeight: '600',

    },
    iconBox: {
        display: 'flex', flexDirection: 'row', justifyContent: 'center', alignItems: 'center', gap: 5, marginHorizontal: 6
    },
    headBox: {
        width: '100%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between',
        backgroundColor: "white", padding: 12, borderRadius: 10
    },
    studentBox: {
        display: 'felx',
        flexDirection: 'row',
        alignItems: 'center',
        gap: 7,
        marginLeft: 15

    },
    student: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        width: '100%',
        height: 60,
        justifyContent: "space-between",
        // borderWidth : 1,
        borderColor: 'black',
        marginTop: 10,
        backgroundColor: 'white'
    },
    status: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 15,
        width: 36,
        height: 36,
        borderRadius: 50,
    }

})