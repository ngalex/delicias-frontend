import React from "react";
import { mainStyles } from "./main.styles";
import { Text, View } from "react-native";

const Main = () => {
    return (
      <View style={mainStyles.mainContainer}>
        <Text>Main view</Text>
      </View>
    );
}

export default Main