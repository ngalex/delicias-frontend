import { Button, StyleSheet, View } from 'react-native'
import React from 'react'
import OrderCardList from '../../components/orders/OrderCardList';
import BigButton from '../../components/common/buttons/BigButton';
import { ButtonP } from '../../components/common/buttons/ButtonP';

export default function Home({ navigation }) {
  return (
    <View style= { styles.container }>
      <View style={ styles.orderListContainer }>
        <OrderCardList/>
      </View>
      <View style={styles.wPedidos}>
        <ButtonP 
        onPress={() => navigation.navigate('NuevoPedidoScreen')} 
        title='Nuevo Pedido'
        backgroundColor= "#AEC8F1"
        width="45%"/>
        <ButtonP 
        onPress={() => navigation.navigate('PedidosScreen')} 
        title='Mis Pedidos'
        backgroundColor= "#F9C3C3"
        width="45%"
        />
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