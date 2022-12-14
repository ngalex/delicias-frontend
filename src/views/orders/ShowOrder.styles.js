import { StyleSheet } from "react-native";
import { baseColors } from "../../constants/baseColors";

export const ShowOrderStyles = StyleSheet.create({
    container: {
        flexDirection: "column",
        width: "100%",
        paddingTop: 20,
        paddingLeft: 20,
        paddingRight: 20,
        backgroundColor: baseColors.fondoApp
    },
    margin_bottom: {
        marginRight: 20,
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
    },

    modal_backdrop: {
        backgroundColor: '#000',
        zIndex: -1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: 0.2
    },
    modal_customContentContainer: {
        width: '100%',
        height: 200
    },
    modal_toggle: {
        position: 'absolute',
        zIndex: 200,
        top: 25,
        width: '100%',
    },
});
