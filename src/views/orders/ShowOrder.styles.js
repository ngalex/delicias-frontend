import { StyleSheet } from "react-native";

export const ShowOrderStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-between"
    },
    subtitle: {
        fontSize: 18,
        color: "#707070",
        marginBottom: 5,
        marginTop: 5
    },
    containerCurrency: {
        backgroundColor: "#fff",
        borderRadius: 8,
        borderColor: "#BFBFBF",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        padding: 10,
        marginBottom: 10
    },
    currencyTitle: {
        fontSize: 14,
        color: "#9F9F9F"
    },
    currency: {
        fontSize: 32,
        color: "#8E8E8E"
    }
});