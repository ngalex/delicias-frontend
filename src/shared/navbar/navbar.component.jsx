import React from "react";
import { View, Text, StatusBar } from "react-native";
import { navbarStyles } from "./navbar.styles";
import { Button } from "react-native-elements";
import Icon from "react-native-vector-icons/FontAwesome";
const NavBar = (props) => {
    const title = props.title;

  return (
    <View>
      <View style={navbarStyles.navigationBar}>
        <Button
        type="clear"
          icon={
            <Icon
              style={navbarStyles.navbarReturnBtn}
              name="angle-left"
              size={34}
            ></Icon>
          }
        ></Button>
        <Text style={navbarStyles.navbarTitle}>{title}</Text>
      </View>
    </View>
  );
};

export default NavBar;
