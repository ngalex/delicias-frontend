import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { CommonItemsProductStyles } from '../items-producto/items-product.common.styles';
import IconFont5 from 'react-native-vector-icons/FontAwesome5';
import IconMCI from 'react-native-vector-icons/MaterialCommunityIcons';
import { Pressable } from 'react-native';

export default function ProductItem({onClick, data}) {

  const bgList = [
    CommonItemsProductStyles.itemBgRed,
    CommonItemsProductStyles.itemBgBlue,
    CommonItemsProductStyles.itemBgYellow,
    CommonItemsProductStyles.itemBgGreen,
  ];

  const getIconProduct = (idProduct) => {
    console.log(data);
    switch (idProduct) {
      case 1:
        return <IconFont5 name='apple-alt' size={30} color="#707070"/>
      case 2:
        return <IconMCI name='popcorn' size={30} color="#707070"/>
      case 3:
        return <IconMCI name='tree' size={30} color="#707070"/>
      default:
        console.log(`Error. Id incorrecto ${idProduct}`);
        break;
    }
  }
  return (
    <Pressable
    onPress={() => onClick(data.idDetalleDeProduto)}
    key={data.idDetalleDeProduto}
    style={[CommonItemsProductStyles.itemContainer, bgList[0]]}
    >
      <Text style={CommonItemsProductStyles.itemCount}>
        {data.cantidad}
      </Text>
      {getIconProduct(data.producto.IDProducto)}
    </Pressable>
  )
}

const styles = StyleSheet.create({})