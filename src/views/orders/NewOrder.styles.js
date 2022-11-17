import { StyleSheet } from "react-native";
import { baseColors } from "../../constants/baseColors";

export const NewOrderStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        paddingHorizontal: 5,
        backgroundColor: baseColors.fondoApp,
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
        color:"#8E8E8E"
    }

});