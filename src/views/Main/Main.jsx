import React from "react";
import Constants from 'expo-constants'
import { StyleSheet, Text, View } from "react-native";

const Main = () => {
    return (
        <View style={{marginTop: Constants.statusBarHeight, flexGrow: 1 }}>
            <Text>Main view</Text>
        </View>
    )
}

export default Main