import React from "react";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { CommonItemsProductStyles } from "./items-product.common.styles";
import BigButton from "../buttons/BigButton";

import Icon from 'react-native-vector-icons/FontAwesome5';
import ProductItem from "../products/ProductItem";

/**
 * prop.items es un array de Detalle producto
 * prop.onChangeDetails es un handle que escucha cambios en el listado de detalle producto y retorna al componente parent.
 * @returns
 */
const CommonItemsProduct = (props) => {
  const [items, setitems] = useState(
    !Array.isArray(props.items)? [] : props.items
    // [
    //   {
    //     idDetalleDeProduto: 1,
    //     producto: {
    //       IDProducto: 1,
    //       nombre: "manzana acaramelada",
    //       precio: 100.0,
    //       estado: "activo",
    //     },
    //     cantidad: 1,
    //     color: "verde",
    //   },
    //   {
    //     idDetalleDeProduto: 2,
    //     producto: {
    //       IDProducto: 1,
    //       nombre: "manzana acaramelada",
    //       precio: 100.0,
    //       estado: "activo",
    //     },
    //     cantidad: 1,
    //     color: "verde",
    //   },
    //   {
    //     idDetalleDeProduto: 3,
    //     producto: {
    //       IDProducto: 1,
    //       nombre: "manzana acaramelada",
    //       precio: 100.0,
    //       estado: "activo",
    //     },
    //     cantidad: 1,
    //     color: "verde",
    //   },
    //   {
    //     idDetalleDeProduto: 4,
    //     producto: {
    //       IDProducto: 1,
    //       nombre: "manzana acaramelada",
    //       precio: 100.0,
    //       estado: "activo",
    //     },
    //     cantidad: 1,
    //     color: "verde",
    //   },
    //   {
    //     idDetalleDeProduto: 5,
    //     producto: {
    //       IDProducto: 1,
    //       nombre: "manzana acaramelada",
    //       precio: 100.0,
    //       estado: "activo",
    //     },
    //     cantidad: 1,
    //     color: "verde",
    //   },
    // ]
  );
  let counter = 0;

  const bgList = [
    CommonItemsProductStyles.itemBgRed,
    CommonItemsProductStyles.itemBgBlue,
    CommonItemsProductStyles.itemBgYellow,
    CommonItemsProductStyles.itemBgGreen,
  ];

  const nextStyle = () => {
    counter++;
    if (counter >= bgList.length) {
      counter = 0;
    }
    return counter;
  };

  const onAddButton = () => {
    // ToDO: llamar modal, recuperar Detalle de Producto.
    let detail = {
      idDetalleDeProduto: 0,
      producto: {
        IDProducto: 2,
        nombre: "algodón de azúcar",
        precio: 150.0,
        estado: "activo",
      },
      cantidad: 5,
      color: "rojo",
    };

    let details = addDetail(detail);
    setitems(details);
    props.onChangeDetails(details);
    return;
  };

  const addDetail = (detail) => {
    if (!detail) return;
    let details = [...items];

    let item = details.find(
      (item) => item.producto.IDProducto == detail.producto.IDProducto
    );

    if (!item) {
      details.push(detail);
      return details;
    }

    details.map((item) => {
      if (item.producto.IDProducto == detail.producto.IDProducto) {
        item.cantidad++;
      }
    });
    return details;
  };

  const removeDetail = (IDProducto) => {
    if (!IDProducto) return;
    let details = items.filter(
      (item) => item.producto.IDProducto != IDProducto
    );
    setitems(details);
    props.onChangeDetails(details);
  };

  const showItems = () => {
    if (items.length > 0) {
      return items.map((value, index) => (
        <ProductItem
        key={value.idDetalleDeProduto}
          onClick={() => props.productItemModalHandler(value.producto.IDProducto)}
          data={value}
        />
      ));
    }
  };

  return (
    <View style={CommonItemsProductStyles.container}>
      <Pressable
        style={{ width: 80, height: 100 }}
        onPress={() => onAddButton()}
      >
        <BigButton item="+"></BigButton>
      </Pressable>
      {showItems()}
    </View>
  );
};

export default CommonItemsProduct;
