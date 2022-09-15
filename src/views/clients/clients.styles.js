import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export const clientsStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        paddingLeft: 20,
        paddingRight: 20
    },
    nuevoClienteBtn: {
        width: 150,
        alignSelf: "center",
        borderRadius: 50,
        height: 60,
        fontSize: 24,
        backgroundColor: "#AEC8F1",
        color: "#575757"
    },
});