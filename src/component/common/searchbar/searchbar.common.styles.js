import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export const commonSearchBarStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
    },
    containerSearch: {
        backgroundColor: "#FFFFFF",
        shadowColor: "#979797",
        elevation: 5,
        flexDirection: "row",
        height: 60,
        width: "100%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 25,
        borderRadius: 50
    },
    searchInput: {
        fontSize: 18,
        flexGrow: 1,
        color: "#8E8E8E"
    },
    searchIcon: {
        color: "#8E8E8E",
        fontSize: 24
    }
});