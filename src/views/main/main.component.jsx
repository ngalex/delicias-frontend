import React from "react";
import { mainStyles } from "./main.styles";
import { View } from "react-native";
import MainNavigator from './MainNavigator';


const Main = () => {
    return (
      <View style={mainStyles.mainContainer}>
        <MainNavigator/>
      </View>
    );
}
export default Main;
