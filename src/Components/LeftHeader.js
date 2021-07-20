import React, {useEffect} from 'react'
import { View, Text } from 'react-native'


export default function LeftHeader({route, navigation}) {
    const {isLogin} = route.params;
    useEffect(() => {
        
        navigation.navigate('LoginScreen')
    }, [isLogin])
    return (
        <View>
            <Text>123</Text>
        </View>
    )
}
