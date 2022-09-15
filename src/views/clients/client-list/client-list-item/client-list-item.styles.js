import { StyleSheet } from "react-native";
import Constants from 'expo-constants';

export const clientListItemStyles = StyleSheet.create({
    container: {
        backgroundColor: "#FFFFFF",
        borderRadius: 10,
        flexDirection: "column",
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 15,
        paddingBottom: 15,
        elevation: 5,
        marginBottom: 20
    },
    header: {
        fontSize: 18,
        flexDirection: "row",
        justifyContent: "space-between"
    },
    headerText: {
        fontWeight: "600",
        color: "#575757",
    },
    contentText: {
        color: "#575757",
        fontSize: 14
    }
});