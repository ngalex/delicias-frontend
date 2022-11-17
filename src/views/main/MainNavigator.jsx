import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../home/Home';
import Pedidos from '../orders/Orders';
import { NavigationContainer } from '@react-navigation/native';
import NuevoPedido from '../orders/NewOrder';
import ShowOrder from "../orders/ShowOrder";
import { baseColors } from "../../constants/baseColors";

const Stack = createStackNavigator();

function MainNavigator() {
    return (
            <Stack.Navigator initialRouteName="HomeScreen" screenOptions={{
                headerShown: true,
                headerStyle: { backgroundColor: baseColors.fondoApp },
                headerTintColor: '#555'
              }}>
                <Stack.Screen options={{ headerShown: false }} name="HomeScreen" component={Home}/>
                <Stack.Screen options={{ title: 'Mis Pedidos' }} name="PedidosScreen" component={Pedidos}/>
                <Stack.Screen options={{ title: 'Nuevo Pedido' }} name="NuevoPedidoScreen" component={NuevoPedido}/>
                <Stack.Screen name="PedidoScreen" component={ShowOrder} initialParams={{order: {idpedido:0}}}/>
            </Stack.Navigator>
    );
}

export default MainNavigator;