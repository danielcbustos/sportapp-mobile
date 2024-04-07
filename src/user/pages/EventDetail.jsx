import React from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
export const EventDetail = ({ navigation }) => {
    return (
        <View style={[GlobalStyles.sportApp, GlobalStyles.container]}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <ImageBackground
                style={styles.dog21Icon}
                source={{ uri: "https://www.verywellfit.com/thmb/5g7mfKihpixyGsPXHh8AojylmWs=/750x0/filters:no_upscale():max_bytes(150000):strip_icc():format(webp)/4688722-GettyImages-950806258-06e1e050ab184f3694fd96017c9a42ee.jpg" }}
            />
            <Button
                style={styles.btnLarge}
                labelStyle={GlobalStyles.btnLayerStyle}
                contentStyle={GlobalStyles.btnLarge1}

            >
                Reservar
            </Button>

        </View>
    )
}
const styles = StyleSheet.create({

    btnLarge: {
        marginTop: 30
    },
    dog21Icon: {

        width: 350,
        height: 350,

    },
    icon: {
        fontSize: 42,
        color: '#EA9354',
    },


});
