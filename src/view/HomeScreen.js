import React, { useState, useEffect, Fragment } from 'react'
import { Header, SearchBar } from "react-native-elements";
import { Text, TouchableOpacity, Image, StyleSheet, View, Alert, TouchableWithoutFeedback, Keyboard, TouchableHighlight, ActivityIndicator, TextInput } from 'react-native';
import { WebView } from 'react-native-webview';
import ListItemCar from '../Components/ListItemCar';
import { useSelector, useDispatch } from 'react-redux';
import { resetUrlQRXanh } from "../redux/actions";
import { VanTaiService } from '../Api/vantan';
import { ModalQRVanTaiCheckQr } from '../Components/ModalQRVanTaiCheckQr.js'
import Modal from "react-native-modal";
import SearchableDropdown from 'react-native-searchable-dropdown';
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
export default function HomeScreen({navigation }) {

    const dispatch = useDispatch();
    const [urlQrLuongXanh, seturlQrLuongXanh] = useState('')
    const dataLogin = useSelector(state => state.infoLogin);
    const [isLoadding, setisLoadding] = useState(false);
    
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
            <View style={styles.textChot}>
                <Text style={styles.textChot}>{dataLogin.ten_chot}</Text>
            </View>
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
                    borderBottomColor: '#2C81C3',
                    borderBottomWidth: 5,
                }}
            />
            <View style={styles.webview}>
                {urlQrLuongXanh ?
                    <WebView
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
                                        onPress={() => { navigation.navigate('infoTaiXe', { name: 'infoTaiXe',xe_qua_canh:1}); }}
                                    >
                                        <Text style={styles.loginText}>Xe quá cảnh</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={{ width: '10%' }} />
                                <View style={{ width: '30%' }}>
                                    <TouchableHighlight
                                        style={[styles.buttonContainer, styles.checkoutButton]}
                                        onPress={() => { navigation.navigate('infoTaiXe', { name: 'infoTaiXe',xe_qua_canh:0}); }}
                                    >
                                        <Text style={styles.loginText}>Xe nội tỉnh</Text>
                                    </TouchableHighlight>
                                </View>
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
    },
    textFail: {
        fontSize: 20,
        color: 'red',
        fontWeight: 'bold',
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
        backgroundColor: "#b32400",

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

    }
});