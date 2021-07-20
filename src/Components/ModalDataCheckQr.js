import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button, Modal, TouchableHighlight } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';

export default function ModalDataCheckQr({navigation}) {

    const [showModal, setshowModal] = useState(false);
    const conFirmQR =  () => {
      Alert.alert(
        'Xác nhận thành công!',
        '',
        [
               {text: 'OK', onPress: () => { navigation.navigate('Home', { name: 'Home' }); setshowModal(!showModal)}},
        ]
    )
    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={showModal}
            onRequestClose={() => {
                Alert.alert("Modal has been closed.");
                setshowModal(!showModal);
            }}
        >
            <View style={styles.centeredView}>
                <View style={styles.modalView}>
                    <Text style={styles.modalText}>Xe: 93H-02345 </Text>
                    <Text style={styles.modalText}>Số người: 2</Text>
                    <Text style={styles.modalText}>Giờ vào chốt Tân Lập: 12:35</Text>
                    <Text style={styles.modalText}>Thời gian di chuyển: 12:35</Text>
                    <View style={styles.actionButton}>
                        <TouchableHighlight style={[styles.buttonContainer, styles.cancelButton]} onPress={() => setshowModal(!showModal)}>
                            <Text style={styles.loginText}>Không</Text>
                        </TouchableHighlight>
                        {
                            dataLogin.is_checkin &&
                            <TouchableHighlight style={[styles.buttonCheck, styles.loginButton]} onPress={conFirmQR}>
                                <Text style={styles.loginText}>Checkin</Text>
                            </TouchableHighlight>
                        }
                        {
                            dataLogin.is_checkout &&
                            <TouchableHighlight style={[styles.buttonCheck, styles.loginButton]} onPress={conFirmQR}>
                                <Text style={styles.loginText}>Checkout</Text>
                            </TouchableHighlight>
                        }
                    </View>
                </View>
            </View>
        </Modal>
    )
}
const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'center',
    },
    button: {
      color: '#ff1a75',
      backgroundColor: '#ff1a75',
    }, centeredView: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    actionButton: {
      flexDirection: 'row',
      marginTop: 20
    },
    modalView: {
      margin: 20,
      backgroundColor: "#333333",
      borderRadius: 20,
      padding: 35,
      alignItems: "center",
      shadowColor: "#000",
      shadowOffset: {
        width: 0,
        height: 2
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5
    },
  
    buttonOpen: {
      backgroundColor: "#F194FF",
    },
    buttonClose: {
      backgroundColor: "#2196F3",
    },
    textStyle: {
      color: "white",
      fontWeight: "bold",
      textAlign: "center"
    },
    modalText: {
      fontWeight: 'bold',
      fontSize: 20,
      color: 'white'
    },
    buttonContainer: {
      height: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      width: '25%',
      borderRadius: 30,
    },
    buttonCheck: {
      height: 40,
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
      marginLeft: '10%',
      width: '25%',
      borderRadius: 30,
    },
    loginButton: {
      backgroundColor: "#00b5ec",
    },
    cancelButton: {
      backgroundColor: "gray",
    },
    loginText: {
      color: 'white',
      fontWeight: 'bold',
    }
  });
  