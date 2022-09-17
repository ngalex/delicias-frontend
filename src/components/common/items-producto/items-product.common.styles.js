import { StyleSheet } from "react-native";

export const CommonItemsProductStyles = StyleSheet.create({
    container: {
        flexDirection: "row",
        flexWrap: "wrap",
        width: "100%",
        backgroundColor: "transparent"
    },
    itemContainer: {
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "red", 
        width: 70, 
        height: 100,
        borderRadius: 24,
        padding: 5,
        marginRight: 10,
        marginBottom: 10
    },
    itemCount: {
        color: "#707070",
        fontSize: 24
    },  
    itemIcon: {
        color: "#707070",
        textAlign: "center",
        textAlignVertical: "center",
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