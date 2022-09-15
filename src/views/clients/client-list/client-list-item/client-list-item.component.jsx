import React from "react";
import { View, Text } from "react-native";
import { clientListItemStyles } from "./client-list-item.styles";
const ClientListItem = (props) => {
    const fullname = props.fullname;
    const dni = props.dni;
    const id = "#"+props.id;

  return (
    <View style={clientListItemStyles.container}>
      <View style={clientListItemStyles.header}>
        <Text style={clientListItemStyles.headerText}>{fullname}</Text>
        <Text style={clientListItemStyles.headerText}>{id}</Text>
      </View>
      <View >
        <Text style={clientListItemStyles.contentText}>{dni}</Text>
      </View>
    </View>
  );
};

export default ClientListItem;
