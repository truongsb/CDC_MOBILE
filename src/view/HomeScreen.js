import React, { useState, useEffect } from 'react'
import { Header, SearchBar } from "react-native-elements";
import { Text, TouchableOpacity, Image, StyleSheet, View, Alert, ScrollView, TouchableHighlight, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import ListItemCar from '../Components/ListItemCar';
import { useSelector,useDispatch } from 'react-redux';
import { resetUrlQRXanh } from "../redux/actions";
import { VanTaiService } from '../Api/vantan';
// import { red } from 'color-name';

const confirmrs = (top, nd) => {
    Alert.alert(
      top,
      nd,
      [
        { text: 'OK' },
      ]
    )
  }
export default function HomeScreen({ route, navigation }) {
    // const {url_qr_xanh} = route.params;
    const url_qr_xanh = useSelector(state => state.setUrlQRVanTai)
    const [urlQrLuongXanh, seturlQrLuongXanh] = useState('')
    const dataLogin = useSelector(state => state.infoLogin);
    const [so_nguoi, setso_nguoi] = useState(0);
    const [dataTaixe, setdataTaixe] = useState([])
    const [valueSearch, setvalueSearch] = useState('');
    const [isLoadding, setisLoadding] = useState(false);
    const dispatch = useDispatch();
    const onSearchChange = (e) => {
        setvalueSearch(e)
    }
    useEffect(() => {
        if(url_qr_xanh !== undefined && url_qr_xanh !== '')
        {
            seturlQrLuongXanh(url_qr_xanh)
        }
        else{
            seturlQrLuongXanh('');
        }
    }, [url_qr_xanh])
    useEffect(() => {
        console.log('urlQrLuongXanh',urlQrLuongXanh);
    }, [urlQrLuongXanh])
    // useEffect(() => {
    //     if (urlQrLuongXanh) {
    //         setisLoadding(true);
    //         VanTaiService.getQrLuongXanh().then((res) => {
    //             setisLoadding(false)
    //             console.log(res);
    //             if (res) {
    //                 // setdataTaixe(res.drivers)
    //             }
    //             else {
    //                 setdataTaixe([]);
    //             }

    //             // if (res.success && res.data != null) {
    //             //   console.log("??");
    //             //   setinfoVantai(res.data);
    //             //   convertResultQrScan(res.data)
    //             // }
    //             // else {

    //             // }
    //         });
    //     }
    // }, [urlQrLuongXanh])
    const OnPressLeftHeader = () => {
        // alert("?")
        //navigation.navigate('LeftHeader');
        navigation.openDrawer();
        // return<LeftHeader/>
    }
    const conFirmQR = (xe_qua_canh) => {     
        setisLoadding(true);      
          VanTaiService.importQRLuongXanh(urlQrLuongXanh, so_nguoi, xe_qua_canh).then((res) => {
            setisLoadding(false); 
            if (res.success) {    
                dispatch(resetUrlQRXanh());   
              Alert.alert(
                'Thông báo',
                'Cập nhật thành công!',
                [
                  { text: 'OK' , onPress: () => {} }
                ]
              )
             // 
            } else {
              confirmrs("Lỗi check in!", "")
            }
          });
          
        }
    const handleHome = () => {
        seturlQrLuongXanh('');
        dispatch(resetUrlQRXanh());
    }
    const onQRClick = () => {
        navigation.navigate('QrSceen', { name: 'QrSceen', dataLogin: dataLogin })
    }
    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' }, onPress: () => OnPressLeftHeader() }}
                centerComponent={{ text: 'KIỂM DỊCH BÌNH PHƯỚC', style: { color: '#fff', fontSize: 18 } }}
                rightComponent={{ icon: 'home', color: '#fff' ,onPress: () => handleHome() }}
                containerStyle={{
                    backgroundColor: '#3D6DC0',
                    justifyContent: 'space-around',
                }}
            />
            {/* <View style={styles.textChot}>
                <Text style={styles.textChot}>{dataLogin.ten_chot}</Text>
            </View> */}
            <View style={styles.qrcode}>
                <TouchableOpacity style={styles.ButtonQr} activeOpacity={0.5} onPress={() => onQRClick()}>
                    <Image
                        source={require('../../public/qr.png')}
                        style={styles.ImageIconStyle}
                    />
                    
                </TouchableOpacity>
                <Text>Nhấn vào để quét mã QR</Text>
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 2,
                }}
            />
            {/* <SearchBar
                placeholder="Nhập 5 số cuối biển số để tìm kiếm...."
                onChangeText={onSearchChange}
                onCancel={onSearchChange}
                value={valueSearch}
                containerStyle={{
                    backgroundColor: 'white',
                    justifyContent: 'space-around',
                    height: 50,
                    borderTopColor: 'transparent',
                    borderBottomColor: 'transparent',

                }}
                inputContainerStyle={{
                    height: 40
                }}
            /> */}
            {/* <ScrollView> */}
            {/* <ListItemCar
                    valueSearch={valueSearch}
                    dataUser={dataLogin}
                /> */}
            {/* </ScrollView> */}

            {/* </ScrollView> */}
            <View style={styles.webview}>
                {urlQrLuongXanh?
                <WebView
                    source={{ uri: `${urlQrLuongXanh}` }}
                    renderLoading={<ActivityIndicator size="large" />}
                    renderError={<Text style={styles.textFail}>Dữ liệu vừa quét không đúng!</Text>}
                />:
                <Text style={styles.textFail}>Không có dữ liệu!</Text>
                }                
            </View>
            <View
                style={{
                    borderBottomColor: 'black',
                    borderBottomWidth: 3,
                }}
            />
            {urlQrLuongXanh ?
                <View >
                    {
                        (dataTaixe.length > 0) ?
                            <View style={{flexDirection: 'row'}}>
                                <Text>Tài xế:</Text>
                                {dataTaixe.map((item, key) => (
                                <Text key={key} style={{fontWeight:'bold'}}> {item.name} ,</Text>))
                                }
                            </View>

                            : <View>
                                {/* <Text>Không có thông tin tài xế</Text> */}
                                </View>
                    }
                    {!isLoadding?
                    <View style={styles.footer}>
                        <View  style={{ marginRight: 10 }}>
                            <TouchableHighlight
                                style={[styles.buttonContainer, styles.checkinButton]}
                                onPress={() => conFirmQR(0)}
                            >
                                <Text style={styles.loginText}>Xe quá cảnh</Text>
                            </TouchableHighlight>
                        </View>
                        <View style={{ marginLeft: 10 }}>
                            <TouchableHighlight
                                style={[styles.buttonContainer, styles.checkoutButton]}
                                onPress={() => conFirmQR(1)}
                            >
                                <Text style={styles.loginText}>Xe vào nội tỉnh</Text>
                            </TouchableHighlight>
                        </View>
                    </View>
                    :
                    <ActivityIndicator size="large" />}

                </View>
                : 
                <View/>
            }
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
        // marginBottom: 60
        // alignItems: 'center',
    },
    textFail: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
       marginTop: '10%',
       marginLeft: '30%',
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    button: {
        flex: 0.1,
        alignSelf: 'flex-end',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        color: 'white',
    },
    ImageIconStyle:
    {
        alignItems: 'center',
        width: 100,
        height: 100
    },
    ButtonQr: {

        alignItems: 'center',
        width: 100,
        height: 100
    },
    qrcode: {
        alignItems: 'center',
        backgroundColor: 'transparent',
    },
    textChot: {
        alignItems: 'center',
        fontSize: 20,
        fontWeight: 'bold',

    },
    buttonContainer: {
        height: 38,

        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 15,
    },
    checkinButton: {
        backgroundColor: "#00b33c",
        width: '100%',
    },
    checkoutButton: {
        backgroundColor: "#b32400",
        width: '100%'
    },
    footer: {
        justifyContent: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 40,
        marginTop: 10,
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 5
      }
});