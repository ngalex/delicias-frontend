import { React, useState } from "react";
import { View, TextInput } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Button } from "react-native-elements";
import { commonSearchBarStyles } from "./searchbar.common.styles";

const CommonSearchBar = (props) => {
  const [pattern, setPattern] = useState("");

  const onChangeInput = (value) => {
    setPattern(value);
    props.onChangeInput(value);
  };

  return (
    <View style={commonSearchBarStyles.container}>
      <View style={commonSearchBarStyles.containerSearch}>
        <TextInput
          style={commonSearchBarStyles.searchInput}
          onChangeText={onChangeInput}
        ></TextInput>
        <Button
          type="clear"
          icon={
            <Icon
              name="search"
              size={34}
              color="#878787"
              onPress={() => onChangeInput(pattern)}
            ></Icon>
          }
        ></Button>
      </View>
    </View>
  );
};

export default CommonSearchBar;
