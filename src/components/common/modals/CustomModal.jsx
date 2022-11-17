import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { Modal } from 'react-native';
import { ButtonP } from '../buttons/ButtonP';
import SelectList from 'react-native-dropdown-select-list'
import { Button, Icon } from 'react-native-elements';
import { baseColors } from '../../../constants/baseColors';

export default function CustomModal(props) {

    const {visible, setShowModal, children, title, showFooter, showButtonClose, enableConfirmButton, onConfirm, onShowModal} = props;
    const renderFooter = () => {
        if (showFooter) {
            return (
                <View style={styles.footer}>
                        <ButtonP
                            title={'Cancelar'}
                            backgroundColor={'#E3E3E3'}
                            width="40%"
                            onPress={() => {setShowModal(false)}}/>
                        <ButtonP
                            title={'Confirmar'}
                            backgroundColor={'#AEC8F1'}
                            width="40%"
                            disabled = {!enableConfirmButton}
                            onPress={onConfirm}/>
                    </View>
            )
        };
        return null;
    };
    const renderButtonClose = () => {
        if (showButtonClose) {
            return (
                <Button
                    type='clear'
                    icon={{name: 'close',type: 'font-awesome',size: 25,color: '#444',}}
                    size="sm"
                    onPress={() => {setShowModal(false)}}/>
            )
        };
        return null;
    };

    return (
        <>
        <Modal onShow={onShowModal} visible={visible} animationType={'fade'} transparent= {true}>
            <View style={styles.backdrop}></View>
            <View style={styles.container}>
                <View style={styles.modalContainer}>
                    <View style={styles.topContainer}>
                        <Text style={styles.title}>{title}</Text>
                        {renderButtonClose()}
                    </View>
                    {children}
                    {renderFooter()}
                </View>
            </View>
        </Modal>
        </>
  )
}

const styles = StyleSheet.create({
    backdrop:{
        backgroundColor: '#000',
        zIndex: -1,
        position: 'absolute',
        height: '100%',
        width: '100%',
        opacity: 0.2
    },
    container: {
        flex: 1,
        justifyContent: 'center',
        padding: 12
    },
    modalContainer: {
        backgroundColor: baseColors.fondoApp,
        padding: 10,
        borderRadius: 35,
        shadowColor: "#000",
        elevation: 24,
        alignItems: 'center'
    },
    topContainer:{
      flexDirection:'row',
      width: '100%',
      alignItems: 'center'
    },
    title: {
        flex: 1,
        marginLeft: 10,
        fontSize: 22,
        color: '#8E8E8E',
        fontWeight: '500'
    },
    footer:{
        flexDirection: 'row',
        justifyContent: 'space-around',
        width: '100%',
        zIndex: -1
    }
})