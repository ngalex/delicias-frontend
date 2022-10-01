import { StyleSheet, Text, View } from 'react-native'
import { React, useState } from 'react';
import CustomModal from './CustomModal';
import SelectList from 'react-native-dropdown-select-list';
import DropDownPicker from 'react-native-dropdown-picker';
import { inputCommonStyles } from './../Input/input.common.styles';
import CommonInput from '../Input/input.common';
import AmountWidget from '../AmountWidget';
export default function ProductItemModal({onConfirm, showModal, setShowModal, data}) {
  const [enableConfirmButtonModal, setEnableConfirmButtonModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [amount, setAmount] = useState(1);

  const products = [
    {id:'1',name:'Manzanas'},
    {id:'2',name:'Pochoclos'},
    {id:'3',name:'Copos de Azucar'}
  ];
  const colors = [
    {id:'2',name:'Celeste'},
    {id:'3',name:'Verde'},
    {id:'4',name:'Amarillo'},
    {id:'5',name:'Rosa'},
    {id:'7',name:'Naranja'}
  ];

  const callOnConfirmMethod = () => {
    setEnableConfirmButtonModal(false);
    onConfirm();
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
          enableConfirmButton={enableConfirmButtonModal}
          >
          <View style={[modalStyles.customContentContainer]}>
            <View style={{zIndex: 1001, marginBottom: 10}}>
              <CommonInput
                label="Tipo de producto"
                type="combo"
                value={selectedProduct}
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
      padding: 10
    },
    toggle: {
      position: 'absolute',
      zIndex: 200,
      top: 25,
      width: '100%',
    }
  })
  