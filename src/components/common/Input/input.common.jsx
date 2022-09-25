import React from "react";
import { useState, useEffect } from "react";
import {
  Modal,
  Text,
  TextInput,
  View,
  Pressable,
  Picker,
  Button,
} from "react-native";
import { inputCommonStyles } from "./input.common.styles";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-modern-datepicker";

export default function CommonInput(prop) {
  const { value, editable, label, type, items, placeholder } = prop;
  const [inputValue, setinputValue] = useState(null);
  const [inputItems, setItems] = useState(
    !Array.isArray(prop.items) || !prop.items.length
      ? [{ label: "Ninguno", value: null }]
      : items
  );
  const inputType = {
    text: () => textInput(),
    combo: () => comboInput(),
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
          style={inputCommonStyles.input}
          onChangeText={(text) => {
            // setinputValue(text);
            prop.onChangeInput(text);
          }}
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
          value={value?.label}
          items={items}
          setValue={setinputValue}
          setOpen={setOpen}
          setItems={setItems}
          placeholder={placeholder}
          onSelectItem={(text) => prop.onChangeInput(text)}
          dropDownContainerStyle={{
            backgroundColor: "white",
            zIndex: 1000,
            elevation: 1000,
            ...inputCommonStyles.comboStyle,
            ...inputCommonStyles.input,
          }}
          style={{
            ...inputCommonStyles.comboStyle,
            ...inputCommonStyles.input,
          }}
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
