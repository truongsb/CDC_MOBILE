import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button, Modal, TouchableHighlight } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
// import ModalDataCheckQr from './Components/ModalDataCheckQr';
import { VanTaiService } from "../Api/vantan";
import moment from 'moment';
const confirmrs = (top, nd) => {
  Alert.alert(
    top,
    nd,
    [
      { text: 'OK' },
    ]
  )
}
export default function QRScreen({ route, navigation }) {
  const { dataLogin } = route.params;
  const [hasPermission, setHasPermission] = useState(null);
  const [ischeckin, setischeckin] = useState(false);
  const [isCheckout, setisCheckout] = useState(false);
  const [scanned, setScanned] = useState(false);
  const [showModal, setshowModal] = useState(false);
  const [infoVantai, setinfoVantai] = useState('');
  const [ma_to_khai_van_tai, setma_to_khai_van_tai] = useState('')
  useEffect(() => {
    console.log(dataLogin);
  }, [dataLogin])
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);
  useEffect(() => {
    //if(í)
    if (ischeckin) {
     // gọi hàm checkin
     
    }
  }, [ischeckin])

  useEffect(() => {
    //if(í)
    if (isCheckout) {
      //gọi hàm checkout
    }
  }, [isCheckout])
  const conFirmQR = (name) => {
    //setshowModal(!showModal);
    if (name === 'checkin') {
      VanTaiService.checkInVanTai(ma_to_khai_van_tai, dataLogin.ma_diem_den, dataLogin.ma_nhan_vien_check)
      .then((res) => {
        if (res.success) {        
          Alert.alert(
            'Thông báo',
            'Checkin thành công!',
            [
              { text: 'OK' , onPress: () => {setshowModal(!showModal); navigation.navigate('Home', { name: 'Home' });} }
            ]
          )
         // 
        } else {
          confirmrs("Lỗi check in!", "")
        }
      });
      
    }
    else {
      setisCheckout(true);
    }
  }
  const handleBarCodeScanned = ({ type, data }) => {

    if (data != null && data != '') {
      if (data.indexOf('TKVT_') > -1) {
        var ma_van_tai = data.replace('TKVT_', '');
        setma_to_khai_van_tai(ma_van_tai);
        setScanned(true);
        VanTaiService.getInfoVanTaibyId(ma_van_tai).then((res) => {
          if (res.success && res.data != null) {
            setinfoVantai(res.data);
            convertResultQrScan(res.data)
          }
          else {

          }
        });
        //setshowModal(!showModal);
      }
      else {
        setScanned(true);
        Alert.alert("Thông báo", "Không phải tờ khai vận tải! \nVui lòng kiểm tra lại thông tin giấy tờ !")
      }
    }
    else {
      Alert.alert("Không có dữ liệu!")
      setScanned(true);
    }

  };
  const convertResultQrScan = (data) => {
    console.log('data user',data);
    console.log(dataLogin);
    if (data.diem_den && dataLogin != null && data.diem_den.split(',').includes(dataLogin.ma_diem_den.toString())) {
      setshowModal(!showModal);
    } else {
      Alert.alert(
        "Thông báo",
        "Điểm đến không nằm trong lộ trình đã đăng ký! \nBạn có muốn CHECKIN cho tài xế?",
        [{
          text: 'Có', onPress: () => { setshowModal(!showModal) }
        },
        {
          text: 'Không'
        }]
      )
    }
  }

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View style={styles.container}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      />
      {scanned &&
        <Button style={styles.button} title={'Chạm để Scan lại'} onPress={() => setScanned(false)} />

      }
      {showModal ? <Modal
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
            <Text style={styles.modalText}>Họ tên : {infoVantai?.ho_ten}  </Text>
            <Text style={styles.modalText}>Xe: {infoVantai?.bien_so}  </Text>
            <Text style={styles.modalText}>Số người: {infoVantai?.so_nguoi}</Text>
            <Text style={styles.modalText}>Vào chốt {infoVantai?.ten_chot_van_tai}: {moment(infoVantai?.thoi_gian_xac_minh).format('HH:mm:ss DD/MM/YYYY')}</Text>
            {/* <Text style={styles.modalText}>Thời gian di chuyển: 12:35</Text> */}
            <View style={styles.actionButton}>
              <TouchableHighlight style={[styles.buttonContainer, styles.cancelButton]} onPress={() => setshowModal(!showModal)}>
                <Text style={styles.loginText}>Không</Text>
              </TouchableHighlight>
              {
                dataLogin.is_checkin &&
                <TouchableHighlight style={[styles.buttonCheck, styles.loginButton]} onPress={() => conFirmQR('checkin')}>
                  <Text style={styles.loginText}>Checkin</Text>
                </TouchableHighlight>
              }
              {
                dataLogin.is_checkout &&
                <TouchableHighlight style={[styles.buttonCheck, styles.loginButton]} onPress={() => conFirmQR('checkout')}>
                  <Text style={styles.loginText}>Checkout</Text>
                </TouchableHighlight>
              }
            </View>
          </View>
        </View>
      </Modal> : <Text></Text>
      }
    </View>
  );
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
