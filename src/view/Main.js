import React, { useState, useEffect } from 'react';
import { StyleSheet, Text, View, TouchableOpacity } from 'react-native';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import QRScreen from './QRScreen';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();


function MainScreen({ route }) {
  const { dataLogin, } = route.params;
  return (
    <MainStack.Navigator >
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, title: 'Trở về' }}
        initialParams={{ dataLogin: dataLogin }}
      />
      <MainStack.Screen name="QrSceen" component={QRScreen} options={{ title: 'Quét Mã QR' }} />
    </MainStack.Navigator>
  );
}

export default function Main123() {
  const [isLogin, setisLogin] = useState(false);
  const [dataLogin, setdataLogin] = useState({});
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
    < >
      {isLogin ?
        <NavigationContainer>
          <Drawer.Navigator initialRouteName="Home">
            <Drawer.Screen name="MainScreen"
              component={MainScreen}
              options={{ headerShown: false, title: 'Trở về' }}
              initialParams={{ dataLogin: dataLogin }} >
            </Drawer.Screen>
            {/* <Drawer.Screen
              name="LeftHeader"
              component={LeftHeader}
              options={{ headerShown: false, title: 'Đăng xuất' }}
              initialParams={{ isLogin: false }} 
             /> */}
          </Drawer.Navigator>
        </NavigationContainer>
          :
          <LoginScreen
            LoginClick={OnPressLogin}
          />}
    </>
  );
}

      const styles = StyleSheet.create({
        container: {
        flex: 1,
  },

});