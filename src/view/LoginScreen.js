import React, { useState } from "react";
import {
    StyleSheet,
    Text,
    View,
    TextInput,
    ActivityIndicator,
    TouchableHighlight,
    Image,
    Alert,
    Dimensions
} from 'react-native';
import {VanTaiService} from "../Api/vantan"
const windowWidth = Dimensions.get('window').width;
export default function LoginScreen({ LoginClick }) {
    const [isLoadding, setisLoadding] = useState(false);
    const [so_dien_thoai, setso_dien_thoai] = useState('')
    const OnSdtChange = (e) => {
        setso_dien_thoai(e);
    }
    const onClickListener = () => {
        if (so_dien_thoai.length === 10) {
            setisLoadding(true);
            VanTaiService.loginBySdt(so_dien_thoai).then((res) => {
                setisLoadding(false);
                if (res.success && res.data != null) {
                    var dataset = { ...res.data, so_dien_thoai };
                    LoginClick(true, res.data)
                }
                else {
                    
                    LoginClick(false, dataset)
                }
                
            });
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.qrcode}>
                <Image
                    source={require('../../public/logo.png')}
                    style={styles.ImageIconStyle}
                />
            </View>
            <View style={styles.inputContainer}>
                <TextInput style={styles.inputs}
                    placeholder="Nhập số điện thoại"
                    keyboardType="number-pad"
                    underlineColorAndroid='transparent'
                    defaultValue='088800483'
                    onChangeText={OnSdtChange} />
            </View>
            {!isLoadding ?
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener()}>
                    <Text style={styles.loginText}>Đăng nhập</Text>
                </TouchableHighlight>
                : <ActivityIndicator size="small" color="#0000ff" />}
            <Text style = {styles.textVNPT}>@VNPT</Text>
        </View>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        width: windowWidth,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#DCDCDC',
    },
    inputContainer: {
        borderBottomColor: '#F5FCFF',
        backgroundColor: '#FFFFFF',
        borderRadius: 30,
        borderBottomWidth: 1,
        width: '80%',
        height: 45,
        fontWeight: "bold",
        marginBottom: 20,
        flexDirection: 'row',
        alignItems: 'center'
    },
    inputs: {
        height: 45,
        marginLeft: 16,
        borderBottomColor: '#FFFFFF',
        flex: 1,
        textAlign: 'center',
    },
    buttonContainer: {
        height: 45,
        flexDirection: 'row',
        justifyContent: 'center',
        alignItems: 'center',
        marginBottom: 20,
        width: 250,
        borderRadius: 30,
    },
    loginButton: {
        backgroundColor: "#00b5ec",
    },
    loginText: {
        color: 'white',
        fontWeight: 'bold',
    },
    ImageIconStyle:
    {
        alignItems: 'center',
        width: '100%',
        height: 150
    },
    qrcode: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '60%',
        marginBottom:'10%'
    },
    textVNPT: {
        fontWeight: 'bold',
    },
});