import { StyleSheet, Text, View } from 'react-native'
import { React, useState } from 'react';
import CustomModal from './CustomModal';
import CommonInput from '../Input/input.common';
import AmountWidget from '../AmountWidget';
export default function ProductItemModal({onConfirm, showModal, setShowModal, data}) {
  const products = [
    {id:'1',name:'Manzanas'},
    {id:'2',name:'Pochoclos'},
    {id:'3',name:'Copos de Azucar'}
  ];
  const [selectedProduct, setSelectedProduct] = useState(data ? products.find((x) => x.id === data.idProducto) : null);
  const [selectedColor, setSelectedColor] = useState(data ? data.idColor : null);
  const [amount, setAmount] = useState(data ? data.cantidad : 0);

  const getProduct = () => {
    // if (data && data.idProducto) {
    //   const product = products.find((x) => x.id === data.idProducto);
    //   return product
    // }
    return products.find((x) => x.id === data.idProducto)
  }

  const colors = [
    {id:'0',name:'Celeste'},
    {id:'1',name:'Verde'},
    {id:'2',name:'Amarillo'},
    {id:'3',name:'Rosa'},
    {id:'4',name:'Naranja'}
  ];

  const callOnConfirmMethod = () => {
    setAmount(0);
    setSelectedColor(null);
    setSelectedProduct(null);
    onConfirm({
      idDetalleDeProduto: 0,
      idColor: selectedColor.id,
      cantidad: amount,
      idProducto: selectedProduct.id
    });
  }

  const checkEnableConfirmButtonModal = () => {
    return amount > 0 && selectedColor !== null && selectedProduct !== null;
  }

  return (
    <View>
        <CustomModal
          visible={showModal} 
          setShowModal={setShowModal} 
          title={'Agregar Producto'}
          showFooter={true}
          showButtonClose={false}
          onConfirm={callOnConfirmMethod}
          enableConfirmButton={checkEnableConfirmButtonModal()}
          >
          <View style={[modalStyles.customContentContainer]}>
            <View style={{zIndex: 1001, marginBottom: 10}}>
              <CommonInput
                label="Tipo de producto"
                type="combo"
                value={getProduct()}
                items={products.map((x) => {
                  return { label: x.name, value: x.id };
                })}
                onChangeInput={(val) => {
                  setSelectedProduct(products.find((x) => x.id == val.value));
                }}
              />
            </View>
            <View style={{marginBottom: 10}}>
              <CommonInput
                label="Color del producto"
                type="combo"
                value={selectedColor}
                items={colors.map((x) => {
                  return { label: x.name, value: x.id };
                })}
                onChangeInput={(val) => {
                  setSelectedColor(colors.find((x) => x.id == val.value));
                }}
              />
            </View>
            <AmountWidget amount={amount} setAmount={setAmount}/>
          </View>
        </CustomModal>
    </View>
  )
}

const styles = StyleSheet.create({});

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
  