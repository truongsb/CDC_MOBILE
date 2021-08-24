import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert, StyleSheet, View, Text, ScrollView, RefreshControl, TouchableHighlight } from 'react-native';
import { ListItem, Divider, Button } from 'react-native-elements'
import { VanTaiService } from '../Api/vantan';
import moment from "moment";
const confirmrs = (top, nd) => {
    Alert.alert(
        top,
        nd,
        [
            { text: 'OK' },
        ]
    )
}
export default function ListItemCar({ dataUser, valueSearch }) {
    const [refresh, setrefresh] = useState(true);
    const [isLoadding, setisLoadding] = useState(false);
    const [listXe, setlistXe] = useState('');
    const [listXeFillter, setlistXeFillter] = useState('');
    const [dataLogin, setdataLogin] = useState(dataUser);

    useEffect(() => {
        setdataLogin(dataUser);
    }, [dataUser]);
    const btnConFirmClick = (e, id, name) => {
        createThreeButtonAlert(e, id, name);

    }
    const onRefresh = React.useCallback(() => {
        setrefresh(true);
    }, []);
    const convertDataDisplay = (data) => {
        if (data.length > 0) {
            data.map(item => {
                item.thoi_gian_khai_bao = moment(item.thoi_gian_khai_bao).format('DD/MM/YYYY HH:mm:ss');
            })
            setlistXe(data);
            setlistXeFillter(data);
        }
        else {
            setlistXe({});
            setlistXeFillter({});
        }
    }
    useEffect(() => {
        if (dataLogin != null && refresh && dataLogin.username != "") {
            setisLoadding(true);
            VanTaiService.getDsVanTai(dataLogin.username, dataLogin.ma_diem_den).then((res) => {
                if (res.success && res.data != null) {
                    convertDataDisplay(res.data);
                    console.log(res.data);
                }
                else {
                    alert(res.message);
                }
                setrefresh(false);
                setisLoadding(false);

            });
        }
    }, [refresh, dataLogin]);

    useEffect(() => {
        if (valueSearch != null && valueSearch != '' && listXe.length > 0) {
            var listfillter = listXe.filter(key => key.bien_so.indexOf(valueSearch) > -1);
            setlistXeFillter(listfillter);
        }
        else {
            setlistXeFillter(listXe);
        }
    }, [valueSearch])
    const createThreeButtonAlert = (e, id, name) => {
        Alert.alert(
            'Xác nhận ' + e + ' cho xe\n' + name + ' ?',
            '',
            [
                {
                    text: "Không",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "CÓ", onPress: () => { if (e === 'checkin') checkin(id); else checkoutTinh(id); }, style: "ok" }
            ]
        )
    };
    const checkoutTinh = (id) => {
        VanTaiService.checkOutVanTai(id, dataLogin.ma_nhan_vien_check).then((res) => {
            if (res.success) {
                Alert.alert(
                    'Thông báo',
                    'Checkout thành công!',
                    [
                        { text: 'Xong', onPress: () => { onRefresh(); } }
                    ]
                )
            }
            else {

            }
        });
    }
    const checkin = (id) => {
        VanTaiService.checkInVanTai(id, dataLogin.ma_diem_den, dataLogin.ma_nhan_vien_check).then((res) => {
            if (res.success) {
                Alert.alert(
                    'Thông báo',
                    'Checkin thành công!',
                    [
                        { text: 'Xong', onPress: () => { onRefresh(); } }
                    ]
                )
            } else {
                //   confirmrs("Lỗi check in!", "")
            }
        });
    }

    return (
        <View style={styles.container}>
            {!isLoadding ?
                <ScrollView
                    // style={styles.scrollView}
                    contentContainerStyle={styles.scrollView}
                    refreshControl={
                        <RefreshControl
                            refreshing={refresh}
                            onRefresh={onRefresh}
                        />
                    }
                >
                    {
                        !(listXeFillter.length > 0) ? <Text style={styles.text}>Không có dữ liệu!</Text> :
                            listXeFillter.map((item, key) => (
                                <View key={key}>
                                    <Divider
                                        style={{ width: "100%" }}
                                        color="#f0f0f5"
                                        insetType="left"
                                        subHeaderStyle={{}}
                                        width={10}
                                        orientation="horizontal"
                                    />
                                    <ListItem bottomDivider>
                                        <ListItem.Content>
                                            <ListItem.Title style={styles.text}>{item.bien_so}</ListItem.Title>
                                            <ListItem.Subtitle>Tên: <Text style={styles.textTime}>{item.ho_ten}</Text></ListItem.Subtitle>
                                            <ListItem.Subtitle>Giờ vào: <Text style={styles.textTime}>{item.thoi_gian_khai_bao}</Text></ListItem.Subtitle>
                                            <ListItem.Subtitle>Tại chốt: {item.noi_khai_bao_van_tai}</ListItem.Subtitle>
                                        </ListItem.Content>
                                        <View>
                                            { !(item.is_checkout ) &&dataLogin?.is_checkin &&
                                                <View >
                                                    {!item.is_checked ?
                                                        <TouchableHighlight
                                                            style={[styles.buttonContainer, styles.checkinButton]}
                                                            onPress={() => { btnConFirmClick("checkin", item.ma_to_khai_van_tai, item.bien_so,) }}>
                                                            <Text style={styles.loginText}>Checkin</Text>
                                                        </TouchableHighlight>
                                                        :
                                                        <Text style={styles.outin}>Đã Checkin</Text>
                                                    }
                                                </View>
                                            }
                                            {dataLogin?.is_checkout &&
                                                <View>
                                                    {!item.is_checkout ?
                                                         <TouchableHighlight
                                                         style={[styles.buttonContainer, styles.checkoutButton]}
                                                         onPress={() => { btnConFirmClick("checkout", item.ma_to_khai_van_tai, item.bien_so,) }}>
                                                         <Text style={styles.loginText}>Checkout</Text>
                                                     </TouchableHighlight>
                                                        :
                                                        <View>
                                                        <Text style={styles.outin}>Đã ra khỏi tỉnh</Text></View>
                                                    }
                                                </View>}
                                        </View>
                                    </ListItem>
                                </View>
                            ))

                    }
                </ScrollView>
                : <ActivityIndicator size="small" color="#0000ff" />}
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f0f0f5',
    },
    text: {
        textAlign: 'center',
        color: 'red',
        fontWeight: 'bold'
    },
    textTime: {
        fontWeight: 'bold'
    },
    scrollView: {
        marginHorizontal: 20,
    },
    buttonCheck: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        color: 'white',
        borderRadius: 30,
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
    },
    textoutin:{
        justifyContent: 'center',
        alignItems: 'center',
    },
    outin: {

        height: 30,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: '#c2c2d6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
    },
    buttonContainer: {
        height: 35,

        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 15,
    },
    checkinButton: {
        backgroundColor: "#00b33c",
        width: 100
    },
    checkoutButton: {
        backgroundColor: "#b32400",
        width: 100
    },
    buttonCheckout: {
        height: 35,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        borderRadius: 15,
    },


});