import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrderItem from './OrderCard'

export default function ListaPedidos() {
  return (
    <View style={styles.container}>
      <Text>ListaPedidos</Text>
      <OrderItem/>
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'center',
        alignItems: 'center'
    }
})