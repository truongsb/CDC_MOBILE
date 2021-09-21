import React, { useState, useEffect } from 'react';
import { Alert, Text, View, StyleSheet, Button, } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import { VanTaiService } from "../Api/vantan";
import { useDispatch } from 'react-redux';
import { setUrlQRXanh } from "../redux/actions";

export default function QRScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  const handleBarCodeScanned = ({ type, data }) => {
    if (data != null && data != '') {
      setScanned(true);
      console.log(data);
      if(data.indexOf('drvn.gov.vn')>0 && data.indexOf('TKVT_')<0)
      {
        Alert.alert(data);
        let id = data.substring(data.lastIndexOf("token=")+6);
        dispatch(setUrlQRXanh({id_qr:id, loai_qr:'DRVN'}));
        navigation.navigate('Home', { name: 'Home' });
      }
      else if(data.indexOf('TKVT_')>-1)
      {
        var ma_van_tai = data.replace('TKVT_', '');
        // Alert.alert('Thông báo',`Dữ liệu từ kiểm dịch nội tỉnh: ${data}`);
        dispatch(setUrlQRXanh({id_qr:ma_van_tai, loai_qr:'TKVT'}));
        navigation.navigate('Home', { name: 'Home' });
        // VanTaiService.getInfoVanTaibyId(ma_van_tai).then((res) => {
        //   if (res.success && res.data != null) {
        //     d
        //     
        //   }
        //   else {

        //   }
        // });
      }
      else
      {
        Alert.alert('Không phải dữ liệu từ drvn.gov.vn hoặc TKVT',data)
      }
    }
    else {
      Alert.alert("Không có dữ liệu!")
      setScanned(true);
    }

  };

  if (hasPermission === null) {
    return <Text>Yêu cầu quyền truy cập camera</Text>;
  }
  if (hasPermission === false) {
    return <Text>Không truy cập được camera</Text>;
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
  }
});
