import React from "react";
import { View, ScrollView, SafeAreaView } from "react-native";
import NavBar from "../../shared/navbar/navbar.component";
import ClientSearchBar from "./client-searchbar/client-searchbar.component";
import { Button } from "react-native-elements";
import { clientsStyles } from "./clients.styles";
import ClientList from "./client-list/client-list.component";

const ClientsView = () => {
  return (
    <View>
      <NavBar title="Clientes"></NavBar>
      <SafeAreaView style={clientsStyles.container}>
        <ScrollView contentContainerStyle={{padding:5}}>
          <View style={{ paddingTop: 30 }}>
            <ClientSearchBar></ClientSearchBar>
          </View>
          <View style={{ paddingTop: 20 }}>
            <Button
              buttonStyle={clientsStyles.nuevoClienteBtn}
              title="Nuevo Cliente"
            ></Button>
          </View>
          <View style={{ paddingTop: 20 }}>
            <ClientList></ClientList>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default ClientsView;
