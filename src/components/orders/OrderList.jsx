import { StyleSheet, Text } from "react-native";
import React, { useState, useEffect } from "react";
import Card from "../common/Card";
import { getPedidos } from "./../../services/service";
import { ScrollView } from "react-native";
import * as clientService from "../../services/client-service";
import * as DateUtils from "../../utilities/date-utils";
import * as Codes from '../../constants/codes';

export default function OrderList({
  reloadList,
  displayMode,
  modalHandler,
  selectionHandler,
  pattern,
}) {
  const [dataCard, setDataCard] = useState([]);
  const [rawData, setrawData] = useState([]);

  useEffect(() => {
    if (!pattern || pattern.length < 3) {
      mapGetOrders(rawData);
      return;
    }
    clientService
      .getClienteByNameOrDni(pattern)
      .then((client) => {
        if (client) {
          filteredData = rawData.filter((data) => data.cliente_id == client.id);
          mapGetOrders(filteredData);
        }
      })
      .catch((err) => setDataCard([]));
  }, [reloadList, pattern]);

  useEffect(() => {
    refreshOrders();
  }, [reloadList]);

  const refreshOrders = () => {
    getPedidos().then((response) => {
      setrawData(response);
      mapGetOrders(response);
    });
    console.log("llamada a getPedidos");
  }

  const mapGetOrders = (response) => {
    let newDataCard = [];

    // response = response.sort((a, b) => {
    //   datea = DateUtils.getDateFromString(a.fechaEntrega);
    //   dateb = DateUtils.getDateFromString(b.fechaEntrega);
    //   return datea < dateb ? 1 : -1;
    // });

    if (displayMode === "shortMode") {
      response = response
        .filter(
          (order) =>
            DateUtils.getDateString(new Date(order.fechaEntrega)) ===
              DateUtils.getDateString(new Date()) &&
            order.estado.toUpperCase() !== Codes.FINALIZADO &&
            order.estado.toUpperCase() !== Codes.ANULADO &&
            order.estado.toUpperCase() !== Codes.CANCELADO
        )
        .slice(0, 3);
      }
      console.log("🚀 ~ file: OrderList.jsx ~ line 68 ~ mapGetOrders ~ response", response)

    response.forEach((order) => {
      newDataCard.push({
        key: order.id,
        topCol1: `${order.clientName} ${
          order.clientLastName !== null ? order.clientLastName : ""
        }`,
        midCol1:
          displayMode === "shortMode"
            ? DateUtils.userFormatTime(order.fechaEntrega)
            : DateUtils.userFormatDateTime(order.fechaEntrega),
        midCol2: null,
        botCol1: order.estado,
      });
    });
    setDataCard(newDataCard);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {dataCard.length == 0 ? (
        <Text style={styles.text}>No hay pedidos para mostrar</Text>
      ) : null}
      {dataCard.map((item) => {
        return (
          <Card
            key={item.key}
            data={item}
            displayMode={displayMode}
            modalHandler={modalHandler}
            selectionHandler={selectionHandler}
          />
        );
      })}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {},
  text: {
    alignSelf: "center",
  },
});
