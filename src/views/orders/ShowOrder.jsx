import { React, useState } from "react";
import { View, Text, FlatList } from "react-native";
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
import SelectList from "react-native-dropdown-select-list";
import { ScrollView } from "react-native";

export default function ShowOrder({ route, navigation }) {
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
  const [showModal, setShowModal] = useState(false);
  const [enableConfirmButtonModal, setEnableConfirmButtonModal] =
    useState(false);
  const [selectedStatus, setSelectedStatus] = useState("");

  const updateDetails = (items) => {
    if (!items) return;
    console.log(items);
    let montoFinal = 0;

    items.map((x) => (montoFinal += x.cantidad * x.producto.precio));
    setorder({ ...order, montoTotal: montoFinal, anticipo: montoFinal / 2 });
  };

  const updateOrder = () => {
    return;
  };

  return (
    <ScrollView>
      <ButtonP
        title="Opciones"
        width={90}
        backgroundColor="#F9C3C3"
        onPress={() => {
          setShowModal(true);
        }}
      ></ButtonP>
      <View style={ShowOrderStyles.container}>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="text"
            label="Cliente"
            value={`${client.nombre} ${client.apellido}`}
            placeholder={"Escriba..."}
            onChangeInput={(val) => {}}
            editable={false}
          ></CommonInput>
        </View>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="text"
            label="Direccion"
            value={client.direccion}
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

        <CommonItemsProduct
          editable={isEditable}
          items={details}
          onChangeDetails={(details) => updateDetails(details)}
        ></CommonItemsProduct>

        <Text style={ShowOrderStyles.subtitle}>Pago</Text>
        <View>
          <View style={ShowOrderStyles.containerCurrency}>
            <Text style={ShowOrderStyles.currencyTitle}>Anticipo</Text>
            <Text style={ShowOrderStyles.currency}>$ {order.anticipo}</Text>
          </View>
          <View style={ShowOrderStyles.containerCurrency}>
            <Text style={ShowOrderStyles.currencyTitle}>Monto Total</Text>
            <Text style={ShowOrderStyles.currency}>$ {order.montoTotal}</Text>
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
          visible={showModal}
          setShowModal={setShowModal}
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
                  setShowModal(false);
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
                onPress={() => {}}
              ></ButtonP>
            </View>
            <View style={{ paddingBottom: 10 }}>
              <ButtonP
                title="Dar de baja"
                width={300}
                backgroundColor="#F9C3C3"
                onPress={() => {}}
              ></ButtonP>
            </View>
          </View>
        </CustomModal>
      </View>
    </ScrollView>
  );
}
