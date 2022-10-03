import { StyleSheet, Text, View, Pressable } from 'react-native'
import React, { useState } from 'react'
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import CommonInput from './Input/input.common';

export default function AmountWidget({amount, setAmount}) {
  return (
    <View>
      <Text style={{color: '#B5B5B5'}}>Cantidad</Text>
      <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'space-around'}}>
        <Pressable onPress={ () => setAmount(+amount - 1)}>
          <IconFont5 name='minus' size={40} color="#8E8E8E" style={{marginHorizontal: 20}}/>
        </Pressable>
        <View style={{ flex: 1, paddingHorizontal: 20}}>
          <CommonInput
            customInputStyle={{fontSize: 35, textAlign: 'center' }}
            type='text'
            value={amount.toString()}
            keyboardType='numeric'
            onChangeInput={(value)=>{setAmount(value)}}
          />
        </View>
        <Pressable onPress={ () => setAmount(+amount + 1)}>
          <IconFont5 name='plus' size={40} color="#8E8E8E" style={{marginHorizontal: 20}}/>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({})