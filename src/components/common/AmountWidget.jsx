import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import CommonInput from './Input/input.common';

export default function AmountWidget() {
  return (
    <View style={{flexDirection: 'row', alignItems: 'center', width: '100ñ*ñ**********************************************************************************************************************
      <IconFont5 name='plus' size={30} color="#707070"/>
      <CommonInput 
        label="Color del producto"
        type="text"></CommonInput>
      <IconFont5 name='minus' size={30} color="#707070"/>
    </View>
  )
}

const styles = StyleSheet.create({})