import { React, useState, useEffect } from "react";
import { View, Text } from "react-native";
import { pedidos } from "../../data/pedidos";
import CommonInput from "../../components/common/Input/input.common";
import { clientes } from "../../data/clientes";
import { productores } from "../../data/productores";
import { detallesproducto } from "../../data/detalle-producto";
import { getFormatedDate } from "react-native-modern-datepicker";
import { ShowOrderStyles } from "./ShowOrder.styles";
import CommonItemsProduct from "../../components/common/items-producto/items-product.common";
import CustomModal from "../../components/common/modals/CustomModal";
import { ButtonP } from "../../components/common/buttons/ButtonP";
import { ScrollView } from "react-native";
import ProductItemModal from "../../components/common/modals/ProductItemModal";
import { productos } from "../../data/productos";
import SelectList from "react-native-dropdown-select-list";

export default function ShowOrder({ route, navigation }) {
  useEffect(() => {
    let newAmount = details.reduce((partialSum, dp) => {
      const price = productos.find((p) => p.id === dp.idProducto).precio;
      return partialSum + price * dp.cantidad;
    }, 0);
    setamount(newAmount);
  });
  const { idpedido, editable } = route.params;
  const [isEditable, setisEditable] = useState(editable ? true : false);
  navigation.setOptions({ title: `Pedido #${idpedido}` });
  const initialOrder = pedidos.find((x) => x.idPedido == idpedido);
  const [order, setorder] = useState(initialOrder);
  const initialClient = clientes.find((x) => x.id == order.idCliente);
  const [client, setclient] = useState(initialClient);
  const initialProducer = productores.find((x) => x.id == order.idProductor);
  const [producer, setproducer] = useState(initialProducer);
  const initialDetails = detallesproducto.filter(
    (x) => x.idPedido == order.idPedido
  );
  const [details, setdetails] = useState(initialDetails);
  const [showOptionsModal, setShowOptionsModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [showFinishModal, setshowFinishModal] = useState(false);
  const [showCancelModal, setshowCancelModal] = useState(false);
  const [selectedProductItem, setSelectedProductItem] = useState();
  const [amount, setamount] = useState(0);
  const [selectedStatus, setSelectedStatus] = useState("");
  const data = [
      {id:'1',value:'anulado'},
      {id:'2',value:'cancelado'},
  ];

  const updateOrder = () => {
    let valid = true;
    if (!order.direccionEntrega) valid = false;
    if (!order.fechaEntrega) valid = false;
    if (!producer) valid = false;
    if (order.delivery == null) valid == false;
    if (details == null) valid == false;
    if (detallesproducto.length <= 0) valid = false;

    if (!valid) {
      alert("Complete correctamente los campos.");
      return
    }

    // llamada al servicio de update order
    navigation.navigate("HomeScreen");
    return;
  };

  const resetOrder = () => {
    setorder(initialOrder);
    setclient(initialClient);
    setproducer(initialProducer);
    setdetails(initialDetails);
  }

  const productItemModalHandler = (product) => {
    setSelectedProductItem(product);
    setShowModal(!showModal);
  };

  const setNewOrEditedProduct = (detail) => {
    if (detail.idDetalleDeProducto === -1) {
      detail.idDetalleDeProducto = details.length;
      setdetails([...details, detail]);
    } else {
      const indx = details.findIndex(
        (prod) => prod.idDetalleDeProducto === detail.idDetalleDeProducto
      );
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

  return (
    <ScrollView>
      <ButtonP
        title="Opciones"
        width={90}
        backgroundColor="#F9C3C3"
        onPress={() => {
          setShowOptionsModal(true);
        }}
      ></ButtonP>
      <View style={ShowOrderStyles.container}>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="text"
            label="Cliente"
            value={`${client.nombre} ${client.apellido}`}
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
            value={getFormatedDate(order.fechaEntrega, "YYYY/MM/DD HH:mm")}
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
              placeholder={producer.nombre}
              editable={!isEditable}
              value={{ label: producer.nombre, value: producer.id }}
              items={productores.map((x) => {
                return { label: x.nombre, value: x.id };
              })}
              onChangeInput={(val) =>
                setproducer(productores.find((x) => x.id == val.value))
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
                title="Generar PDF"
                width={300}
                backgroundColor="#F9C3C3"
                onPress={() => {}}
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
                onPress={() => {setshowCancelModal(true)}}
              ></ButtonP>
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
            setorder({ ...order, estado: "finalizado" });
            updateOrder();
            setshowFinishModal(false);
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
          enableConfirmButton={selectedStatus ? true :  false}
          onConfirm={() => {
            setorder({ ...order, estado: selectedStatus});
            updateOrder();
            setshowCancelModal(false);
          }}
        >
          <View
            style={[
              ShowOrderStyles.customContentContainer,
              { paddingBottom: 50, paddingTop: 20 },
            ]}
          >
            <Text style={{ fontSize: 18, textAlign: "center" }}>
              Esta a punto de dar de baja un pedido ¿Desea Anularlo o
              Cancelarlo?
            </Text>
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
                backgroundColor: "#FAFAFA",
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
                backgroundColor: "#FAFAFA",
                shadowColor: "#333",
                elevation: 4,
              }}
            />
          </View>
        </CustomModal>
      </View>
    </ScrollView>
  );
}