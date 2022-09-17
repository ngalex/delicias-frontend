import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrderCard from './OrderCard'

export default function OrderCardList() {
  return (
    <View style={styles.container}>
      <Text>ListaPedidos</Text>
      <OrderCard/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})