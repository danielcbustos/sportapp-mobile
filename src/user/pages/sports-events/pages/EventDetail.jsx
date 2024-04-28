import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { GlobalStyles } from '../../../../styles/GlobalStyles'
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import { useCityByUser } from '../../../hooks/useCityById';
import { Spineer } from '../../../../utils/Spineer';
import { useSuscribeEvents } from '../hooks/useSuscribeEvents';
import { selectUserId } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const EventDetail = ({ navigation, route }) => {
    const userId = (useSelector(selectUserId));
    const { eventDetails, eventDate } = route.params;
    const { cityName, loading, fetchCity } = useCityByUser();
    const { suscribeEvent, eventSuscription } = useSuscribeEvents(navigation);
    const event = {
        productId: eventDetails.productId,
        name: eventDetails.name,
        categoryId: eventDetails.category.id,
        categoryName: eventDetails.category.name,
        userId: userId,
        planId: eventDetails.plan.id,
        planName: eventDetails.plan.name,
        startDateTime: eventDetails.startDateTime,
        endDateTime: eventDetails.endDateTime
    };

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
            <ScrollView>
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
                    onPress={() => {
                        suscribeEvent(event);

                    }}
                >
                    Reservar
                </Button>
            </ScrollView>
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
