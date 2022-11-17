import { StyleSheet,Text, View } from 'react-native'
import React from 'react'
import OrderList from '../../components/orders/OrderList';
import BigButton from '../../components/common/buttons/BigButton';
import { ButtonP } from '../../components/common/buttons/ButtonP';
import Constants from "expo-constants";
import { useEffect } from 'react';
import { getPedidos } from "./../../services/service";
import { useState } from 'react';

export default function Home({ navigation, route }) {
  const [orderList, setorderList] = useState([]);
React.useEffect(() => {
  const focusHandler = navigation.addListener("focus", () => {
    getPedidos().then((response) => {
      setorderList(response)
    });
  });
  return focusHandler;
}, [navigation]);


  return (
    <View style={{ ...styles.container, marginTop: Constants.statusBarHeight }}>
      <View style={styles.orderListContainer}>
        <Text style={styles.title}>Pedidos de hoy</Text>
        <OrderList
          displayMode={"shortMode"}
          orderList={orderList}
          selectionHandler={(idpedido) =>
            navigation.navigate("PedidoScreen", { idpedido: idpedido })
          }
        />
      </View>
      <View style={styles.wPedidos}>
        <ButtonP
          onPress={() => navigation.navigate("NuevoPedidoScreen")}
          title="Nuevo Pedido"
          backgroundColor="#AEC8F1"
          width="45%"
        />
        <ButtonP
          onPress={() => navigation.navigate("PedidosScreen")}
          title="Mis Pedidos"
          backgroundColor="#F9C3C3"
          width="45%"
        />
      </View>
      <View style={styles.bigButttonContainer}>
        <View style={styles.rowOptions}>
          <BigButton item={"Prestamos"} />
          <BigButton item={"Clientes"} />
        </View>
        <View style={styles.rowOptions}>
          <BigButton item={"Productos"} />
          <BigButton item={"Productores"} />
        </View>
      </View>
    </View>
  );
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