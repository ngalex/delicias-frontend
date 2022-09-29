import React from "react";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { CommonItemsProductStyles } from "./items-product.common.styles";
import OptionGrid from "../buttons/BigButton";

/**
 * prop.items es un array de Detalle producto
 * prop.onChangeDetails es un handle que escucha cambios en el listado de detalle producto y retorna al componente parent.
 * @returns
 */
export default function CommonItemsProduct(props) {
  const { items, editable } = props;
  const [detailList, setdetails] = useState(
    !items || !Array.isArray(items) ? [] : items
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
  const [isEditable, setisEditable] = useState(editable ? editable : false);
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
    setdetails(details);
    props.onChangeDetails(details);
    return;
  };

  const addDetail = (detail) => {
    if (!detail) return;
    let details = [...detailList];

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
    let details = detailList.filter(
      (item) => item.producto.IDProducto != IDProducto
    );
    setdetails(details);
    props.onChangeDetails(details);
  };

  const showItems = () => {
    if (detailList.length > 0) {
      return detailList.map((value, index) => (
        <Pressable
          onPress={() => removeDetail(value.producto.IDProducto)}
          key={index}
          style={[CommonItemsProductStyles.itemContainer, bgList[nextStyle()]]}
        >
          <Text style={CommonItemsProductStyles.itemCount}>
            {value.cantidad}
          </Text>
          <Text style={CommonItemsProductStyles.itemIcon}>
            {value.producto.nombre}
          </Text>
        </Pressable>
      ));
    }
  };

  return (
    <View style={CommonItemsProductStyles.container}>
      {isEditable ? (
        <Pressable
          style={{ width: 80, height: 100 }}
          onPress={() => onAddButton()}
        >
          <OptionGrid item="+"></OptionGrid>
        </Pressable>
      ) : (
        <View></View>
      )}

      {showItems()}
    </View>
  );
}
