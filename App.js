import { View } from 'react-native';
import { StatusBar } from 'react-native';
import { appStyles } from './App.styles';

import ClientsView from './src/views/clients/clients.component';

export default function App() {
  return (
    <View style={appStyles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#fbfbfb"/>
      <ClientsView />
    </View>
  )
}
