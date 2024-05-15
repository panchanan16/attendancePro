import { StyleSheet } from 'react-native'

export const styles = StyleSheet.create({
    headBox: {
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: 'flex-start',
        gap: 20,
        backgroundColor: "#dfe9ff",
        width: '100%',
        height: '50%',
        borderRadius: 20,
        marginTop: 15,
        padding: 10,
        borderColor: '#000000',
        borderWidth: 1

    },

    heading: {
        fontSize: 22,
        fontWeight: "bold",
        color: "#002966",
    },

    picker: {
        width: 160,
        color: "white",
        backgroundColor: "#0047b3",
        marginHorizontal: 15,
        borderRadius: 20,
        height: 30,
        fontSize: 15,
        fontWeight: "bold",
        shadowColor: 'black',
    },

    pickerBox: {
        display: "flex",
        width: '100%',
        flexDirection: "column",
        gap: 10,
        alignItems: 'center'

    },

    btn: {
        backgroundColor: '#cce0ff',
        padding: 12,
        borderRadius: 15,
        borderWidth: 1.5,
        borderColor: '#002966',
    },
    icon: {
        marginRight: 10
    },
    dateBox: {
        display: 'block',
        backgroundColor: 'white',
        padding: 15,
        paddingBottom: 20,
        borderRadius: 15,
        marginHorizontal: 5
    },
    overlay: {
        position: 'absolute',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: 'rgba(0,0,0,0.7)',
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 1000,
    }
})

export const style = StyleSheet.create({
    container: {
        backgroundColor: 'white',
        padding: 16,
    },
    dropdown: {
        width: '90%',
        borderRadius: 15,
        paddingHorizontal: 15,
        paddingVertical: 10,
        backgroundColor: '#002966',
        marginTop: 12
    },
    icon: {
        marginRight: 5,
    },
    label: {
        position: 'absolute',
        backgroundColor: 'white',
        left: 22,
        top: 8,
        zIndex: 999,
        paddingHorizontal: 8,
        fontSize: 14,
    },
    placeholderStyle: {
        fontSize: 16,
        color: 'white',
        fontWeight: 400
    },
    selectedTextStyle: {
        fontSize: 14,
        color: "white",
        fontWeight: 600,
    },
    iconStyle: {
        width: 20,
        height: 20
    },
    inputSearchStyle: {
        height: 40,
        fontSize: 16,
    },
});

