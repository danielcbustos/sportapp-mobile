import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserName } from '../helpers/userSelectors';
import { useSportEvents, useSportsEvents } from '../hooks/useSportsEvents';
// import eventsByUser from '../helpers/eventsByUser';
import { Text as CardText } from 'react-native-paper';
import { Card } from 'react-native-paper';
import Spinner from 'react-native-loading-spinner-overlay';
import { Spineer } from '../../utils/Spineer';


export const SportsEvents = ({ navigation, route }) => {
    const userId = useSelector(selectUserId);
    const { selectedDate, formattedDate } = route.params;
    const { eventsByUser, loadEvents, errorInEvents, getEvents } = useSportEvents(userId);
    const [isLoading, setIsLoading] = useState(true);

    const formattedDateTwo = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('es-ES', options);
    };



    const eventDate = formattedDateTwo(selectedDate);

    useEffect(() => {
        getEvents(formattedDate);
    }, []);

    useEffect(() => {
        if (!loadEvents) {
            setIsLoading(false);
        }
    }, [loadEvents]);



    return (

        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.eventos]}>Eventos Deportivos</Text>
            <Text style={GlobalStyles.smLetters}>Selecciona el evento deportivo en el que {'\n'}deseas participar el día</Text>
            <Text style={styles.negrilla}>{eventDate}</Text>

            <Spineer isLoading={isLoading} />
            {!isLoading && eventsByUser.length === 0 && (
                <View style={styles.aviso}>
                    <Text style={styles.avisoTexto}>No hay eventos deportivos</Text>
                    <Text style={styles.avisoTexto}>para este día</Text>
                </View>
            )}
            {!isLoading && (
                <ScrollView>
                    {eventsByUser.map(item => (
                        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('EventDetail', { eventDetails: item, eventDate })} >
                            <Card style={GlobalStyles.card}>
                                <Card.Content>
                                    <CardText style={GlobalStyles.cardText} variant="bodyMedium">{item.name}</CardText>
                                </Card.Content>
                                <Card.Cover source={{ uri: item.picture }} />
                            </Card>

                        </TouchableOpacity>


                    ))}
                </ScrollView>
            )}
        </View>

    )
}
const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    eventos: {
        marginTop: 20,
        marginBottom: 70,
        fontSize: 32,
        fontWeight: "600",
        color: '#000000',
    },
    smLetters: {
        color: '#000000',
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 24,
        textAlign: "center",
    },
    negrilla: {
        fontWeight: 'bold',
        marginTop: 5
    },
    aviso: {
        alignItems: 'center',
        marginTop: 180,
    },
    avisoTexto: {
        fontSize: 20,
        fontWeight: "600",
        color: '#000000',
    }


});
