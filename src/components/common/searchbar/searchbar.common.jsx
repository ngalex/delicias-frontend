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

  const clearInput = () => {
    if (!pattern) return;
    setPattern("");
    onChangeInput("");
  };

  return (
    <View style={commonSearchBarStyles.container}>
      <View style={commonSearchBarStyles.containerSearch}>
        {pattern ? (
          <Button
            type="clear"
            icon={
              <Icon
                name="remove"
                size={15}
                color="#878787"
                onPress={() => clearInput()}
              ></Icon>
            }
          ></Button>
        ) : null}

        <TextInput
          style={commonSearchBarStyles.searchInput}
          value={pattern}
          onChangeText={setPattern}
          onSubmitEditing={() => onChangeInput(pattern)}
          placeholder={props.placeholder}
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
