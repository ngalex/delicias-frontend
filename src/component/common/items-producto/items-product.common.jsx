import React from "react";
import { useState } from "react";
import { View, Text } from "react-native";
import { CommonItemsProductStyles } from "./items-product.common.styles";

const CommonItemsProduct = (props) => {
  /**
   * Recibe o carga el array de items, consituidos por objetos Detalle de Producto
   */
  const [items, setitems] = useState([
    {
      idDetalleDeProduto: 1,
      producto: {
        IDProducto: 1,
        nombre: "manzana acaramelada",
        precio: 100.0,
        estado: "activo",
      },
      cantidad: 1,
      color: "verde",
    },
    {
      idDetalleDeProduto: 1,
      producto: {
        IDProducto: 1,
        nombre: "manzana acaramelada",
        precio: 100.0,
        estado: "activo",
      },
      cantidad: 1,
      color: "verde",
    },
    {
      idDetalleDeProduto: 1,
      producto: {
        IDProducto: 1,
        nombre: "manzana acaramelada",
        precio: 100.0,
        estado: "activo",
      },
      cantidad: 1,
      color: "verde",
    },
    {
      idDetalleDeProduto: 1,
      producto: {
        IDProducto: 1,
        nombre: "manzana acaramelada",
        precio: 100.0,
        estado: "activo",
      },
      cantidad: 1,
      color: "verde",
    },
    {
      idDetalleDeProduto: 1,
      producto: {
        IDProducto: 1,
        nombre: "manzana acaramelada",
        precio: 100.0,
        estado: "activo",
      },
      cantidad: 1,
      color: "verde",
    },
  ]);

  const showItems = () => {
    const bgList = [
      CommonItemsProductStyles.itemBgRed,
      CommonItemsProductStyles.itemBgBlue,
      CommonItemsProductStyles.itemBgYellow,
      CommonItemsProductStyles.itemBgGreen,
    ];

    let counter = 0;

    if (items.length > 0) {
      return items.map((value, index) => (
        <View
          key={index}
          style={[CommonItemsProductStyles.itemContainer, bgList[counter++]]}
        >
          <Text>{value.cantidad}</Text>
          <Text>{value.producto.nombre}</Text>
        </View>
      ));
    }
  };

  return (
    <View style={CommonItemsProductStyles.container}>
      <Text>agregar</Text>
      {showItems()}
    </View>
  );
};

export default CommonItemsProduct;
