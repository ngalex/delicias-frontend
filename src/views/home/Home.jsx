import { Button, StyleSheet,Text, View } from 'react-native'
import React from 'react'
import OrderList from '../../components/orders/OrderList';
import BigButton from '../../components/common/buttons/BigButton';

export default function Home({ navigation }) {
  return (
    <View style= { styles.container }>
      <View style={ styles.orderListContainer }>
        <Text style={styles.title}>Pedidos de hoy</Text>
        <OrderList displayMode={'shortMode'}/>
      </View>
      <View style={styles.wPedidos}>
        <Button onPress={() => navigation.navigate('NuevoPedidoScreen')} title='Nuevo Pedido'/>
        <Button onPress={() => navigation.navigate('PedidosScreen')} title='Mis Pedidos'/>
      </View>
      <View style={styles.bigButttonContainer}>
        <View style={styles.rowOptions}>
          <BigButton item={'Prestamos'}/>
          <BigButton item={'Clientes'}/>
        </View>
        <View style={styles.rowOptions}>
          <BigButton item={'Productos'}/>
          <BigButton item={'Productores'}/>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    marginHorizontal: 15,
    marginTop: 20
  },
  wPedidos: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center'
  },
  orderListContainer: {
    flex: 3,
    justifyContent: 'center'
  },
  rowOptions: {
    flex: 1,
    margin: 5,
    flexDirection: "row",
    borderColor: '#EEEEEE',
    justifyContent: 'center',
    alignSelf: 'center'
  },
  bigButttonContainer: {
    flex: 3,
  },
  title: {
    fontSize: 18,
    textAlign: 'center'
  }
})