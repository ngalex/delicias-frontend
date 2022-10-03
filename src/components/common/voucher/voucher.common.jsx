import * as React from "react";
import { View, Platform, Text } from "react-native";
import * as Print from "expo-print";
import { shareAsync } from "expo-sharing";
import { ButtonP } from "../buttons/ButtonP";
const html = `
<html>
  <head>
    <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=1.0, minimum-scale=1.0, user-scalable=no" />
  </head>
  <body style="text-align: center; height: 300px; width: 500px; border-radious: 1px; border-color: black; border: 1px black solid; padding: 1rem">
    <h3 style="font-size: 25px; font-family: Helvetica Neue; font-weight: normal;">
      Delicias Don Carlitos
    </h3>
    <h3 style="display:flex; flex-direction: row">
        <div>Pedido #{pedido_id}</div>
    </h3>
    <h3 style="display:flex; flex-direction: row">
        <div>Cliente: {cliente}</div>
    </h3>
    <h3 style="display:flex; flex-direction: row">
        <div>Dirección: {direccion}</div>
    </h3>
    <h3 style="display:flex; flex-direction: row">
        <div>Anticipo: {anticipo}</div>
    </h3>
    <h3 style="display:flex; flex-direction: row">
        <div>Monto total: {montoTotal}</div>
    </h3>
  </body>
</html>
`;

export default function Voucher(props) {
    // const [pedido_id, clientFullName, direccion, anticipo, montoTotal] = props;
  const [selectedPrinter, setSelectedPrinter] = React.useState();

  const printToFile = async () => {
    // On iOS/android prints the given html. On web prints the HTML from the current page.
    html
      .replace("{pedido_id}", props.pedido_id ? props.pedido_id : "desconocido")
      .replace(
        "{cliente}",
        props.clientFullName ? props.clientFullName : "desconocido"
      )
      .replace("{direccion}", props.direccion ? props.direccion : "desconocido")
      .replace("{anticipo}", props.anticipo ? props.anticipo : "desconocido")
      .replace(
        "{montoTotal}",
        props.montoTotal ? props.montoTotal : "desconocido"
      );

    const { uri } = await Print.printToFileAsync({
      html: html
        .replace(
          "{pedido_id}",
          props.pedido_id ? props.pedido_id : "desconocido"
        )
        .replace(
          "{cliente}",
          props.clientFullName ? props.clientFullName : "desconocido"
        )
        .replace(
          "{direccion}",
          props.direccion ? props.direccion : "desconocido"
        )
        .replace("{anticipo}", props.anticipo ? props.anticipo : "desconocido")
        .replace(
          "{montoTotal}",
          props.montoTotal ? props.montoTotal : "desconocido"
        ),
    });
    console.log("File has been saved to:", uri);
    await shareAsync(uri, { UTI: ".pdf", mimeType: "application/pdf" });
  };

  const selectPrinter = async () => {
    const printer = await Print.selectPrinterAsync(); // iOS only
    setSelectedPrinter(printer);
  };

  return (
    <View>
      <ButtonP
        title="Generar PDF"
        width={300}
        backgroundColor="#F9C3C3"
        onPress={printToFile}
      ></ButtonP>
      <View />
      {Platform.OS === "ios" && (
        <>
          <View />
          <ButtonP
            title="Elegir impresora"
            width={300}
            backgroundColor="#F9C3C3"
            onPress={selectPrinter}
          />
          <View />
          {selectedPrinter ? (
            <Text>{`Selected printer: ${selectedPrinter.name}`}</Text>
          ) : undefined}
        </>
      )}
    </View>
  );
}
