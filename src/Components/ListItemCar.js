import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert, StyleSheet, View, Text, ScrollView, RefreshControl, TouchableHighlight } from 'react-native';
import { ListItem, Divider, Button } from 'react-native-elements'
import { VanTaiService } from '../Api/vantan';
import moment from "moment";
import { useSelector } from 'react-redux';
import { SearchBar } from "react-native-elements";
const confirmrs = (top, nd) => {
    Alert.alert(
        top,
        nd,
        [
            { text: 'OK' },
        ]
    )
}
export default function ListItemCar() {
    const [refresh, setrefresh] = useState(true);
    const [isLoadding, setisLoadding] = useState(false);
    //const [listXe, setlistXe] = useState('');
    const [listXe, setlistXe] = useState([{ ho_ten: 'Nguyen Dai Ca', bien_so: '50A67795' },{ ho_ten: 'Nguyen Dai Ca', bien_so: '50A67796' }]);
    const [listXeFillter, setlistXeFillter] = useState('');
    const dataLogin = useSelector(state => state.infoLogin);
    const [valueSearch, setvalueSearch] = useState('');
    
    const onSearchChange = (e) => {
        setvalueSearch(e)
    }
    const onRefresh = React.useCallback(() => {
        setrefresh(true);
    }, []);
    const convertDataDisplay = (data) => {
        if (data.length > 0) {
            data.map(item => {
                item.thoi_gian_khai_bao = moment(item.thoi_gian_khai_bao).format('DD/MM/YYYY HH:mm:ss');
                item.thoi_gian_checkin = moment(item.thoi_gian_checkin).format('DD/MM HH:mm');
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
                console.log(res.data);
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
    
    return (
        <View style={styles.container}>
            <SearchBar
                placeholder="Nhập 5 số cuối biển số để tìm kiếm...."
                onChangeText={onSearchChange}
                onCancel={onSearchChange}
                value={valueSearch}
                containerStyle={{
                    backgroundColor:'#fff',
                    borderBottomColor:'#fff',
                    borderTopColor:'#fff'
                }}
            />
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
                                    <ListItem 
                                        bottomDivider 
                                        containerStyle={{
                                            borderRadius:8, 
                                            borderColor:'#046ECE', 
                                            marginBottom:8, 
                                            borderWidth:1,
                                            borderBottomColor:'#046ECE',
                                            borderBottomWidth:2
                                        }} 
                                        key={key}
                                    >
                                        <ListItem.Content>
                                            <ListItem.Title style={styles.text}>{item.bien_so}</ListItem.Title>
                                            <ListItem.Subtitle>Tên: <Text style={styles.textHoten}>{item.ho_ten}</Text></ListItem.Subtitle>
                                            <ListItem.Subtitle>Giờ vào: <Text style={styles.textTime}>{item.thoi_gian_khai_bao}</Text></ListItem.Subtitle>
                                            <ListItem.Subtitle>Tại chốt: {item.noi_khai_bao_van_tai}</ListItem.Subtitle>
                                        </ListItem.Content>
                                    </ListItem>
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
    textHoten: {
        fontWeight: 'bold',
        color: 'black'
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
    textoutin: {
        justifyContent: 'center',
        alignItems: 'center',
    },

    outin: {
        borderRadius: 15,
        color: 'black',
        fontWeight: 'bold',
        backgroundColor: '#c2c2d6',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 5,
        padding: 5
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