import React, { useState,useEffect } from "react";
import {
    StyleSheet, Text, View, TextInput, ActivityIndicator, TouchableHighlight, Image, Dimensions, TouchableWithoutFeedback, Keyboard, Platform, KeyboardAvoidingView, Alert
} from 'react-native';
import { VanTaiService } from "../Api/vantan";
import { useDispatch ,useSelector} from "react-redux";
import { loginSuccess, setInfoLogin } from "../redux/actions";
import { CheckBox } from 'react-native-elements'
import { userService } from "../Api/user";
import AsyncStorage from '@react-native-async-storage/async-storage';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

const windowWidth = Dimensions.get('window').width;

export default function LoginScreen({  }) {
    const [isLoadding, setisLoadding] = useState(false);
    const [loginFail, setloginFail] = useState(false);
    const [so_dien_thoai, setso_dien_thoai] = useState('');
    const [userName, setUsername] = useState('');
    const [passWord, setPassWord] = useState('')
    const [checkedMemouUserPW, setCheckedMemouUserPW] = useState(false);
    const dispatch = useDispatch();
    const isLoginSuccess = useSelector(state => state.login);

    useEffect(() => {
        AsyncStorage.getItem('UserCDC',(err, result) => {
            if(result){
                var rs =  JSON.parse(result);
                setUsername(rs?.username? rs.username: '');
                setPassWord(rs?.password? rs.password: '');
            }
        })
    }, [])
    
    const OnSdtChange = (e) => {
        setso_dien_thoai(e);
        if (e === '') {
            setloginFail(false);
        }
    }
    const onClickListener = () => {
        if (userName === '' && passWord === '') {
            setloginFail(true);
        }
        else {
            setisLoadding(true);
            userService.login(userName, passWord).then((res) => {
                setisLoadding(false);
                if (res.success && res.data != null) {
                    if(res.data.is_chot)
                    {
                        dispatch(loginSuccess());
                        dispatch(setInfoLogin(res.data))
                        //luu username va password n???u ghi nh??? ????ng nh???p
                        let info = {
                            username: userName,
                            password: passWord
                        }
                        // console.log('checkedMemouUserPW',checkedMemouUserPW);
                        if(checkedMemouUserPW)
                        {
                            AsyncStorage.setItem('UserCDC', JSON.stringify(info));
                        }
                        else{
                            AsyncStorage.removeItem('UserCDC', (err, result) => {
                                // console.log('rsremove',result);
                            })
                        }
                       
                    }
                    else if(!res.success)
                    {
                        setloginFail(true);
                    }
                    else
                    {
                        Alert.alert('Th??ng b??o','B???n kh??ng c?? quy???n truy c???p')
                    }
                    
                   
                }
                else {
                    setloginFail(true);
                    //LoginClick(false, dataset)
                }

            });
        }
    }

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === "ios" ? "padding" : "height"}
            style={styles.container}
        >
            <TouchableWithoutFeedback onPress={() =>Keyboard.dismiss() }>
                <View style={styles.container} >
                    <View style={styles.tenapp}>
                        <Text style={styles.texttenapp}>KI???M D???CH B??NH PH?????C</Text>
                    </View>
                    <View style={styles.logo}>
                        <Image
                            source={require('../../public/logo.png')}
                            style={styles.ImageIconStyle}
                            
                        />
                    </View>
                    <Text>T??i kho???n: </Text>

                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Nh???p t??i kho???n"
                            value={userName}
                            underlineColorAndroid='transparent'
                            onChangeText={(text) => setUsername(text)}/>

                    </View>
                    <Text>M???t kh???u: </Text>
                    <View style={styles.inputContainer}>
                        <TextInput style={styles.inputs}
                            placeholder="Nh???p m???t kh???u"
                            underlineColorAndroid='transparent'
                            value={passWord}
                            secureTextEntry={true}
                            onChangeText={(text) => setPassWord(text)} />
                    </View>
                    <CheckBox
                        title='Ghi nh??? ????ng nh???p'
                        onPress={() => setCheckedMemouUserPW(!checkedMemouUserPW)}
                        containerStyle={{ backgroundColor: '#DCDCDC' }}
                        checked={checkedMemouUserPW}
                    />
                    <View >
                        {loginFail && <Text style={styles.loginFail}>T??i kho???n kh??ng ????ng</Text>}
                    </View>
                    {!isLoadding ?
                        <TouchableHighlight style={[styles.buttonContainer, styles.loginButton]} onPress={() => onClickListener()}>
                            <Text style={styles.loginText}>????ng nh???p</Text>
                        </TouchableHighlight>
                        : <ActivityIndicator size="small" color="#0000ff" />}
                    <Text style={styles.textVNPT}>@TTCNTT-VNPT BPC</Text>
                </View>
            </TouchableWithoutFeedback>
        </KeyboardAvoidingView>
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
        height: 200,
        resizeMode:'contain'
    },
    logo: {
        alignItems: 'center',
        backgroundColor: 'transparent',
        width: '70%',
        // padding,
        marginBottom: '10%'
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
        paddingBottom: 50,
    },
    texttenapp: {
        fontWeight: 'bold',
        fontSize: 25
    }
});