import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../home/Home';
import Pedidos from '../orders/Orders';
import { NavigationContainer } from '@react-navigation/native';
import NuevoPedido from '../orders/NewOrder';
import ShowOrder from "../orders/ShowOrder";

const Stack = createStackNavigator();

function MainNavigator() {
    return (
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen  options={{ headerShown: false}} name="HomeScreen" component={Home}/>
                <Stack.Screen options={{ headerShown: true }}name="PedidosScreen" component={Pedidos}/>
                <Stack.Screen  name="NuevoPedidoScreen" component={NuevoPedido}/>
                <Stack.Screen name="PedidoScreen" component={ShowOrder} initialParams={{order: {idpedido:0}}}/>
            </Stack.Navigator>
    );
}

export default MainNavigator;