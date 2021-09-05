import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import QRScreen from './QRScreen';
import LeftHeader from '../Components/LeftHeader'
import InfoTaixe from './InfoTaixe';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();


function MainScreen({ route }) {
  const { dataLogin, } = route.params;
  return (
    <MainStack.Navigator >
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, title: 'Trang chủ' }}
        initialParams={{ dataLogin: dataLogin }}
      />
      <MainStack.Screen name="QrSceen" component={QRScreen} options={{ title: 'Quét Mã QR' }} />
      <MainStack.Screen name="infoTaiXe" component={InfoTaixe} options={{ title: 'Thong tin tai xe' }} />
    </MainStack.Navigator>
  );
}

export default function Main123() {
  const [isLogin, setisLogin] = useState(false);
  const [dataLogin, setdataLogin] = useState({});
  const isLoginSuccess = useSelector(state => state.login);
  const dtLogin = useSelector(state => state.infoLogin)
  useEffect(() => {
    if(dtLogin.ma_diem_den != "")
    {
      setdataLogin(dtLogin);
    }
  }, [dtLogin])
  const OnPressLogin = (success, data) => {
    if (success) {
      setdataLogin(data);
      setisLogin(true);
    }
    else {
      alert("Số điện thoại không đúng hoặc không có quyền đăng nhập")
      //ssetisLogin(false);
    }
  }
  return (
    <>
      <NavigationContainer>
        {isLoginSuccess ?
          <Drawer.Navigator drawerContent={props => <LeftHeader {...props} />}>
            <Drawer.Screen name="MainScreen"
              component={MainScreen}
              options={{ headerShown: false, title: 'Trở về' }}
              initialParams={{ dataLogin: dataLogin }} >
            </Drawer.Screen>
          </Drawer.Navigator>
          :
          <Drawer.Navigator initialRouteName="Login">
            <Drawer.Screen
              name="LoginScreen"
              component={LoginScreen}
            />
          </Drawer.Navigator>
        }
      </NavigationContainer>

    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },

});