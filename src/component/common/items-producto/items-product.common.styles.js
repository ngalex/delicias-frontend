import { StyleSheet } from "react-native";

export const CommonItemsProductStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        backgroundColor: "green"
    },
    itemContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red", 
        width: 70, 
        height: 100,
        borderRadius: 20,
        textAlign: "center",
        padding: 5,
        marginRight: 10
    },
    itemBgRed: {
        backgroundColor: "#FCE5E5"
    },
    itemBgBlue: {
        backgroundColor: "#BFEEFF"
    }, 
    itemBgYellow: {
        backgroundColor: "#FAFFD6"
    },
    itemBgGreen: {
        backgroundColor: "#DAFFCC"
    }

});