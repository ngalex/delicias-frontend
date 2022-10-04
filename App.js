import 'react-native-gesture-handler';
import Main from './src/views/main/main.component';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Finances from './src/views/finances/Finances';
import Stocks from './src/views/Stocks/Stocks';
import Tools from './src/views/Tools/Tools';
import 'react-native-url-polyfill/auto';

const Tab = createBottomTabNavigator();


export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen options={{ headerShown: false}} name="Pedidos" component={Main} />
        <Tab.Screen name="Finanzas" component={Finances} />
        <Tab.Screen name="Stock" component={Stocks} />
        <Tab.Screen name="Herramientas" component={Tools} />
      </Tab.Navigator>
    </NavigationContainer>
  )
}
