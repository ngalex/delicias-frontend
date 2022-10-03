import {
  StyleSheet,
  Text,
  View,
  VirtualizedList,
  ScrollView,
} from "react-native";
import React, { useState, useEffect } from "react";
import CommonInput from "../../components/common/Input/input.common";
import { NewOrderStyles } from "./NewOrder.styles";
import { ButtonP } from "../../components/common/buttons/ButtonP";
import {productores} from "../../data/productores";
import CommonItemsProduct from "../../components/common/items-producto/items-product.common";
import { clientes } from "../../data/clientes";
import ProductItemModal from "../../components/common/modals/ProductItemModal";
import { productos } from "../../data/productos";
//BUG: cuando se pre cargan los datos del cliente con el bton BUSCAR CLIENTE, los valores de 'participaSorteo' y 'participaPromocion' tambien 
//son cargados en el objeto 'client' pero no se actualiza el valor de los switchs. Por lo que si alguno viene en true, el switch va a seguir viendose apagado
//se arregla con useEffects

export default function NuevoPedido({ navigation }) {

  useEffect(() => {
    let newAmount = detailProducts.reduce((partialSum, dp) => {
      const price = productos.find( p => p.id === dp.idProducto).precio
      return partialSum + price * dp.cantidad
    }, 0);
    setamount(newAmount);
    if (client != clientInitialState) {
      setIsEnabledSorteo(client.participaSorteo);
      setIsEnabledOffer(client.participaPromocion);
    }
  })
  
  const [last, setlast] = useState(false);
  const clientInitialState = {
    id: 1,
    nombre: null,
    apellido: null,
    dni: null,
    telefono: 0,
    email: null,
    direccion: null,
    participaSorteo: false,
    participaPromocion: false,
  };
  const producerInitialState = {
    id: -1,
    nombre: null,
    dni: null,
    telefono: -1,
  };
  const [client, setclient] = useState(clientInitialState);
  const [order, setorder] = useState({
    IDPedido: 0,
    direccionEntrega: null,
    fechaEntrega: null,
    estado: "pendiente",
    montoTotal: 0,
    anticipo: 0,
    delivery: false,
    suscriber: null,
  });
  const [producer, setproducer] = useState(producerInitialState);
  const [details, setdetails] = useState([]);
  const [amount, setamount] = useState(0);
  const [isPreloadedClientData, setisPreloadedClientData] = useState(false);

  const [isEnabledSorteo, setIsEnabledSorteo] = useState(false);
  const [isEnabledOffer, setIsEnabledOffer] = useState(false);
  const [isEnabledDelivery, setIsEnabledDelivery] = useState(false);

  const [detailProducts, setDetailProducts] = useState([])

  //UseStates para Modal
  const [showModal, setShowModal] = useState(false)
  const [selectedProductItem, setSelectedProductItem] = useState()

  const loadClientForm = (clientData) => {
    return (
      <View>
        <View
          style={{
            marginBottom: 15,
            flexDirection: "row",
          }}
        >
          <View style={{ flexGrow: 1, marginRight: 10 }}>
            <CommonInput
              type="text"
              label="Cliente"
              value={
                clientData.nombre && clientData.apellido
                  ? clientData.nombre + " " + clientData.apellido
                  : null
              }
              placeholder={"Escriba..."}
              editable={clientData === clientInitialState ? true : false}
              onChangeInput={(text) => setclient({ ...client, nombre: text })}
            ></CommonInput>
          </View>
          <ButtonP
            title={
              clientInitialState === clientData ? "Buscar Cliente" : "Limpiar"
            }
            width={90}
            backgroundColor="#F9C3C3"
            onPress={() => {
              setclient({ ...client, ...clientes[0] });
              setisPreloadedClientData(!isPreloadedClientData);
            }}
          ></ButtonP>
        </View>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="text"
            label="DNI"
            value={clientData.dni}
            placeholder={"Escriba..."}
            onChangeInput={(text) => setclient({ ...client, dni: text })}
          ></CommonInput>
        </View>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="text"
            label="Teléfono"
            value={clientData.telefono ? clientData.telefono.toString() : null}
            placeholder={"Escriba..."}
            onChangeInput={(text) => setclient({ ...client, telefono: text })}
          ></CommonInput>
        </View>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="text"
            label="Correo"
            value={clientData.email}
            placeholder={"Escriba..."}
            onChangeInput={(text) => setclient({ ...client, email: text })}
          ></CommonInput>
        </View>

        <View
          style={{
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ flexGrow: 1 }}>
            {"¿Desea recibir ofertas por correo?"}
          </Text>
          <CommonInput
            type="switch"
            value={isEnabledOffer}
            onChangeInput={(val) =>{
              setIsEnabledOffer(val);
              setclient({ ...client, participaPromocion: val })
            }
            }
          ></CommonInput>
        </View>
        <View
          style={{
            marginBottom: 15,
            flexDirection: "row",
            alignItems: "center",
          }}
        >
          <Text style={{ flexGrow: 1 }}>{"¿Desea participar en sorteos?"}</Text>
          <CommonInput
            type="switch"
            value={isEnabledSorteo}
            onChangeInput={(val) =>{
              setIsEnabledSorteo(val);
              setclient({ ...client, participaSorteo: val })
            }
            }
          ></CommonInput>
        </View>
      </View>
    );
  };

  const firstPage = () => {
    return (
      <View>
        <Text style={NewOrderStyles.subtitle}>Datos de cliente</Text>
        {isPreloadedClientData
          ? loadClientForm(client)
          : loadClientForm(clientInitialState)}

        <Text style={NewOrderStyles.subtitle}>Datos de Pedido</Text>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="text"
            label="Dirección"
            placeholder={"Escriba..."}
            value={order.direccionEntrega}
            onChangeInput={(val) =>
              setorder({ ...order, direccionEntrega: val })
            }
          ></CommonInput>
        </View>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="date"
            label="Fecha de entrega"
            value={order.fechaEntrega}
            placeholder={"Seleccione..."}
            editable={true}
            onChangeInput={(val) => setorder({ ...order, fechaEntrega: val })}
          ></CommonInput>
        </View>
        <View
          style={{
            marginBottom: 15,
            flexDirection: "row",
            justifyContent: "space-between",
          }}
        >
          <View style={{ flexBasis: "65%" }}>
            <CommonInput
              label="Productor"
              type="combo"
              placeholder={"Seleccione..."}
              value={
                producer
                  ? { label: producer.nombre, value: producer.id }
                  : producerInitialState
              }
              items={productores.map((x) => {
                return { label: x.nombre, value: x.id };
              })}
              onChangeInput={(val) => {
                setproducer({
                  ...producer,
                  ...productores.find((x) => x.id == val.value),
                });
              }}
            ></CommonInput>
          </View>
          <CommonInput
            label="Delivery"
            value={isEnabledDelivery}
            type="switch"
            onChangeInput={(val) => {
              setIsEnabledDelivery(val);
              setorder({ ...order, delivery: val })
            }}
          ></CommonInput>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
          <ButtonP
            title="Anterior"
            backgroundColor="#E3E3E3"
            width="45%"
            onPress={() => navigation.navigate("HomeScreen")}
          ></ButtonP>
          <ButtonP
            title="Siguiente"
            backgroundColor="#AEC8F1"
            width="45%"
            onPress={() => {
              canGoSecondPage()
                ? setlast(true)
                : alert("Complete todos los campos antes de continuar.");
            }}
          ></ButtonP>
        </View>
      </View>
    );
  };

  const canGoSecondPage = () => {
    if (!client) return false;
    if (!order.direccionEntrega) return false;
    if (!order.fechaEntrega) return false;
    if (!producer) return false;
    if (order.delivery == null) return false;
    return true;
  };

  const handleUpdateDetails = (value) => {
    setdetails(value);
    let newAmount = value.reduce(
      (partialSum, a) => partialSum + a.producto.precio * a.cantidad,
      0
    );
    setamount(newAmount);
  };

  const secondPage = () => {
    return (
      <View>
        <Text style={NewOrderStyles.subtitle}>Seleccionar Productos</Text>
        <ProductItemModal 
          onConfirm={setNewOrEditedProduct}
          showModal={showModal}
          setShowModal={setShowModal}
          data={selectedProductItem}/>
        <CommonItemsProduct
          items={detailProducts}
          setData={setDetailProducts}
          editable = {true}
          onChangeDetails={(details) => {
            handleUpdateDetails(details);
          }}
          productItemModalHandler = {productItemModalHandler}
        ></CommonItemsProduct>

        <Text style={NewOrderStyles.subtitle}>Importe a Pagar</Text>
        <View>
          <View style={NewOrderStyles.containerCurrency}>
            <Text style={NewOrderStyles.currencyTitle}>Anticipo</Text>
            <Text style={NewOrderStyles.currency}>$ {amount / 2}</Text>
          </View>
          <View style={NewOrderStyles.containerCurrency}>
            <Text style={NewOrderStyles.currencyTitle}>Monto Total</Text>
            <Text style={NewOrderStyles.currency}>$ {amount}</Text>
          </View>
        </View>

        <View
          style={{
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 20,
            marginBottom: 20,
          }}
        >
          <ButtonP
            title="Cancelar"
            backgroundColor="#E3E3E3"
            width="45%"
            onPress={() => setlast(false)}
          ></ButtonP>
          <ButtonP
            title="Confirmar"
            backgroundColor="#AEC8F1"
            width="45%"
            onPress={() => { registerOrder(); navigation.navigate("HomeScreen");}}
          ></ButtonP>
        </View>
      </View>
    );
  };

  const registerOrder = () => {
    console.log(order);
  }
  //#region Modal de Producto

  const productItemModalHandler = (product) => {
    setSelectedProductItem(product);
    setShowModal(!showModal);
  }
  
  const setNewOrEditedProduct = (detail) => {
    if (detail.idDetalleDeProducto === -1) {
      detail.idDetalleDeProducto = detailProducts.length;
      setDetailProducts([...detailProducts, detail])
    } else {
      const indx = detailProducts.findIndex( (prod) => prod.idDetalleDeProducto === detail.idDetalleDeProducto);
      const detailProductsAux = detailProducts;
      detailProductsAux[indx] = detail;
      setDetailProducts(detailProductsAux)
    }
    setShowModal(!showModal);
  }
  //#endregion

  return (
    <ScrollView style={NewOrderStyles.container}>
      {last ? secondPage() : firstPage()}
    </ScrollView>
  );
}

const styles = StyleSheet.create({});
