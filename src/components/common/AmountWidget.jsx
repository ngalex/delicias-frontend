import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import CommonInput from './Input/input.common';

export default function AmountWidget({amount, setAmount}) {
  return (
    <View>
      <Text></Text>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
        <Pressable onPress={ () => setAmount(+amount - 1)}>
          <IconFont5 name='minus' size={40} color="#707070" style={{marginHorizontal: 20}}/>
        </Pressable>
        <View style={{ flex: 1, paddingHorizontal: 20}}>
          <CommonInput
            type='text'
            value={amount.toString()}
            keyboardType='numeric'
            onChangeInput={(value)=>{setAmount(value)}}
          />
        </View>
        <Pressable onPress={ () => setAmount(+amount + 1)}>
          <IconFont5 name='plus' size={40} color="#707070" style={{marginHorizontal: 20}}/>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})