import { StyleSheet, Text, View } from 'react-native'
import { React, useEffect, useState } from 'react';
import CustomModal from './CustomModal';
import CommonInput from '../Input/input.common';
import AmountWidget from '../AmountWidget';
export default function ProductItemModal({onConfirm, showModal, setShowModal, data}) {
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [amount, setAmount] = useState(0);
  
  useEffect(() => {
    if (amount === 0 && data && data.cantidad) {
      setAmount(data.cantidad);
    }
    if (selectedProduct === null && data && data.producto_id) {
      setSelectedProduct(data.producto_id);
    }
    if (selectedColor === null && data && data.color) {
      setSelectedColor(data.color);
    }
  });

  const products = [
    {id: 1, name:'Manzanas'},
    {id: 2,name:'Pochoclos'},
    {id:3, name:'Copos de Azucar'}
  ];
  const colors = [
    {id: 1, name:'Celeste'},
    {id: 2, name:'Verde'},
    {id: 3, name:'Amarillo'},
    {id: 4, name:'Rosa'},
    {id: 5, name:'Naranja'}
  ];

  const callOnConfirmMethod = () => {
    if (data) {
      data.color = selectedColor;
      data.cantidad = amount;
      data.producto_id = selectedProduct;
      onConfirm(data, 'edit');
    } else {
      onConfirm({
        color: selectedColor,
        cantidad: amount,
        producto_id: selectedProduct,
      }, 'new');
    }
  }
  const onShowModal = () => {
      setAmount(0);
      setSelectedProduct(null);
      setSelectedColor(null);
  }

  const checkEnableConfirmButtonModal = () => {
    return (amount > 0 && selectedColor !== null && selectedProduct !== null) && (data ? (data.color !== selectedColor || data.cantidad !== amount || data.producto_id !== selectedProduct) : true);
  }

  return (
    <View>
      <CustomModal
        visible={showModal}
        setShowModal={setShowModal}
        title={"Agregar Producto"}
        showFooter={true}
        showButtonClose={false}
        onConfirm={callOnConfirmMethod}
        onShowModal={onShowModal}
        enableConfirmButton={checkEnableConfirmButtonModal()}
      >
        <View style={[modalStyles.customContentContainer]}>
          <View style={{ zIndex: 1001, marginBottom: 10 }}>
            <CommonInput
              label="Tipo de producto"
              type="combo"
              value={data && data.producto_id ? data.producto_id : null}
              items={products.map((x) => {
                return { label: x.name, value: x.id };
              })}
              onChangeInput={(val) => {
                setSelectedProduct(val.value);
              }}
            />
          </View>
          <View style={{ marginBottom: 10 }}>
            <CommonInput
              label="Color del producto"
              type="combo"
              value={data && data.color ? data.color : null}
              items={colors.map((x) => {
                return { label: x.name, value: x.id };
              })}
              onChangeInput={(val) => {
                setSelectedColor(val.value);
              }}
            />
          </View>
          <AmountWidget amount={amount} setAmount={setAmount} />
        </View>
      </CustomModal>
    </View>
  );
}

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
      paddingVertical: 30,
      paddingHorizontal: 10
    },
    toggle: {
      position: 'absolute',
      zIndex: 200,
      top: 25,
      width: '100%',
    }
  })
  