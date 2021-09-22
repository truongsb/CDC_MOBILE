import React from 'react'
import { useDispatch } from "react-redux";
import { logout } from '../redux/actions';
import {  DrawerContentScrollView, DrawerItem, DrawerItemList } from '@react-navigation/drawer';

export default function LeftHeader(props) {
    const dispatch = useDispatch();
    return (
        <DrawerContentScrollView {...props}>
            <DrawerItemList {...props}/>
            <DrawerItem
                label="Danh sách Đã khai báo"
                onPress={() => {props.navigation.navigate('DanhSachDaKhaiBao', { name: 'DanhSachDaKhaiBao' })}}
            />
            <DrawerItem
                label="Đăng xuất"
                 onPress={() => {props.navigation.closeDrawer(); dispatch(logout())}}
            />

        </DrawerContentScrollView>
    )
}
