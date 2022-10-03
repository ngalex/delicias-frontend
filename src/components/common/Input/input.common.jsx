import React from "react";
import { useState } from "react";
import {
  Modal,
  Text,
  TextInput,
  View,
  Pressable
} from "react-native";
import { inputCommonStyles } from "./input.common.styles";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-modern-datepicker";
import { Switch } from 'react-native-switch';

export default function CommonInput(prop) {
  const { value, editable, label, type, keyboardType, items, placeholder, customInputStyle } = prop;
  const [inputValue, setinputValue] = useState(value);
  const [inputItems, setItems] = useState(
    !Array.isArray(prop.items) || !prop.items.length
      ? [{ label: "Ninguno", value: null }]
      : items
  );
  const inputType = {
    text: () => textInput(),
    combo: () => comboInput(),
    switch: () => switchInput(),
    date: () => datePicker(),
    default: () => {},
  };

  const textInput = () => {
    return (
      <View style={inputCommonStyles.container}>
        <Text style={label ? inputCommonStyles.label : { display: "none" }}>
          {label}
        </Text>
        <TextInput
          style={[inputCommonStyles.input, customInputStyle]}
          onChangeText={(text) => {
            // setinputValue(text);
            prop.onChangeInput(text);
          }}
          keyboardType = {keyboardType}
          value={value}
          defaultValue={value}
          placeholder={placeholder}
          editable={editable}
        ></TextInput>
      </View>
    );
  };

  const comboInput = () => {
    const [open, setOpen] = useState(false);
    return (
      <View
        style={{
          zIndex: 1000,
          elevation: 1000,
        }}
      >
        <Text style={label ? inputCommonStyles.label : { display: "none" }}>
          {label}
        </Text>

        <DropDownPicker
          key={value ? value.label : 0}
          open={open}
          value={value}
          items={items}
          setValue={setinputValue}
          setOpen={setOpen}
          setItems={setItems}
          disabled={editable}
          placeholder={placeholder}
          listMode="SCROLLVIEW"
          onSelectItem={(text) => prop.onChangeInput(text)}
          selectedItemLabelStyle={{ color: "#8E8E8E" }}
          listItemLabelStyle={{ color: "#A2A2A2" }}
          textStyle={{ fontSize: 16, color: "#8E8E8E", fontWeight: "500" }}
          dropDownContainerStyle={{
            backgroundColor: "white",
            zIndex: 1000,
            elevation: 24,
            ...inputCommonStyles.comboStyle,
            ...inputCommonStyles.input,
          }}
          style={{
            ...inputCommonStyles.comboStyle,
          }}
        />
      </View>
    );
  };

  const switchInput = () => {
    const [isEnabled, setIsEnabled] = useState(value);
    return (
      <View
        style={{
          zIndex: 1000,
          elevation: 1000,
        }}
      >
        <Text style={label ? inputCommonStyles.label : { display: "none" }}>
          {label}
        </Text>
        <Switch
          value={isEnabled}
          onValueChange={(val) => {setIsEnabled(val); prop.onChangeInput(val)}}
          disabled={false}
          activeText={'SI '}
          inActiveText={' NO'}
          backgroundActive={'#D4E3FB'}
          backgroundInactive={'#C5C5C5'}
          circleActiveColor={'#6D9DE8'}
          circleInActiveColor={'#E3E3E3'}
          switchLeftPx={3}
          activeTextStyle={{ color: 'gray', fontWeight: '600', fontSize: 16}}
          inactiveTextStyle={{ color: '#747272', fontWeight: '600', fontSize: 16}}
          switchRightPx={3}
          circleBorderWidth={0}
          switchWidthMultiplier={2.5}
        />
      </View>
    );
  };

  const datePicker = () => {
    const [modalVisible, setModalVisible] = useState(false);

    return (
      <View>
        <Pressable
          style={inputCommonStyles.container}
          onPress={() => {
            editable ? setModalVisible(true) : null;
          }}
        >
          <Text style={label ? inputCommonStyles.label : { display: "none" }}>
            {label}
          </Text>
          <TextInput
            style={inputCommonStyles.input}
            placeholder={placeholder}
            value={inputValue ? inputValue : value}
            editable={false}
          ></TextInput>
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
            prop.onChangeInput(inputValue);
          }}
        >
          <View style={inputCommonStyles.centeredView}>
            <View style={inputCommonStyles.modalView}>
              <DatePicker
                selected={value}
                onSelectedChange={(date) => {
                  setinputValue(date);
                }}
              />

              <Pressable
                style={[
                  inputCommonStyles.button,
                  inputCommonStyles.buttonClose,
                ]}
                onPress={() => {
                  setModalVisible(false);
                  prop.onChangeInput(inputValue);
                }}
              >
                <Text style={inputCommonStyles.textStyle}>Confirmar</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
      </View>
    );
  };

  return <View>{(inputType[type] || inputType["default"])()}</View>;
}
