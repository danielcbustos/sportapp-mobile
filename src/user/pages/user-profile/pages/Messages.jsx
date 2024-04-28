import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { GlobalStyles } from '../../../../styles/GlobalStyles';

import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';



export const Messages = ({ navigation }) => {

    return (
        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={styles.aviso}>
                <Text style={styles.avisoTexto}>No tienes Mensajes nuevos</Text>

            </View>
        </View>
    )
}
const styles = StyleSheet.create({



    icon: {
        fontSize: 42,
        color: '#EA9354',
    },

    aviso: {
        alignItems: 'center',
        marginTop: 300,
    },
    avisoTexto: {
        fontSize: 20,
        fontWeight: "600",
        color: '#000000',
    }



});
