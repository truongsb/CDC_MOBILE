import React, {useState, useEffect} from 'react'
import { Header, SearchBar } from "react-native-elements";
import { Text, TouchableOpacity, Image, StyleSheet, View, Alert, ScrollView } from 'react-native';
import ListItemCar from '../Components/ListItemCar';
export default function HomeScreen({route, navigation }) {
    const {dataLogin,} = route.params;
    const [valueSearch, setvalueSearch] = useState('');
    const onSearchChange = (e) => {
        setvalueSearch(e)
    }
    const OnPressLeftHeader = () =>
    {
        // alert("?")
        //navigation.navigate('LeftHeader');
        navigation.openDrawer();
       // return<LeftHeader/>
    }
    const onQRClick = () => {
        navigation.navigate('QrSceen', { name: 'QrSceen',dataLogin: dataLogin })
    }
    return (
        <View style={styles.container}>
            <Header
                leftComponent={{ icon: 'menu', color: '#fff', iconStyle: { color: '#fff' }, onPress: () => OnPressLeftHeader() }}
                centerComponent={{ text: 'KIỂM DỊCH BÌNH PHƯỚC', style: { color: '#fff' } }}
                rightComponent={{ icon: 'home', color: '#fff' }}
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
            </View>
            <SearchBar
                placeholder="Nhập 5 số cuối biển số để tìm kiếm...."
                onChangeText={onSearchChange}
                onCancel={onSearchChange}
                value={valueSearch}
            />
            {/* <NoiDung></NoiDung> */}
            <ScrollView>
                <ListItemCar
                    valueSearch = {valueSearch}
                    dataLogin ={dataLogin}
                />
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    camera: {
        flex: 1,
        justifyContent: 'flex-end',
        alignItems: 'center',
    },
    buttonContainer: {
        flex: 1,
        backgroundColor: 'transparent',
        flexDirection: 'row',
        margin: 200,
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
        alignItems:'center',
        fontSize: 20,
        fontWeight: 'bold',
        
    }
});