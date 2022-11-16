import { StyleSheet, Text, View } from 'react-native';
import { React, useState } from 'react';
import OrderList from '../../components/orders/OrderList';
import CustomModal from './../../components/common/modals/CustomModal';
import SelectList from 'react-native-dropdown-select-list'
import { updateEstadoPedido } from './../../services/service';
import { ShowOrderStyles } from './ShowOrder.styles';
import CommonSearchBar from '../../components/common/searchbar/searchbar.common';

export default function Pedidos({navigation}) {
  const data = [
      {id:'1',value:'Activo'},
      {id:'2',value:'Pendiente'},
      {id:'3',value:'Finalizado'},
  ];

  const [showModal, setShowModal] = useState(false)
  const [showFinishModal, setShowFinishModal] = useState(false)
  const [selectedOrder, setSelectedOrder] = useState()
  const [selectedStatus, setSelectedStatus] = useState("");
  const [enableConfirmButtonModal, setEnableConfirmButtonModal] = useState(false)
  const [reloadList, setReloadList] = useState(false)
  const [pattern, setpattern] = useState(null);

  const modalHandler = (id) => {
    setSelectedOrder(id);
    setEnableConfirmButtonModal(false);
    setShowModal(!showModal);
  }

  const showOrder = (idpedido) => {
    setSelectedOrder(idpedido);
    navigation.navigate("PedidoScreen",{ idpedido: idpedido });
  }
  
  const changeOrderStatus = () => {
    console.log(`Cambia el estado del pedido con id ${selectedOrder} a estado ${selectedStatus} `);
    if (selectedStatus === 'Finalizado') {
      setEnableConfirmButtonModal(false);
      setShowModal(!showModal);
      setShowFinishModal(!showFinishModal);
    } else {
      updateEstadoPedido(selectedOrder, selectedStatus).then( response => {
        console.log(response);
        setEnableConfirmButtonModal(false);
        setReloadList(!reloadList);
        setShowModal(!showModal);
      });
    }
  }
  
  const finishOrder = () => {
    updateEstadoPedido(selectedOrder, selectedStatus).then( response => {
      console.log(response);
      setReloadList(!reloadList);
      setShowFinishModal(!showFinishModal);
    });
  }

  return (
    <View style={styles.container}>
      <View style={SearchBarStyles.container}>
        <CommonSearchBar placeholder={"Escriba un nombre o DNI"} onChangeInput={setpattern}></CommonSearchBar>
      </View>
      <OrderList
        pattern={pattern}
        reloadList={reloadList}
        displayMode={"orderMode"}
        modalHandler={modalHandler}
        selectionHandler={showOrder}
      />
      <CustomModal
        visible={showModal}
        setShowModal={setShowModal}
        title={"Cambiar estado del pedido"}
        showFooter={true}
        showButtonClose={false}
        enableConfirmButton={enableConfirmButtonModal}
        onConfirm={changeOrderStatus}
      >
        <View style={[modalStyles.customContentContainer]}>
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
              onSelect={() => {
                setEnableConfirmButtonModal(true);
              }}
            />
          </View>
        </View>
      </CustomModal>
      <CustomModal
        visible={showFinishModal}
        setShowModal={setShowFinishModal}
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
    </View>
  );
}

const styles = StyleSheet.create({
  container:{
    flex: 1,
    padding: 10,
    backgroundColor: '#FBFBFB'
  }
})

const SearchBarStyles = StyleSheet.create({
  container: {
    marginTop: 20,
    marginBottom: 15
  }
})

const modalStyles = StyleSheet.create({
  backdrop:{
      backgroundColor: '#000',
      zIndex: -1,
      position: 'absolute',
      height: '100%',
      width: '100%',
      opacity: 0.2
  },
  customContentContainer:{
    width: '100%',
    paddingVertical: 50
  },
  toggle: {
    position: 'absolute',
    zIndex: 200,
    top: 25,
    width: '100%',
  },
})