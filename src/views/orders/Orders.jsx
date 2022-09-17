import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import OrderList from '../../components/orders/OrderList';

export default function Pedidos() {

  const modalHandler = (key) => {
    console.log('abrir modal de detalle pedido ' + key);
  }

  return (
    <View style={styles.container}>
      <OrderList displayMode={'orderMode'} modalHandler={modalHandler}/>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 10,
    backgroundColor: '#FBFBFB'
  }
})