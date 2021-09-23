import React, { useState, useEffect } from 'react'
import { Header } from "react-native-elements";
import { Text, TouchableOpacity, Image, StyleSheet, View, Alert, TouchableHighlight, ActivityIndicator } from 'react-native';
import { WebView } from 'react-native-webview';
import { useSelector, useDispatch } from 'react-redux';
import { resetUrlQRXanh } from "../redux/actions";
import { ScrollView } from 'react-native-gesture-handler';

export default function HomeScreen({ navigation }) {
    const url_qr_xanh = useSelector(state => state.setUrlQRVanTai)
    const dispatch = useDispatch();
    const [urlQrLuongXanh, seturlQrLuongXanh] = useState('')
    const dataLogin = useSelector(state => state.infoLogin);
    const [isLoadding, setisLoadding] = useState(false);
    useEffect(() => {
        if (url_qr_xanh && url_qr_xanh.loai_qr !== undefined && url_qr_xanh.loai_qr !== '' && url_qr_xanh.loai_qr==='DRVN') {
            seturlQrLuongXanh(url_qr_xanh.id_qr)
        }
        else {
            seturlQrLuongXanh('');
        }
    }, [url_qr_xanh])
    const OnPressLeftHeader = () => {
        navigation.openDrawer();
    }
    const handleHome = () => {
        seturlQrLuongXanh('');
        dispatch(resetUrlQRXanh());
    }
    const onQRClick = () => {
        navigation.navigate('QrSceen', { name: 'QrSceen', dataLogin: dataLogin })
    }
    const handleInsert = () => {
        handleHome();
        Alert.alert('Thông báo','Thêm mới loại di chuyển là?',
        [
            {
              text: "Thoát",
              style: "cancel"
            },
            { text: "Quá cảnh", onPress: () => navigation.navigate('infoTaiXe', { name: 'infoTaiXe', xe_qua_canh: 1 }) },
            { text: "Nội địa", onPress: () => navigation.navigate('infoTaiXe', { name: 'infoTaiXe', xe_qua_canh: 0 }) }
          ]
        );
    }
    return (
        <View style={styles.container}>

            <Header
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' }, onPress: () => OnPressLeftHeader() }}
                centerComponent={{ text: 'KIỂM DỊCH BÌNH PHƯỚC', style: { color: '#fff', fontSize: 18 } }}
                rightComponent={{ icon: 'home', color: '#fff', onPress: () => handleHome() }}
                containerStyle={{
                    backgroundColor: '#3D6DC0',
                    justifyContent: 'space-around',
                }}
            />
            <ScrollView
                contentContainerStyle={{flexGrow: 1,}}
                containerStyle={{ backgroundColor: 'red' }}
            >
                <View style={{flex: 1}}>
                <View style={styles.textChot}>
                    <Text style={styles.textChot}>{dataLogin.ten_chot}</Text>
                </View>

                <View
                    style={{
                        borderBottomColor: '#2C81C3',
                        borderBottomWidth: 5,
                    }}
                />
                <View style={styles.webview}>
                    {urlQrLuongXanh ?
                        <WebView
                            style={{justifyContent:'center'}}
                            source={{ uri: `https://vantai.drvn.gov.vn/tokhaiyteQR?token=${urlQrLuongXanh}` }}
                            renderLoading={<ActivityIndicator size="large" color="#00ff00" />}
                            renderError={<Text style={styles.textFail}>Dữ liệu vừa quét không đúng!</Text>}
                        /> :
                        <View style={{ alignItems: 'center' }}>
                            <Text style={styles.textFail}>Chưa có dữ liệu!</Text>
                            <Text style={styles.textFail}>Vui lòng quét mã QR</Text>
                        </View>
                    }
                </View>
                <View
                    style={{
                        borderBottomColor: '#2C81C3',
                        borderBottomWidth: 5,
                    }}
                />
                {urlQrLuongXanh ?
                    <View >
                        {!isLoadding ?
                            <View>
                                <View style={styles.footer}>
                                    <View style={{ width: '30%' }}>
                                        <TouchableHighlight
                                            style={[styles.buttonContainer, styles.checkinButton]}
                                            onPress={() => { navigation.navigate('infoTaiXe', { name: 'infoTaiXe', xe_qua_canh: 1 }); }}
                                        >
                                            <Text style={styles.loginText}>Xe quá cảnh</Text>
                                        </TouchableHighlight>
                                    </View>
                                    <View style={{ width: '10%' }} />
                                    <View style={{ width: '30%' }}>
                                        <TouchableHighlight
                                            style={[styles.buttonContainer, styles.checkoutButton]}
                                            onPress={() => { navigation.navigate('infoTaiXe', { name: 'infoTaiXe', xe_qua_canh: 0 }); }}
                                        >
                                            <Text style={styles.loginText}>Xe nội địa</Text>
                                        </TouchableHighlight>
                                    </View>
                                </View>

                            </View>
                            :
                            <ActivityIndicator size="large" />}

                    </View>
                    :
                    <View />
                }
                </View>
            </ScrollView>
            <View style={{backgroundColor: '#DCDCDC',borderTopColor:'black', borderTopWidth: 2, alignContent:'center', justifyContent:'center', flexDirection: 'row',paddingBottom:10,  paddingTop: 5}}>
                <View style={styles.qrcode}>
                    <TouchableOpacity style={styles.ButtonQr} activeOpacity={0.5} onPress={() => handleInsert()}>
                        <Image
                            source={require('../../public/insert.png')}
                            style={styles.ImageIconStyle}
                        />
                    </TouchableOpacity>
                    <Text>Khai báo mới</Text>
                </View>
                <View style={{width:'18%'}}></View>
                <View style={styles.qrcode}>
                    <TouchableOpacity style={styles.ButtonQr} activeOpacity={0.5} onPress={() => onQRClick()}>
                        <Image
                            source={require('../../public/qr.png')}
                            style={styles.ImageIconStyle}
                        />
                    </TouchableOpacity>
                    <Text>Quét mã QR</Text>
                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    webview: {
        flex: 1,
        height:'95%',
    },
    textFail: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
    },
    // camera: {
    //     flex: 1,
    //     justifyContent: 'flex-end',
    //     alignItems: 'center',
    // },
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
        width: 50,
        height: 50
    },
    ButtonQr: {

        alignItems: 'center',
        width: 50,
        height: 50
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
        // width: '120%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 5,
        borderRadius: 15,
    },
    checkinButton: {
        backgroundColor: "#00b33c",

    },
    checkoutButton: {
        backgroundColor: "#00b5ec",

    },
    footer: {

        justifyContent: 'center',
        // alignItems: 'center',
        flexDirection: 'row',
        marginBottom: 40,
        marginTop: 10,
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
        paddingLeft: 5,
        paddingRight: 5
    },
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        marginTop: 22
    },
    modalView: {
        margin: 20,
        backgroundColor: "#FFFFFF",
        borderRadius: 20,
        padding: 35,
        textAlign: "right",
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2
        },
        shadowOpacity: 0.25,
        shadowRadius: 4,
        elevation: 5
    },
    inputContainer: {
        marginLeft: 10,
        backgroundColor: '#FFFFFF',
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#555',
        width: '40%',
        fontWeight: "bold",
        marginBottom: 5,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        color: 'red',
        fontWeight: 'bold',
        borderColor: 'red',
        fontSize: 16,
        flex: 1,
        textAlign: 'center',
    },
    modalText: {
        fontSize: 20,
        marginBottom: 5
    },
    buttonCancel: {
        backgroundColor: "#C8C1BF",
        width: '150%',
    },
    tttb_content_noidung: {
        flexDirection: 'column',

    },
});