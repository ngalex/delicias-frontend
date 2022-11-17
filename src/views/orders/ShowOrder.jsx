import { React, useState, useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import CommonInput from "../../components/common/Input/input.common";
import { detallesproducto } from "../../data/detalle-producto";
import { ShowOrderStyles } from "./ShowOrder.styles";
import CommonItemsProduct from "../../components/common/items-producto/items-product.common";
import CustomModal from "../../components/common/modals/CustomModal";
import { ButtonP } from "../../components/common/buttons/ButtonP";
import { ScrollView } from "react-native";
import ProductItemModal from "../../components/common/modals/ProductItemModal";
import { productos } from "../../data/productos";
import SelectList from "react-native-dropdown-select-list";
import * as AppService from "../../services/service";
import Voucher from "../../components/common/voucher/voucher.common";
import { baseColors } from "../../constants/baseColors";
import * as DateUtils from "../../utilities/date-utils";

export default function ShowOrder({ route, navigation }) {
  
  useEffect(() => {
    AppService.getPedidoById_sp(idpedido).then(configData.bind(this));
  },[order]);

  useEffect(() => {
    console.log('aca');
    navigation.setOptions({
      headerRight: () => (
        <View style={ShowOrderStyles.margin_bottom}>
          <ButtonP
            title="Opciones"
            width={90}
            customStyles={{ paddingVertical : 8 }}
            backgroundColor="#D5D5D5"
            onPress={() => {
              setShowOptionsModal(true);
            }}
          ></ButtonP>
        </View>
      ),
    });
  },[navigation]);

  useEffect(() => {
    AppService.getProductores().then(configProductores.bind(this));
  },[order]);

  useEffect(() => {
    AppService.getDetalleProdcutoByPedidoId(idpedido).then(configDetails.bind(this));
  },[order]);

  const configDetails = (response) => {
    setdetails(response);
  }

  const configProductores = (response) => {
    setProducers(response);
  }

  const configData = (response) => {
    const orderResult = response[0];
    orderResult.fechaEntrega =
      DateUtils.getDateString(new Date(orderResult.fechaEntrega)).replace(
        /-/g,
        "/"
      ) + " " + DateUtils.userFormatTime(orderResult.fechaEntrega);
    setorder(orderResult);
    setclient({ id: orderResult.cliente_id, nombre: orderResult.clientName, apellido: orderResult.clientLastName});
    setproducer({ id: orderResult.productor_id, nombre: orderResult.producerName});
  }
  useEffect(() => {
    let newAmount = details.reduce((partialSum, dp) => {
      const price = productos.find((p) => p.id === dp.producto_id).precio;
      return partialSum + price * dp.cantidad;
    }, 0);
    setamount(newAmount);
  });
  const { idpedido, editable } = route.params;
  const [isEditable, setisEditable] = useState(editable ? true : false);
  navigation.setOptions({ title: `Pedido #${idpedido}` });
  const initialOrder = {
    id: -1,
    direccionEntrega: "",
    fechaEntrega: "",
    estado: "PENDIENTE",
    montoTotal: 0,
    anticipo: 0,
    delivery: false,
    productor_id: -1,
    cliente_id: -1,
  };

  const [order, setorder] = useState(initialOrder);
  const initialClient = {
    id: -1,
    nombre: "",
    apellido: "",
    dni: "",
    telefono: 0,
    email: "",
    direccion: "",
    participaSorteo: false,
    participaPromocion: false,
  };
  const [client, setclient] = useState(initialClient);
  const initialProducer = {
    id: -1,
    nombre: "",
    dni: "",
    telefono: -1,
  };
  const [producer, setproducer] = useState(initialProducer);
  const initialDetails = detallesproducto.filter(
    (x) => x.pedido_id == order.id
  );
  const [details, setdetails] = useState(initialDetails);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFinishModal, setshowFinishModal] = useState(false);
  const [showCancelModal, setshowCancelModal] = useState(false);
  const [selectedProductItem, setSelectedProductItem] = useState();
  const [amount, setamount] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("");
  const [producers, setProducers] = useState([]);
  const data = [
    { id: "1", value: "ANULADO" },
    { id: "2", value: "CANCELADO" },
  ];

  const updateOrder = async () => {
    let valid = true;
    if (!order.direccionEntrega) valid = false;
    if (!order.fechaEntrega) valid = false;
    if (!producer) valid = false;
    if (order.delivery == null) valid == false;
    if (details == null) valid == false;
    if (detallesproducto.length <= 0) valid = false;

    if (!valid) {
      alert("Complete correctamente los campos.");
      return;
    }

    let updatedOrder = {
      direccionEntrega: order.direccionEntrega,
      fechaEntrega: new Date(order.fechaEntrega),
      estado: "PENDIENTE",
      montoTotal: amount,
      anticipo: amount / 2,
      delivery: order.delivery,
      productor_id: producer.id,
      cliente_id: client.id,
    };

    let result = await AppService.updatePedido(order.id, updatedOrder)
      .then((response) => response)
      .catch((err) => err);
    console.log("ok: ", result);
    updateDetailProducts();
    return;
  };

  const finishOrder = () => {
    AppService.updateEstadoPedido(order.id, 'FINALIZADO').then( response => {
      console.log(response);
      setshowFinishModal(false);
    navigation.navigate("HomeScreen");
    });
  }

  const cancelOrder = () => {
    AppService.updateEstadoPedido(order.id, selectedStatus).then( response => {
      console.log(response);
      setshowCancelModal(false);
    navigation.navigate("HomeScreen");
    });
  }
  const updateDetailProducts = async () => {
    let newdetails = details.filter((x) => x.isNew);
    if (newdetails.length > 0) {
      newdetails = newdetails.map((x) => {
        return {
          cantidad: x.cantidad,
          color: x.color,
          producto_id: x.producto_id,
          pedido_id: order.id,
        };
      });
      let result = await AppService.addDetallesProductos(newdetails)
        .then((response) => response)
        .catch((err) => err);
  
      console.log("ok: ", result);
    }
    let editedDetails = details.filter((x) => x.isEdited);
    if (editedDetails.length > 0) {
      editedDetails = editedDetails.map((x) => {
        return {
          id: x.id,
          cantidad: x.cantidad,
          color: x.color,
          producto_id: x.producto_id,
          pedido_id: order.id,
        };
      });
      let result = await AppService.updateDetallesProductos(editedDetails)
        .then((response) => response)
        .catch((err) => err);
  
      console.log("ok: ", result);
    }
    
    navigation.navigate("HomeScreen");
  }

  const resetOrder = () => {
    setorder(initialOrder);
    setclient(initialClient);
    setproducer(initialProducer);
    setdetails(initialDetails);
  };

  const productItemModalHandler = (product) => {
    setSelectedProductItem(product);
    setShowModal(!showModal);
  };

  const setNewOrEditedProduct = (detail, mode) => {
    if (mode === 'new') {
      detail.isNew = true;
      setdetails([...details, detail]);
    } else {
      detail.isEdited = true;
      const indx = details.findIndex( (prod) => prod.id === detail.id );
      const detailProductsAux = details;
      detailProductsAux[indx] = detail;
      setdetails(detailProductsAux);
    }
    setShowModal(!showModal);
  };

  const handleUpdateDetails = (value) => {
    setdetails(value);
    let newAmount = value.reduce(
      (partialSum, a) => partialSum + a.producto.precio * a.cantidad,
      0
    );
    setamount(newAmount);
  };

  const setMessageBaja = () => {
    switch (selectedStatus) {
      case 'ANULADO':
        return <Text style={{marginHorizontal: 10, color: '#333'}}>El Anticipo entregado del pedido sera
        registrado como un ingreso y el estado del
        pedido pasara a estado ANULADO</Text>
      case 'CANCELADO':
        return <Text style={{marginHorizontal: 10, color: '#333'}}>El Anticipo entregado del pedido NO sera
        registrado como un ingreso y el estado del
        pedido pasara a estado CANCELADO</Text>
      default:
        break;
    }
  }

  const renderEditedButtons = () => {
    if (order.estado === 'ACTIVO' || order.estado === 'PENDIENTE'){
      return(
        <>
        <View style={{ paddingBottom: 10 }}>
              <ButtonP
                title="Editar"
                width={300}
                backgroundColor="#F9C3C3"
                onPress={() => {
                  setisEditable(true);
                  setShowOptionsModal(false);
                }}
              ></ButtonP>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <ButtonP
                title="Finalizar"
                width={300}
                backgroundColor="#F9C3C3"
                onPress={() => {
                  setshowFinishModal(true);
                }}
              ></ButtonP>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <ButtonP
                title="Dar de baja"
                width={300}
                backgroundColor="#F9C3C3"
                onPress={() => {
                  setSelectedStatus(null);
                  setshowCancelModal(true);
                }}
              ></ButtonP>
            </View>
        </>
      )
    }
  }

  return (
    <ScrollView>
      <View style={ShowOrderStyles.container}>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="text"
            label="Cliente"
            value={`${client.nombre} ${client.apellido ? client.apellido : ""}`}
            placeholder={"Escriba..."}
            onChangeInput={(val) => null}
            editable={false}
          ></CommonInput>
        </View>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="text"
            label="Direccion"
            value={order.direccionEntrega}
            placeholder={"Escriba..."}
            onChangeInput={(val) =>
              setorder({ ...order, direccionEntrega: val })
            }
            editable={isEditable}
          ></CommonInput>
        </View>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="date"
            label="Fecha de entrega"
            value={order.fechaEntrega}
            placeholder={"Escriba..."}
            onChangeInput={(val) => setorder({ ...order, fechaEntrega: val })}
            editable={isEditable}
          ></CommonInput>
        </View>
        <View style={ShowOrderStyles.row}>
          <View style={{ flexBasis: "60%" }}>
            <CommonInput
              type="combo"
              label="Productor asignado"
              placeholder={`${producer.nombre} ${
                producer.apellido ? producer.apellido : ""
              }`}
              editable={!isEditable}
              value={{ label: producer.nombre, value: producer.id }}
              items={producers.map((x) => {
                return { label: x.nombre, value: x.id };
              })}
              onChangeInput={(val) =>
                setproducer(producers.find((x) => x.id == val.value))
              }
            ></CommonInput>
          </View>
          <View style={{ flexBasis: "30%" }}>
            <CommonInput
              label="Delivery"
              type="combo"
              placeholder={order.delivery ? "Si" : "No"}
              items={[
                { label: "Si", value: true },
                { label: "No", value: false },
              ]}
              value={
                order.delivery
                  ? { label: "Si", value: true }
                  : { label: "No", value: false }
              }
              editable={!isEditable}
              onChangeInput={(val) =>
                setorder({ ...order, delivery: val.value })
              }
            ></CommonInput>
          </View>
        </View>
        <Text style={ShowOrderStyles.subtitle}>Productos</Text>

        <ProductItemModal
          onConfirm={setNewOrEditedProduct}
          showModal={showModal}
          setShowModal={setShowModal}
          data={selectedProductItem}
        />
        <CommonItemsProduct
          editable={isEditable}
          setData={setdetails}
          items={details}
          onChangeDetails={(details) => {
            handleUpdateDetails(details);
          }}
          productItemModalHandler={productItemModalHandler}
        ></CommonItemsProduct>

        <Text style={ShowOrderStyles.subtitle}>Pago</Text>
        <View>
          <View style={ShowOrderStyles.containerCurrency}>
            <Text style={ShowOrderStyles.currencyTitle}>Anticipo</Text>
            <Text style={ShowOrderStyles.currency}>$ {amount / 2}</Text>
          </View>
          <View style={ShowOrderStyles.containerCurrency}>
            <Text style={ShowOrderStyles.currencyTitle}>Monto Total</Text>
            <Text style={ShowOrderStyles.currency}>$ {amount}</Text>
          </View>
        </View>

        {isEditable ? (
          <View
            style={{
              flexDirection: "row",
              justifyContent: "space-between",
              paddingBottom: 10,
            }}
          >
            <ButtonP
              title="Cancelar"
              width="45%"
              backgroundColor="#E3E3E3"
              onPress={() => {
                setisEditable(false);
                resetOrder();
              }}
            ></ButtonP>
            <ButtonP
              title="Confirmar"
              width="45%"
              backgroundColor="#AEC8F1"
              onPress={() => {
                setisEditable(false);
                updateOrder();
              }}
            ></ButtonP>
          </View>
        ) : null}

        <CustomModal
          visible={showOptionsModal}
          setShowModal={setShowOptionsModal}
          title={"Cambiar estado del pedido"}
          showFooter={false}
          showButtonClose={false}
          enableConfirmButton={false}
          onConfirm={() => {}}
        >
          <View style={[ShowOrderStyles.customContentContainer]}>
            {renderEditedButtons()}
            <View style={{ paddingBottom: 10 }}>
              <Voucher
                pedido_id={order.id}
                clientFullName={`${client.nombre} ${
                  client.apellido ? client.apellido : ""
                }`}
                direccion={order.direccionEntrega}
                anticipo={order.anticipo}
                montoTotal={order.montoTotal}
              ></Voucher>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <ButtonP
                title="Cancelar"
                width={300}
                backgroundColor="#ABABAB"
                onPress={() => {
                  setShowOptionsModal(false);
                }}
              ></ButtonP>
            </View>
          </View>
        </CustomModal>
        <CustomModal
          visible={showFinishModal}
          setShowModal={setshowFinishModal}
          title={"Finalizar Pedido"}
          showFooter={true}
          showButtonClose={false}
          enableConfirmButton={true}
          onConfirm={() => {
            finishOrder();
          }}
        >
          <View
            style={[
              ShowOrderStyles.customContentContainer,
              { paddingBottom: 50, paddingTop: 20 },
            ]}
          >
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              ¿Estas seguro de que deseas finalizar el pedido?
            </Text>
          </View>
        </CustomModal>

        <CustomModal
          visible={showCancelModal}
          setShowModal={setshowCancelModal}
          title={`Dar de Baja el pedido #${order.id}`}
          showFooter={true}
          showButtonClose={false}
          enableConfirmButton={selectedStatus ? true : false}
          onConfirm={() => {
            cancelOrder()
          }}
        >
          <View
            style={[
              ShowOrderStyles.modal_customContentContainer,
              { paddingBottom: 50, paddingTop: 20 },
            ]}
          >
            <Text style={{ fontSize: 17, textAlign: "left", marginHorizontal: 10, color: '#333', fontWeight: '500' }}>
              Esta a punto de dar de baja un pedido ¿Desea Anularlo o
              Cancelarlo?
            </Text>
            <View style={[modalStyles.toggle]}>
              <SelectList
                search={false}
                placeholder={"Selecciona un estado"}
                setSelected={setSelectedStatus}
                data={data}
                dropdownStyles={{
                  shadowColor: "#000",
                  elevation: 24,
                  borderWidth: 0,
                  zIndex: 200,
                  backgroundColor: baseColors.fondoApp,
                }}
                inputStyles={{
                  color: "#8E8E8E",
                  fontSize: 18,
                  fontWeight: "500",
                }}
                dropdownTextStyles={{
                  color: "#8E8E8E",
                  fontSize: 18,
                  fontWeight: "500",
                }}
                boxStyles={{
                  borderWidth: 0,
                  backgroundColor: baseColors.fondoApp,
                  shadowColor: "#333",
                  elevation: 4,
                }}
              />
            </View>
            <View style={{ marginTop: 70 }}>
              {setMessageBaja()}
            </View>
          </View>
        </CustomModal>
      </View>
    </ScrollView>
  );
}
const modalStyles = StyleSheet.create({
  toggle: {
    position: 'absolute',
    zIndex: 200,
    top: 70,
    width: '100%'
  },
})
