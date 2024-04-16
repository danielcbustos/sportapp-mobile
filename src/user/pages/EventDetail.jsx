import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import { GlobalStyles } from '../../styles/GlobalStyles'
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';
import { Text as CardText } from 'react-native-paper';
import { Card } from 'react-native-paper';
import { useCityByUser } from '../hooks/useCityById';
import { Spineer } from '../../utils/Spineer';


export const EventDetail = ({ navigation, route }) => {
    const { eventDetails, eventDate } = route.params;
    const { cityName, loading, fetchCity } = useCityByUser();

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedTime = hours + ':' + minutes + ' ' + ampm;
        return formattedTime;
    };

    const eventHour = formatTime(eventDetails.startDateTime);

    useEffect(() => {
        fetchCity(eventDetails.cityId);
    }, []);

    return (
        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>

            <Card style={[GlobalStyles.card, { marginTop: 15 }]}>
                <Card.Cover style={{ height: 320 }} source={{ uri: eventDetails.picture }} />
            </Card>

            <Spineer isLoading={loading} />
            {!loading && (
                <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '95%' }}>

                    <Text style={styles.eventName}>{eventDetails.name}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                        <Icon name="map" style={styles.icon} />
                        <Text style={styles.smLetters}>{cityName[0].name}  </Text>
                    </View>

                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                        <Icon name="timer" style={styles.icon} />
                        <Text style={styles.smLetters}>{eventDate} - {eventHour}</Text>
                    </View>

                    <Text style={styles.descripcion}>Descripción</Text>
                    <Text style={styles.smLetters}>{eventDetails.description}</Text>
                </View>
            )}
            <Button
                style={styles.btnLarge}
                labelStyle={GlobalStyles.btnLayerStyle}
                contentStyle={GlobalStyles.btnLarge1}
                onPress={() => navigation.navigate('UserReservations')}
            >
                Reservar
            </Button>

        </View>
    )
}
const styles = StyleSheet.create({

    btnLarge: {
        marginTop: 40
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
        marginTop: 30
    },
    descripcion: {
        fontSize: 20,
        fontWeight: "600",
        color: '#000000',
        marginTop: 20
    },


});
