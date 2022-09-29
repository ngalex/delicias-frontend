import {React, useState} from "react";
import { View, Text } from "react-native";
import { pedidos } from "../../data/pedidos";
import CommonInput from "../../components/common/Input/input.common";
import { clientes } from "../../data/clientes";
import { productores } from "../../data/productores";
import { detallesproducto } from "../../data/detalle-producto";
import { getFormatedDate } from "react-native-modern-datepicker";
import { ShowOrderStyles } from "./ShowOrder.styles";
import CommonItemsProduct from "../../components/common/items-producto/items-product.common";

export default function ShowOrder({ route, navigation }) {
    const { idpedido, editable } = route.params;
    navigation.setOptions({ title: `Pedido #${idpedido}` });
    const order = pedidos.find(x => x.idPedido == idpedido);
    const client = clientes.find(x => x.id == order.idCliente);
    const producer = productores.find((x) => x.id == order.idProductor);
    const details = detallesproducto.filter(x => x.idPedido == order.idPedido)
    const [isEditable, setisEditable] = useState(editable);

    return (
      <View style={ShowOrderStyles.container}>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="text"
            label="Cliente"
            value={`${client.nombre} ${client.apellido}`}
            placeholder={"Escriba..."}
            onChangeInput={(text) => text}
            editable={false}
          ></CommonInput>
        </View>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="text"
            label="Direccion"
            value={client.direccion}
            placeholder={"Escriba..."}
            onChangeInput={(text) => text}
            editable={false}
          ></CommonInput>
        </View>
        <View style={{ marginBottom: 15 }}>
          <CommonInput
            type="date"
            label="Fecha de entrega"
            value={getFormatedDate(order.fechaEntrega, "YYYY/MM/DD HH:mm")}
            placeholder={"Escriba..."}
            onChangeInput={(text) => text}
            editable={false}
          ></CommonInput>
        </View>
        <View style={ShowOrderStyles.row}>
          <View style={{ flexBasis: "60%" }}>
            <CommonInput
              type="combo"
              label="Productor asignado"
              placeholder={"Escriba..."}
              editable={false}
              value={{ label: producer.nombre, value: producer.id }}
              items={productores.map((x) => {
                return { label: x.nombre, value: x.id };
              })}
              onChangeInput={(text) => text}
            ></CommonInput>
          </View>
          <View style={{ flexBasis: "30%" }}>
            <CommonInput
              label="Delivery"
              type="combo"
              items={[
                { label: "Si", value: true },
                { label: "No", value: false },
              ]}
              value={
                order.delivery
                  ? { label: "Si", value: true }
                  : { label: "No", value: false }
              }
              onChangeInput={(text) => text}
            ></CommonInput>
          </View>
        </View>
        <Text style={ShowOrderStyles.subtitle}>Productos</Text>

        <CommonItemsProduct
          items={details}
          onChangeDetails={(details) => {
            console.log(details);
          }}
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
      </View>
    );
}