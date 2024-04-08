import React from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';
import { Text as CardText } from 'react-native-paper';
import { Card } from 'react-native-paper';


export const EventDetail = ({ navigation, route }) => {
    const { eventDetails, eventDate } = route.params;

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12; // El reloj de 12 horas muestra "12" en lugar de "0"
        minutes = minutes < 10 ? '0' + minutes : minutes; // Asegurarse de que los minutos siempre tengan dos dígitos
        const formattedTime = hours + ':' + minutes + ' ' + ampm;
        return formattedTime;
    };
    const eventHour = formatTime(eventDetails.starDateTime);


    return (
        <View style={[GlobalStyles.sportApp, GlobalStyles.container]}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Card style={[GlobalStyles.card, { marginTop: 15 }]}>
                <Card.Cover style={{ height: 320 }} source={{ uri: eventDetails.picture }} />
            </Card>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '95%' }}>

                <Text style={styles.eventName}>{eventDetails.name}</Text>
                <Text style={styles.smLetters}>Ciudad</Text>
                <Text style={styles.smLetters}>{eventDate} - {eventHour}</Text>
                <Text style={styles.descripcion}>Descripción</Text>
                <Text style={styles.smLetters}>{eventDetails.description}</Text>
            </View>

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
        marginTop: 60
    },
    iconEvent: {

        width: 320,
        height: 320,

    },
    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    smLetters: {
        color: '#000000',
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 24,
        marginTop: 5

    },
    eventName: {
        fontSize: 24,
        fontWeight: "600",
        color: '#000000',
        marginTop: 20
    },
    descripcion: {
        fontSize: 20,
        fontWeight: "600",
        color: '#000000',
        marginTop: 15
    },


});
