import { StyleSheet, View } from 'react-native'
import React, { useState } from 'react'
import Card from '../common/Card';

export default function OrderList({displayMode, modalHandler}) {
  const [dataCard, setDataCard] = useState([
    {
      topCol1: "Lorena Diaz",
      key: 200,
      midCol1: '10:00 - 27 MAY',
      midCol2: 'Pedido #9',
      botCol1: 'EN PROCESO'
    },
    {
    topCol1: 'Mario Perez',
    key: 176,
    midCol1: '20:00 - 01 ENE',
    midCol2: 'Pedido #91',
    botCol1: 'EN PROCESO'
    },
    {
    topCol1: 'Jose Mags',
    key: 10,
    midCol1: '13:20 - 17 JUN',
    midCol2: 'Pedido #9',
    botCol1: 'PENDIENTE'
    }
  ]);

  return (
    
    <View style={styles.container}>
      {dataCard.map( item =>{ 
        return <Card key={item.key} data={item} displayMode={displayMode} modalHandler={modalHandler}/>
      })}
    </View>
  )
}

const styles = StyleSheet.create({
    container: {
      marginHorizontal: 15
    }
})