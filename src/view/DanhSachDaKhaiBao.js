import React, { useEffect, useState } from 'react'
import { Text, TouchableOpacity, Image, StyleSheet, View, Alert, TouchableWithoutFeedback, Keyboard, TouchableHighlight, ActivityIndicator, TextInput } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { VanTaiService } from '../Api/vantan';
import { useSelector } from 'react-redux';
import ListItemCar from '../Components/ListItemCar';

export default function DanhSachDaKhaiBao() {
    return (
        <View>
            <ListItemCar/>
        </View>
    )
}
