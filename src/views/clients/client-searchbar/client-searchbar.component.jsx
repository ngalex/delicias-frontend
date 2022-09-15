import React from "react";
import { View, TextInput } from "react-native";
import { clientSearchBarStyles } from "./client-searchbar.styles";
import Icon  from "react-native-vector-icons/FontAwesome";
import {Button} from "react-native-elements";

const ClientSearchBar = () => {

  return (
    <View style={clientSearchBarStyles.container}>
      <Button
        icon={<Icon name="sliders" size={34} color="#878787" />}
        containerStyle={clientSearchBarStyles.filterButton}
        type="clear"
      ></Button>
      <View style={clientSearchBarStyles.containerSearch}>
        <TextInput style={clientSearchBarStyles.searchInput}></TextInput>
        <Button
        type="clear"
          icon={<Icon name="search" size={34} color="#878787"></Icon>}
        ></Button>
      </View>
    </View>
  );
};

export default ClientSearchBar;
