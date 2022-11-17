import { StyleSheet } from "react-native";
import { baseColors } from "../../../constants/baseColors";

export const inputCommonStyles = StyleSheet.create({
    container: {
        flexDirection: 'column',
        backgroundColor: "#FFFFFF",
        borderRadius: 8,
        paddingTop: 5,
        paddingBottom: 5,
        paddingLeft: 10,
        paddingRight: 10,
        elevation: 15,
        shadowColor: baseColors.shadowColor
    },
    label: {
        marginBottom: 5,
        color: "#B5B5B5"
    },
    input: {
        fontSize: 18,
        color: "#8E8E8E",
        fontWeight: "500"
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    modalView: {
        backgroundColor: "white",
        borderRadius: 20,
        padding: 5,
        alignItems: "center",
        shadowColor: "#878787",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 5,
        height: "auto",
        width: "90%"
    },
    button: {
        borderRadius: 20,
        padding: 10,
        elevation: 2
    },
    buttonOpen: {
        backgroundColor: "#F194FF",
    },
    buttonClose: {
        backgroundColor: "#2196F3",
    },
    textStyle: {
        color: "white",
        fontWeight: "bold",
        textAlign: "center"
    },
    modalText: {
        marginBottom: 15,
        textAlign: "center"
    },
    comboStyle: {
        borderRadius: 8,
        borderWidth: 0,
        backgroundColor: "#FFF"
    }
});