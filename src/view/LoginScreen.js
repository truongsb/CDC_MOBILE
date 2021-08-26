import React, { useState } from "react";
import {StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableHighlight, Image, Dimensions,TouchableWithoutFeedback ,Keyboard
} from 'react-native';
import {VanTaiService} from "../Api/vantan";
import { useDispatch } from "react-redux";
import { loginSuccess, setInfoLogin } from "../redux/actions";

const windowWidth = Dimensions.get('window').width;

export default function LoginScreen({ LoginClick,navigation }) {
    const [isLoadding, setisLoadding] = useState(false);
    const [loginFail, setloginFail] = useState(false);
    const [so_dien_thoai, setso_dien_thoai] = useState('');
    const dispatch = useDispatch();     
    const OnSdtChange = (e) => {
        setso_dien_thoai(e);
        if(e==='')
        {
            setloginFail(false);
        }
    }
    const onClickListener = () => {
        if (so_dien_thoai.length === 10) {
            setisLoadding(true);
            VanTaiService.loginBySdt(so_dien_thoai).then((res) => {
                setisLoadding(false);
                if (res.success && res.data != null) {
                    var dataset = { ...res.data, so_dien_thoai };
                    //LoginClick(true, res.data)
                    dispatch(loginSuccess());
                    dispatch(setInfoLogin(dataset))
                }
                else {
                    setloginFail(true);
                    //LoginClick(false, dataset)
                }
                
            });
        }
    }

    return (
        <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <View style={styles.container} >
            <View style={styles.tenapp}>
                <Text style={styles.texttenapp}>KIỂM DỊCH BÌNH PHƯỚC</Text>
            </View>
            <View style={styles.logo}>
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
                    onChangeText={OnSdtChange} />
            </View>
            <View >
                {loginFail && <Text style ={styles.loginFail}>Tài khoản không đúng</Text>}
            </View>
            {!isLoadding ?
                <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener()}>
                    <Text style={styles.loginText}>Đăng nhập</Text>
                </TouchableHighlight>
                : <ActivityIndicator size="small" color="#0000ff" />}
            <Text style = {styles.textVNPT}>@TTCNTT-VNPT BPC</Text>
        </View>
        </TouchableWithoutFeedback>
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
        width: '110%',
        height: 200
    },
    logo: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '70%',
        // padding,
        marginBottom:'10%'
    },
    textVNPT: {
        fontWeight: 'bold',
    },
    loginFail: {
        fontWeight: 'bold',
        color: 'red',
        marginBottom: '10%'
    },
    tenapp: {
        paddingBottom:50,
    },
    texttenapp: {
        fontWeight: 'bold',
        fontSize: 25
    }
});