import React from "react";
import { mainStyles } from "./main.styles";
import { Text, View } from "react-native";
import CommonInput from "../../component/common/Input/input.common";
import CommonSearchBar from "../../component/common/searchbar/searchbar.common";
const Main = () => {
  const handleInputValue = (val) => {
    alert(val);
  };
  return (
    <View style={mainStyles.mainContainer}>
      <Text>Main view</Text>

        <CommonInput
          label="Select"
          type="combo"
          items={[
            { label: "1", value: "1" },
            { label: "2", value: "2" },
            { label: "3", value: "3" },
          ]}
          onChangeInput={(val) => handleInputValue(val)}
        ></CommonInput>
      <CommonInput
        label="Name"
        type="text"
        onChangeInput={(val) => handleInputValue(val)}
      ></CommonInput>
      <CommonInput
        label="Date"
        type="date"
        onChangeInput={(val) => handleInputValue(val)}
      ></CommonInput>

      <CommonSearchBar onChangeInput={val => handleInputValue(val)}></CommonSearchBar>
    </View>
  );
};

export default Main;
