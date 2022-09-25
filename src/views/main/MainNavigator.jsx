import React from "react";
import { createStackNavigator } from '@react-navigation/stack';
import Home from '../home/Home';
import Pedidos from '../orders/Orders';
import { NavigationContainer } from '@react-navigation/native';
import NuevoPedido from '../orders/NewOrder';

const Stack = createStackNavigator();

function MainNavigator() {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="HomeScreen">
                <Stack.Screen options={{ headerShown: false} } name="HomeScreen" component={Home}/>
                <Stack.Screen name="PedidosScreen" component={Pedidos}/>
                <Stack.Screen  name="NuevoPedidoScreen" component={NuevoPedido}/>
            </Stack.Navigator>
        </NavigationContainer>
    );
}

export default MainNavigator;