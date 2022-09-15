import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export const clientSearchBarStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        height: 60,
        alignItems: "center",
        justifyContent: "space-between",
    },
    filterButton: {
        flexBasis: "20%",
    },
    containerSearch: {
        backgroundColor: "#FFFFFF",
        elevation: 5,
        flexDirection: "row",
        height: 60,
        flexBasis: "80%",
        justifyContent: "space-between",
        alignItems: "center",
        paddingLeft: 20,
        paddingRight: 25,
        borderRadius: 50
    },
    searchInput: {
        flexBasis: "80%",
        fontSize: 18
    },
    searchIcon: {
        fontSize: 24
    }
});