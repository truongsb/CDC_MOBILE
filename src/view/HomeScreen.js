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
export default function HomeScreen({ route, navigation }) {
    // const {url_qr_xanh} = route.params;
    const url_qr_xanh = useSelector(state => state.setUrlQRVanTai)
    const [urlQrLuongXanh, seturlQrLuongXanh] = useState('')
    const dataLogin = useSelector(state => state.infoLogin);
    const [so_nguoi, setso_nguoi] = useState('');
    const [bien_so, setbien_so] = useState('');
    const [ho_ten, setho_ten] = useState('');
    const [so_dien_thoai, setso_dien_thoai] = useState('');
    const [dataTaixe, setdataTaixe] = useState([]);
    const [isLoadding, setisLoadding] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [xe_qua_canh, setxe_qua_canh] = useState(0);
    const [eRorrsText, seteRorrsText] = useState(false);
    const [eRorrsDiemden, seteRorrsDiemden] = useState(false);
    const [listDiemDen, setlistDiemden] = useState([]);
    const [selectedListitem, setselectedListitem] = useState([])
    const dispatch = useDispatch();
    const onSearchChange = (e) => {
        setvalueSearch(e)
    }
    useEffect(() => {
        setselectedListitem([]);
        setso_nguoi('');
    }, [modalVisible])
    useEffect(() => {
        console.log(url_qr_xanh);
        if (url_qr_xanh && url_qr_xanh.loai_qr !== undefined && url_qr_xanh.loai_qr !== '') {
            if ( url_qr_xanh.loai_qr === 'TKVT') {
                VanTaiService.getInfoVanTaibyId(url_qr_xanh.id_qr).then((res) => {
                    if (res.success && res.data != null) {
                       console.log(res.data);
                       setdataTaixe(res.data)
                       setbien_so(res.data.bien_so);
                       setho_ten(res.data.ho_ten);
                       setso_dien_thoai(res.data.so_dien_thoai);
                       setModalVisible(true);
                    }
                    else {

                    }
                });
            }
            else if ( url_qr_xanh.loai_qr === 'DRVN')
            {
                console.log("??");
                //get theo tờ khai vận tải luồng xanh
                VanTaiService.getQrLuongXanh(url_qr_xanh.id_qr).then((res) => {
                    
                    if (res && res.regInfo && res.regInfo.regDrivers &&  res.regInfo.regDrivers.length>0) {
                        console.log(res.regInfo.regDrivers[0]);
                    //    setdataTaixe(res.data.map((item) => {
                    //        return {

                    //        }
                    //    }))
                    setho_ten(res.regInfo.regDrivers[0].driverName?res.regInfo.regDrivers[0].driverName:'');
                    setso_dien_thoai(res.regInfo.regDrivers[0].phoneNumber?res.regInfo.regDrivers[0].phoneNumber:'');
                    setbien_so(res.regInfo.vehicleNumber?res.regInfo.vehicleNumber:'');
                    //    setbien_so(res.data.bien_so);
                    //    setho_ten(res.data.ho_ten);
                    //    setso_dien_thoai(res.data.so_dien_thoai);
                    //    setModalVisible(true);
                    }
                    else {

                    }
                });
            }
            seturlQrLuongXanh(url_qr_xanh.id_qr)
        }
        else {
            seturlQrLuongXanh('');
        }
    }, [url_qr_xanh])

    useEffect(() => {
        VanTaiService.getDanhSachDiemDen().then((res) => {
            if (res.success && res.data != null) {
                setlistDiemden(handleOptions(res.data));
            }
        });
    }, [])
    const handleOptions = (ds) => {
        let ls = [];
        for (const item of ds) {
            let tem = {};
            // tem.label = item.ten_diem_den + " - " + item.ten_xa + " - " + item.ten_huyen;
            tem.name = item.ten_diem_den;
            tem.id = item.ma_diem_den;
            ls.push(tem);
        }
        return ls;
    };
    const OnPressLeftHeader = () => {
        navigation.openDrawer();
    }
    const conFirmQR = () => {
        
        if (so_nguoi !== '' && so_nguoi !== '0'&& selectedListitem.id) {
            console.log(selectedListitem.id,so_nguoi,xe_qua_canh,dataLogin.token, ho_ten, so_dien_thoai, bien_so );
            // VanTaiService.importQRLuongXanh(urlQrLuongXanh, so_nguoi, xe_qua_canh, dataLogin.token).then((res) => {
            //     setModalVisible(!modalVisible)
            //     if (res.success) {
            //         dispatch(resetUrlQRXanh());
            //         Alert.alert(
            //             'Thông báo',
            //             'Cập nhật thành công!',
            //             [
            //                 { text: 'OK', onPress: () => { } }
            //             ]
            //         )
            //         // 
            //     } else {
            //         confirmrs("Lỗi check in!", "")
            //     }
            // });
        }
        else if(so_nguoi == '' || so_nguoi == '0'){
            seteRorrsText(true);
        }
        if(!selectedListitem.id)
        {
            seteRorrsDiemden(true);
        }
    }
    const handleHome = () => {
        seturlQrLuongXanh('');
        dispatch(resetUrlQRXanh());
    }
    const onChangeTextSoNguoi = (text) => {
        if (text == '' || text == '0') {
            seteRorrsText(true)
        }
        else {
            seteRorrsText(false)
        }
        setso_nguoi(text);
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
            <Modal isVisible={modalVisible}>
                <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <Text style={styles.modalText}>Thông tin người trên xe: </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={{ marginTop: 3 }}>Tài xế:</Text>
                                <View style={{  borderColor: '#555', borderWidth: 1, borderRadius: 5, width:'75%', height: 25,}}>
                                    <TextInput style={styles.inputs}
                                        placeholder="Nhập tên tài xế"
                                        keyboardType="default"
                                        defaultValue={ho_ten}
                                        underlineColorAndroid='transparent'
                                        placeholderTextColor='#C8C1BF'
                                        require
                                        onChangeText={text => setho_ten(text)}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row',justifyContent: 'space-between', marginTop: 5 }}>
                                <Text style={{ marginTop: 3 }}>SĐT:</Text>
                                <View style={{ borderColor: '#555', borderWidth: 1, borderRadius: 5, width: '75%', height: 25,  }}>
                                    <TextInput style={styles.inputs}
                                        placeholder="SĐT tài xế"
                                        keyboardType="default"
                                        defaultValue={so_dien_thoai}
                                        underlineColorAndroid='transparent'
                                        placeholderTextColor='#C8C1BF'
                                        require
                                        onChangeText={text => setso_dien_thoai(text)}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row',justifyContent:'space-between', marginTop: 5 }}>
                                <Text style={{ marginTop: 3 }}>Biển số:</Text>
                                <View style={{  borderColor: '#555', borderWidth: 1, borderRadius: 5, width: '75%', height: 25 }}>
                                    <TextInput style={styles.inputs}
                                        placeholder="Biển số xe"
                                        keyboardType="default"
                                        defaultValue={bien_so}
                                        underlineColorAndroid='transparent'
                                        placeholderTextColor='#C8C1BF'
                                        require
                                        onChangeText={text => setbien_so(text)}
                                    />
                                </View>
                            </View>
                            <View style={{ flexDirection: 'row', marginTop: 5,  }}>
                                <Text>Số người:</Text>
                                <View style={styles.inputContainer}>
                                    <TextInput style={styles.inputs}
                                        placeholder="số người"
                                        keyboardType="number-pad"
                                        underlineColorAndroid='transparent'
                                        placeholderTextColor='#C8C1BF'
                                        require
                                        onChangeText={text => onChangeTextSoNguoi(text)}
                                    />
                                </View>
                            </View>
                            {eRorrsText ? <Text style={{ color: 'red', fontStyle: 'italic', marginBottom: 5 }}>Số người phải lớn hơn 0</Text> : <View />}
                            <View style={{ marginBottom: 10 }}>
                            <Text >Điểm đến:</Text>
                            <View>
                            <SearchableDropdown
                                placeholderTextColor="red"
                                // multi={true}
                                items={listDiemDen}
                                containerStyle={{ marginLeft: 5, width: '100%' }}
                                itemStyle={{
                                    padding: 5,
                                    marginTop: 5,
                                    color: 'black',
                                    backgroundColor: '#ddd',
                                    borderColor: '#bbb',
                                    borderWidth: 1,
                                    borderRadius: 5,
                                }}
                                selectedItems={selectedListitem}
                                onItemSelect={(item) => {
                                    // const items = selectedListitem;
                                    // items.push(item)
                                    setselectedListitem(item);
                                    seteRorrsDiemden(false);
                                }}
                                onRemoveItem={(item, index) => {
                                    setselectedListitem([]);
                                }}
                                
                                itemTextStyle={{ color: '#555'}}
                                itemsContainerStyle={{ maxHeight: 150, }}
                                resetValue={false}
                                textInputProps={
                                    {
                                        placeholder: "Chọn điểm đến...",
                                        underlineColorAndroid: "transparent",
                                        style: {
                                            height: 30,
                                            paddingLeft: 5,
                                            color: '#000',
                                            borderWidth: 1,
                                            fontStyle: 'italic',
                                            //   backgroundColor: 'red',
                                            borderColor: 'black',
                                            borderRadius: 5,
                                        },
                                        //   onTextChange: text => alert(text)
                                    }
                                }
                                
                                listProps={
                                    {
                                        nestedScrollEnabled: false,
                                        style:{
                                            color:'red'
                                        }
                                    }
                                }
                                resetValue={false}
                            />
                            {eRorrsDiemden ? <Text style={{ color: 'red', fontStyle: 'italic', marginBottom: 5 }}>Xác định điểm đến cho tài xế</Text> : <View />}
                            </View>
                        </View>
                            <View style={{ flexDirection: 'row' , justifyContent:'space-between'}}>
                                <View >
                                    <TouchableHighlight
                                        style={[styles.buttonContainer, styles.buttonCancel]}
                                        onPress={() => setModalVisible(!modalVisible)}
                                    >
                                        <Text style={styles.loginText}>Thoát</Text>
                                    </TouchableHighlight>
                                </View>
                                <View >
                                    <TouchableHighlight
                                        style={[styles.buttonContainer, styles.checkoutButton]}
                                        onPress={() => conFirmQR()}
                                    >
                                        <Text style={styles.loginText}>Xác nhận</Text>
                                    </TouchableHighlight>
                                </View>
                            </View>
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </Modal>

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
                                        onPress={() => { setModalVisible(true); setxe_qua_canh(1); }}
                                    >
                                        <Text style={styles.loginText}>Xe quá cảnh</Text>
                                    </TouchableHighlight>
                                </View>
                                <View style={{ width: '10%' }} />
                                <View style={{ width: '30%' }}>
                                    <TouchableHighlight
                                        style={[styles.buttonContainer, styles.checkoutButton]}
                                        onPress={() => { setxe_qua_canh(0); setModalVisible(true) }}
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
                <View />

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