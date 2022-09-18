import React from "react";
import { useState } from "react";
import { Modal, Text, TextInput, View, Pressable, Button } from "react-native";
import { inputCommonStyles } from "./input.common.styles";
import DropDownPicker from "react-native-dropdown-picker";
import DatePicker from "react-native-modern-datepicker";

const CommonInput = (prop) => {
  const [label, setLabel] = useState(prop.label);
  const [type, setType] = useState(prop.type);
  const [value, setValue] = useState(null);
  const [items, setItems] = useState(
    !Array.isArray(prop.items) || !prop.items.length
      ? [{ label: "Ninguno", value: null }]
      : prop.items
  );
  const [currentDate, setCurrentDate] = useState(null);
  const [placeholder, setPlaceholder] = useState(prop.placeholder);
  const inputType = {
    text: () => textInput(),
    combo: () => comboInput(),
    date: () => datePicker(),
    default: () => {},
  };

  const textInput = () => {
    return (
      <View style={inputCommonStyles.container}>
        <Text style={inputCommonStyles.label}>{label}</Text>
        <TextInput
          style={inputCommonStyles.input}
          onChangeText={(text) => {
            setValue(text);
            prop.onChangeInput(text);
          }}
          placeholder={placeholder}
        ></TextInput>
      </View>
    );
  };

  const comboInput = () => {
    const [open, setOpen] = useState(false);
    return (
      <View
        style={{
          ...inputCommonStyles.container,
          zIndex: 1000,
          elevation: 1000,
        }}
      >
        <Text style={inputCommonStyles.label}>{label}</Text>
        <DropDownPicker
          open={open}
          value={value}
          items={items}
          placeholder={placeholder}
          setOpen={setOpen}
          setValue={setValue}
          onChangeValue={(text) => prop.onChangeInput(text)}
          setItems={setItems}
          dropDownContainerStyle={{
            backgroundColor: "white",
            zIndex: 1000,
            elevation: 1000,
            ...inputCommonStyles.comboStyle,
            ...inputCommonStyles.input
          }}
          style={{...inputCommonStyles.comboStyle, ...inputCommonStyles.input}}
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
            setModalVisible(true);
          }}
        >
          <Text style={inputCommonStyles.label}>{label}</Text>
          <TextInput
            style={inputCommonStyles.input}
            placeholder={placeholder}
            editable={false}
            value={value}
          ></TextInput>
        </Pressable>

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert("Modal has been closed.");
            setModalVisible(!modalVisible);
          }}
        >
          <View style={inputCommonStyles.centeredView}>
            <View style={inputCommonStyles.modalView}>
              <DatePicker
                selected={value}
                onSelectedChange={(date) => {
                  prop.onChangeInput(date);
                  setValue(date);
                }}
              />

              <Pressable
                style={[
                  inputCommonStyles.button,
                  inputCommonStyles.buttonClose,
                ]}
                onPress={() => setModalVisible(false)}
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
};

export default CommonInput;