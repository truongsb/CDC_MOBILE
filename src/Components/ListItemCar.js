import React, { useState, useEffect } from 'react'
import { ActivityIndicator, Alert, StyleSheet, View, Text, ScrollView, RefreshControl } from 'react-native';
import { ListItem, Divider, Button } from 'react-native-elements'
import { VanTaiService } from '../Api/vantan';
import moment from "moment";

export default function ListItemCar({ dataLogin, valueSearch }) {
    const [refresh, setrefresh] = useState(true);
    const [isLoadding, setisLoadding] = useState(false);
    const [listXe, setlistXe] = useState('');
    const [listXeFillter, setlistXeFillter] = useState('');
    const btnConFirmClick = (e, id, name) => {
        createThreeButtonAlert(name);
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
        if (dataLogin != null && refresh) {
            setisLoadding(true);
            VanTaiService.getDsVanTai(dataLogin.username, dataLogin.ma_diem_den).then((res) => {
                if (res.success && res.data != null) {
                    console.log(res.data);
                    convertDataDisplay(res.data);
                }
                else {
                    alert(res.message);
                }
                setrefresh(false);
                setisLoadding(false);

            });
        }
    }, [refresh])

    useEffect(() => {
        if (valueSearch != null && valueSearch != '' && listXe.length > 0) {
            var listfillter = listXe.filter(key => key.bien_so.indexOf(valueSearch) > -1);
            setlistXeFillter(listfillter);
        }
        else {
            setlistXeFillter(listXe);
        }
    }, [valueSearch])
    const createThreeButtonAlert = (name) => {
        Alert.alert(
            name,
            'Xác nhận Xe đã đến địa điểm này',
            [
                {
                    text: "Không",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                },
                { text: "CÓ", onPress: () => console.log("OK Pressed"), style: "ok" }
            ]
        )
    };
    return (
        <View style={styles.container}>
            {!isLoadding ?
                <ScrollView
                    style={styles.scrollView}
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
                                        <View style={styles.bottonConFirm}>
                                            {dataLogin?.is_checkin &&
                                                <View>
                                                    {!item.is_checked ?
                                                        <Button
                                                            title="Checkin"
                                                            onPress={(event => btnConFirmClick(event, item.ma_to_khai_van_tai, item.bien_so))}
                                                            name={item.bien_so}
                                                            color="white"
                                                        />
                                                        :
                                                        <Text>Đã Checkin</Text>
                                                    }
                                                </View>
                                            }
                                            {dataLogin?.is_checkout &&
                                                <View>
                                                    {!item.is_checked ?
                                                        <Button
                                                            title="Checkout"
                                                            onPress={(event => btnConFirmClick(event, item.ma_to_khai_van_tai, item.bien_so))}
                                                            name={item.bien_so}
                                                            color="white"
                                                        />
                                                        :
                                                        <Text>Đã Checkout</Text>
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
    bottonConFirm: {
        backgroundColor: "#00b32d",
        color: 'red'
    },
    scrollView: {
        marginHorizontal: 20,
        
    },
});