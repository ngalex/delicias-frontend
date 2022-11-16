import { StyleSheet, View } from 'react-native'
import React, { useState, useEffect } from 'react'
import Card from '../common/Card';
import { getPedidos, getProductos } from './../../services/service';
import { ScrollView } from 'react-native';

export default function OrderList({ reloadList, displayMode, modalHandler, selectionHandler }) {

  const [dataCard, setDataCard] = useState([
  ]);
  
  useEffect(() => {
    getPedidos().then(mapGetOrders.bind(this));
    console.log('llamada a getPedidos');
  },[reloadList]);
  
  
  const mapGetOrders = (response) => {
    let newDataCard = [];
    response.forEach(order => {
      newDataCard.push({
        key: order.id,
        topCol1: `${order.clientName} ${order.clientLastName !== null ? order.clientLastName : ''}`,
        midCol1: order.fechaEntrega,
        midCol2: null,
        botCol1: order.estado
      })
    });
    if (displayMode === 'shortMode') {
      newDataCard = newDataCard.slice(0, 3);
    }
    setDataCard(newDataCard);
  }

  return (
    <ScrollView style={styles.container}>
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
    container: {
    }
})