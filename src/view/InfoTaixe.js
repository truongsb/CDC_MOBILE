import React, {useEffect , useState} from 'react'
import { Text, TouchableOpacity, Image, StyleSheet, View, Alert, TouchableWithoutFeedback, Keyboard, TouchableHighlight, ActivityIndicator, TextInput } from 'react-native';
import SearchableDropdown from 'react-native-searchable-dropdown';
import { VanTaiService } from '../Api/vantan';
export default function InfoTaixe({route, navigation }) {
    const {id_url_qr} = route.params;
    const [thongTinTaiXe, setThongTinTaiXe] = useState([])
    useEffect(() => {
        if(id_url_qr)
        {
            let id = id_url_qr.substring(id_url_qr.lastIndexOf("token=")+6);
            VanTaiService.getQrLuongXanh(id).then((res) => {
                if(res && res.regInfo && res.regInfo.status)
                {
                    console.log(res.regInfo.regDrivers);
                    let rs = res.regInfo.regDrivers;
                    console.log(rs.length);
                }
            });
        }
    }, [id_url_qr])
    return (
        <View>
            
        </View>
    )
}
