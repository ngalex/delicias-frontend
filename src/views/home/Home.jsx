import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import OrderCardList from '../../components/orders/OrderCardList';
import BigButton from '../../components/common/buttons/BigButton';

export default function Home({ navigation }) {
  return (
    <View style= { styles.container }>
      <View style={ styles.orderListContainer }>
        <OrderCardList/>
      </View>
      <View style={styles.wPedidos}>
        <Button onPress={() => navigation.navigate('NuevoPedidoScreen')} title='Nuevo Pedido'/>
        <Button onPress={() => navigation.navigate('PedidosScreen')} title='Mis Pedidos'/>
      </View>
      <View style={styles.rowOptions}>
        <BigButton item={'Prestamos'}/>
        <BigButton item={'Clientes'}/>
      </View>
      <View style={styles.rowOptions}>
        <BigButton item={'Productos'}/>
        <BigButton item={'Productores'}/>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  wPedidos: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  orderListContainer: {
    flex: 3
  },
  rowOptions: {
    flex: 2,
    margin: 5,
    flexDirection: "row",
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignSelf: 'center'
  }
})