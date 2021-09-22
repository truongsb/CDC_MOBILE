import React from 'react';
import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import QRScreen from './QRScreen';
import LeftHeader from '../Components/LeftHeader'
import InfoTaixe from './InfoTaixe';
import DanhSachDaKhaiBao from './DanhSachDaKhaiBao';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator} from '@react-navigation/drawer';
import { useSelector } from 'react-redux';

const MainStack = createStackNavigator();
const Drawer = createDrawerNavigator();

function MainScreen() {
  return (
    <MainStack.Navigator >
      <MainStack.Screen
        name="Home"
        component={HomeScreen}
        options={{ headerShown: false, title: 'Trang chủ' }}
      />
      <MainStack.Screen name="QrSceen" component={QRScreen} options={{ title: 'Quét Mã QR' }} />
      <MainStack.Screen name="infoTaiXe" component={InfoTaixe} options={{ title: 'Thông tin tài xế' }} />
      <MainStack.Screen name="DanhSachDaKhaiBao" component={DanhSachDaKhaiBao} options={{ title: 'Danh sách đã khai báo' }} />
    </MainStack.Navigator>
  );
}

export default function Main123() {
  const isLoginSuccess = useSelector(state => state.login);
  return (
      <NavigationContainer>
        {isLoginSuccess ?
          <Drawer.Navigator drawerContent={props => <LeftHeader {...props} />}>
            <Drawer.Screen name="MainScreen"
              component={MainScreen}
              options={{ headerShown: false, title: 'Trang chủ' }}
              >
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
  );
}
