import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

export default function OptionGrid({item}) {
  return (
    <View style={ styles.container }>
      <Text>{item}</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    backgroundColor: '#F2F1F1',
    margin: 10,
    borderRadius: 35,
    shadowColor: "#999",
    elevation: 24,
    justifyContent: 'center',
    alignItems: 'center'
  }
})