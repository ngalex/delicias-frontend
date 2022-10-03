import React from "react";
import { useState } from "react";
import { View, Text, Pressable } from "react-native";
import { CommonItemsProductStyles } from "./items-product.common.styles";
import ProductItem from "../products/ProductItem";
import Icon from "react-native-vector-icons/FontAwesome5";

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

  const onAddButton = () => {
    // ToDO: llamar modal, recuperar Detalle de Producto.
    props.productItemModalHandler();
    // let detail = {
    //   idDetalleDeProduto: 0,
    //   producto: {
    //     IDProducto: 2,
    //     nombre: "algodón de azúcar",
    //     precio: 150.0,
    //     estado: "activo",
    //   },
    //   cantidad: 5,
    //   color: "rojo",
    // };

    // let details = addDetail(detail);
    // setitems(details);
    // props.onChangeDetails(details);
    // return;
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
    if (props.items.length > 0) {
      return props.items.map((value, index) => (
        <ProductItem
          key={value.idDetalleDeProduto}
          onClick={() => props.productItemModalHandler(value)}
          data={value}
        />
      ));
    }
  };

  return (
    <View style={CommonItemsProductStyles.container}>
      {showItems()}
      {editable ? (
        <Pressable
          style={CommonItemsProductStyles.itemContainer}
          onPress={() => onAddButton()}
        >
          <Icon name="plus" size={40} color="#8E8E8E" style={{}} />
        </Pressable>
      ) : null}
    </View>
  );
}
