import { StyleSheet, Text, View } from 'react-native'
import { React, useState } from 'react';
import CustomModal from './CustomModal';
import SelectList from 'react-native-dropdown-select-list';
import DropDownPicker from 'react-native-dropdown-picker';
import { inputCommonStyles } from './../Input/input.common.styles';
export default function ProductItemModal({onConfirm, showModal, setShowModal, data}) {
  const [enableConfirmButtonModal, setEnableConfirmButtonModal] = useState(false)
  const [selectedProduct, setSelectedProduct] = useState();
  const [selectedColor, setSelectedColor] = useState();
  const [open, setOpen] = useState(false);

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
            <View style={[modalStyles.toggle]}>
              <SelectList
                search = {false}
                placeholder={'Selecciona un producto'}
                setSelected={setSelectedProduct}
                data={[
                    {id:'1',value:'Manzanas'},
                    {id:'2',value:'Pochoclos'},
                    {id:'3',value:'Copos de Azucar'},
                ]}
                dropdownStyles={{shadowColor: "#000", elevation: 24, borderWidth: 0, zIndex: 200, backgroundColor: '#FAFAFA'}}
                inputStyles={{color: '#8E8E8E', fontSize: 18, fontWeight: '500'}}
                dropdownTextStyles={{color: '#8E8E8E', fontSize: 18, fontWeight: '500'}}
                boxStyles={{borderWidth: 0, backgroundColor: '#FAFAFA', shadowColor: "#333", elevation: 4, }}
                onSelect={() => {setEnableConfirmButtonModal(true)}}
              />
            </View>
            <DropDownPicker
              key={data ? data.idDetalleDeProduto : 0}
              open={open}
              value={selectedColor}
              items={[
                {value:'1',label:'Rojo'},
                {value:'2',label:'Celeste'},
                {value:'3',label:'Verde'},
                {value:'4',label:'Amarillo'},
                {value:'5',label:'Lila'},
                {value:'6',label:'Rosa'},
              ]}
              setValue={setSelectedColor}
              setOpen={setOpen}
              placeholder={'Selecciona un color'}
              selectedItemLabelStyle={{color: '#8E8E8E'}}
              listItemLabelStyle={{color: '#A2A2A2'}}
              textStyle={{fontSize: 16, color: "#8E8E8E", fontWeight: "500"}}
              dropDownContainerStyle={{
                zIndex: 1000,
                elevation: 10,
                borderWidth: 0
              }}
              style={{borderWidth: 0, 
                elevation: 5,}}
            />
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
      paddingVertical: 50
    },
    toggle: {
      position: 'absolute',
      zIndex: 200,
      top: 25,
      width: '100%',
    }
  })
  