import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export const navbarStyles = StyleSheet.create({
    navigationBar: {
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "flex-start",
        height: 60,
        backgroundColor: "#FBFBFB",
        paddingLeft: 10,
    },
    navbarReturnBtn: {
        marginRight: 10,
        color: "#676767"
    },
    navbarTitle: {
        fontSize: 24,
        color: "#676767",
    }
});