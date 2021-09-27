import React, { useEffect, useState } from 'react'
import { Text, Image, StyleSheet, View, Alert, TouchableHighlight, TextInput ,FlatList} from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { VanTaiService } from '../Api/vantan';
import { resetUrlQRXanh } from "../redux/actions";
import { useSelector, useDispatch } from 'react-redux';
import {Picker} from '@react-native-picker/picker';

const ListNhapDiemDen = ({ listDiemDen,eRorrsDiemden, onSelect, idItemView, onTextChange }) => {
    const [selecttedListItem, setselecttedListItem] = useState('');
    return (
        <View style={{ flex: 1, marginTop: 10 }}>
            <View style={{ flexDirection: 'row' ,}}>
                <Text style={styles.textview}>Điểm đến:</Text>
                <View style={{ borderColor:'#046ECE', borderWidth:1,width: '75%', borderRadius: 3, marginTop: 3}}>
                <Picker
                    style={{color:'red'}}
                    selectedValue={selecttedListItem}
                    onValueChange={(itemValue) =>{
                        onSelect(itemValue,idItemView);
                        setselecttedListItem(itemValue);
                    }
                       
                    }>
                        {
                            listDiemDen && listDiemDen.map((item,key) => {
                                return(
                                    <Picker.Item key = {key} label={item.title} value={item.id} />
                                )
                            })
                        }
                </Picker>
                </View>
            </View>
            <View>
            {eRorrsDiemden ? <Text style={{ color: 'red', fontStyle: 'italic', marginBottom: 5, }}>Xác định điểm đến cho tài xế</Text> : <View />}
            </View>
            <View>
                <Text style={styles.textview}>Điểm đến chi tiết:</Text>
                <View style={styles.field_input}>
                    <TextInput style={styles.inputs}
                        placeholder="Nhập điểm đến chi tiết"
                        keyboardType="default"
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#C8C1BF'
                        onChangeText={text => onTextChange(text, idItemView)}
                    />
                </View>
            </View>
        </View>)
}
var listNoidemSubmit = [
    {
        id: '1',
        ma_xa: "",
        noi_den: "",
        ma_huyen: ""
    }
];
export default function InfoTaixe({ route, navigation }) {
    const dispatch = useDispatch();
    const { xe_qua_canh } = route.params;
    const dataLogin = useSelector(state => state.infoLogin);
    const url_qr_xanh = useSelector(state => state.setUrlQRVanTai)
    const [eRorrsText, seteRorrsText] = useState(false);
    const [eRorrsDiemden, seteRorrsDiemden] = useState(false);
    const [listDiemDen, setlistDiemden] = useState([]);
    const [so_nguoi, setso_nguoi] = useState('');
    const [bien_so, setbien_so] = useState('');
    const [ho_ten, setho_ten] = useState('');
    const [so_dien_thoai, setso_dien_thoai] = useState('');

    const [dataView, setdataView] = useState([{
        id: '1',
    }])
    useEffect(() => {
        setso_nguoi('');
        listNoidemSubmit = [
            {
                id: '1',
                ma_xa: "",
                noi_den: "",
                ma_huyen:""
            }
        ];
    }, [])
    useEffect(() => {
        if (dataLogin.ma_huyen) {
            VanTaiService.getXaDiemDenTheoHuyen(dataLogin.ma_huyen).then((res) => {
                if (res.success && res.data != null) {
                    setlistDiemden(handleOptions(res.data));
                }
            });
        }

    }, [])

    useEffect(() => {
        if (url_qr_xanh && url_qr_xanh.loai_qr !== undefined && url_qr_xanh.loai_qr !== '') {
            if (url_qr_xanh.loai_qr === 'TKVT') {
                VanTaiService.getInfoVanTaibyId(url_qr_xanh.id_qr).then((res) => {
                    if (res.success && res.data != null) {
                        setbien_so(res.data.bien_so);
                        setho_ten(res.data.ho_ten);
                        setso_dien_thoai(res.data.so_dien_thoai);
                    }
                    else {
                        Alert.alert('Thông báo', 'Không lấy được dữ liệu tài xế');
                    }
                });
            }
            else if (url_qr_xanh.loai_qr === 'DRVN') {
                //get theo tờ khai vận tải luồng xanh
                VanTaiService.getQrLuongXanh(url_qr_xanh.id_qr).then((res) => {
                    if (res && res.regInfo && res.regInfo.regDrivers && res.regInfo.regDrivers.length > 0) {
                        setho_ten(res.regInfo.regDrivers[0].driverName ? res.regInfo.regDrivers[0].driverName : '');
                        setso_dien_thoai(res.regInfo.regDrivers[0].phoneNumber ? res.regInfo.regDrivers[0].phoneNumber : '');
                        setbien_so(res.regInfo.vehicleNumber ? res.regInfo.vehicleNumber : '');
                    }
                    else {
                        Alert.alert('Thông báo', 'Không lấy được dữ liệu tài xế');
                    }
                });
            }
        }
        else {

        }
    }, [url_qr_xanh])

    const conFirmQR = () => {
        //check so người trên xe
        if (so_nguoi !== '' && so_nguoi !== '0') {
            if (xe_qua_canh === 0) // trường hợp xe nội tỉnh,
            {
                if (listNoidemSubmit[0].ma_xa==="" || listNoidemSubmit[0].ma_xa===0) { // check đã chọn điểm đến chưa
                    seteRorrsDiemden(true);
                }
                else {
                    //gọi api xe nội tỉnh
                    //console.log(selectedListitem.id, so_nguoi, xe_qua_canh, dataLogin.token, ho_ten, so_dien_thoai, bien_so, 'setnoi_den_chi_tiet', noi_den_chi_tiet);
                    console.log(ho_ten, so_dien_thoai, bien_so, so_nguoi, dataLogin.ma_chot,listNoidemSubmit);
                    VanTaiService.importDataNoiTinh(ho_ten, so_dien_thoai, bien_so, so_nguoi, dataLogin.ma_chot,listNoidemSubmit, dataLogin.token).then((res) =>{
                        if (res.success) {
                            Alert.alert('Thông báo','Cập nhật thành công !')
                        }
                        else
                        {
                            Alert.alert('Thông báo','Cập nhật thất bại !!')
                        }
                    });
                    Alert.alert('Thông báo','Cập nhật thành công !!')
                    handleBackHome();
                }
            }
            else if (xe_qua_canh === 1) {
                handleBackHome();
                //gọi api cho xe quá cảnh
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
            else {
                Alert.alert('Thông báo', 'Không xác định được loại xe, Vui lòng thử lại QR');
            }
        }
        else if (so_nguoi == '' || so_nguoi == '0') {
            seteRorrsText(true);
        }
    }
    const handleOptions = (ds) => {
        ds.unshift({id:0,title:'Chọn điểm đến'})
        return ds;
    };
    const onChangeTextSoNguoi = (text) => {
        if (text == '' || text == '0') {
            seteRorrsText(true)
        }
        else {
            seteRorrsText(false)
        }
        setso_nguoi(text);
    }
    const handleBackHome = () => {
        dispatch(resetUrlQRXanh());
        navigation.navigate('Home', { name: 'Home' })
    }
    const onSelect = (item, id) =>{
        listNoidemSubmit[id-1].ma_xa = item;
        listNoidemSubmit[id-1].ma_huyen = dataLogin.ma_huyen;
        if(listNoidemSubmit[0].ma_xa!=="" || listNoidemSubmit[0].ma_xa!==0 )
        {
            seteRorrsDiemden(false)
        }
    }
    const onTextChange = (value, id) =>{
        listNoidemSubmit[id-1].noi_den = value;
    }
    const addDiemden = () => {
        console.log(dataLogin);
        listNoidemSubmit.push({
            id: (dataView.length + 1).toString(),
            ma_xa: "",
            noi_den: "",
            ma_huyen: ""
        })
        setdataView(dataView.concat({ id: (dataView.length + 1).toString() }))     
  
    }
    return (
        <View style={styles.container}>
            <View style={styles.view_info}>
                <Text style={styles.textview}>Tài xế:</Text>
                <View style={styles.field_input}>
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
                <Text style={styles.textview}>Số ĐT:</Text>
                <View style={styles.field_input}>
                    <TextInput style={styles.inputs}
                        placeholder="Nhập số điện thoại"
                        keyboardType="default"
                        defaultValue={so_dien_thoai}
                        underlineColorAndroid='transparent'
                        placeholderTextColor='#C8C1BF'
                        require
                        onChangeText={text => setso_dien_thoai(text)}
                    />
                </View>
                <View>
                    <Text style={styles.textview}>Biển số:</Text>
                    <View style={styles.field_input}>
                        <TextInput style={styles.inputs}
                            placeholder="Nhập biển số xe"
                            keyboardType="default"
                            defaultValue={bien_so}
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#C8C1BF'
                            require
                            onChangeText={text => setbien_so(text)}
                        />
                    </View>
                </View>
                <View>
                    <Text style={styles.textview}>Số người:</Text>
                    <View style={styles.field_input}>
                        <TextInput style={styles.inputs}
                            placeholder="Nhập số người trên xe"
                            keyboardType="number-pad"
                            defaultValue={so_nguoi}
                            underlineColorAndroid='transparent'
                            placeholderTextColor='#C8C1BF'
                            require
                            onChangeText={text => onChangeTextSoNguoi(text)}
                        />
                    </View>
                    {eRorrsText ? <Text style={{ color: 'red', fontStyle: 'italic', marginBottom: 5 }}>Số người phải lớn hơn 0</Text> : <View />}
                </View>
                {xe_qua_canh === 0 ?
                    <View style={{ flex: 1, marginTop: 10 }}>
                        <View style={{ flex: 1 }}>
                            <FlatList
                                data={dataView}
                                renderItem={({ item }) => (
                                    <ListNhapDiemDen
                                        eRorrsDiemden={eRorrsDiemden}
                                        listDiemDen={listDiemDen}
                                        onSelect={onSelect}
                                        onTextChange={onTextChange}
                                        idItemView={item.id}
                                    />
                                )}
                                keyExtractor={(item) => item.id}
                                ListFooterComponent={
                                    <View style={{ alignItems: 'center', justifyContent: 'center', marginTop: 20 }}>
                                        <TouchableHighlight
                                            style={[styles.buttonContainer, styles.buttonAddView]}
                                            onPress={() => addDiemden()}
                                            underlayColor={'#DDD'}
                                        >
                                            <View style={{ flexDirection: 'row' }}>
                                                <Image
                                                    source={require('../../public/insert.png')}
                                                    style={styles.ImageIconStyle}
                                                />
                                                <Text style={styles.textbuttonAdd}>Thêm điểm đến</Text>
                                            </View>

                                        </TouchableHighlight>
                                    </View>}
                                // extraData={selected}
                            />

                        </View >

                    </View> : <View />}
                <View style={{ alignItems: 'center', marginTop: 25 }}>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', }}>
                        <View >
                            <TouchableHighlight
                                style={[styles.buttonContainer, styles.buttonCancel]}
                                onPress={() => handleBackHome()}
                            >
                                <Text style={styles.loginText}>Quay lại</Text>
                            </TouchableHighlight>
                        </View>
                        <View >
                            <TouchableHighlight
                                style={[styles.buttonContainer, styles.checkoutButton]}
                                onPress={() => conFirmQR()}
                            >
                                <Text style={styles.loginText}>Xác nhận xe {xe_qua_canh ? "Quá cảnh" : "Nội địa"}</Text>
                            </TouchableHighlight>
                        </View>
                    </View>

                </View>
            </View>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        // justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#fff',
    },
    view_info: {
        flex: 1,
        width: '90%',
        flexDirection: 'column',
        // borderColor: 'red',
        // borderWidth:1
    },
    inputs: {
        color: 'red',
        fontWeight: 'bold',
        borderColor: 'red',
        fontSize: 16,
        // flex: 1,
        alignItems: 'flex-start',
        textAlign: 'center',
    },
    textview: {
        color: '#046ECE',
        marginTop: 5
    },
    field_input: {
        borderBottomColor: '#046ECE',
        borderBottomWidth: 1,
        textAlign: 'center',
        width: '96%'
    },
    buttonContainer: {
        height: 35,
        width: '120%',
        justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 5,
        borderRadius: 10,
    },
    buttonCancel: {
        backgroundColor: "#C8C1BF",
        width: '150%',
    },
    checkoutButton: {
        backgroundColor: "#046ECE",

    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',

    },
    ImageIconStyle:
    {
        alignItems: 'center',
        width: 30,
        height: 30,
        resizeMode: 'contain'
    },
    buttonAddView: {
        width: '50%'
    },
    textbuttonAdd: {
        marginTop: 5,
        color: 'black',
        fontWeight: 'bold',
    },

});