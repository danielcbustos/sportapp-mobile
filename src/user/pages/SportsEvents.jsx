import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserName } from '../helpers/userSelectors';
import { useSportEvents } from '../hooks/useSportsEvents';
import { Text as CardText } from 'react-native-paper';
import { Card } from 'react-native-paper';
import { Spineer } from '../../utils/Spineer';
import { AlertNotification } from '../../utils/AlertNotification';


export const SportsEvents = ({ navigation, route }) => {
    const userId = useSelector(selectUserId);
    const { selectedDate, formattedDate } = route.params;
    const { eventsByUser, loadEvents, errorInEvents, getEvents } = useSportEvents(userId);
    const [isLoading, setIsLoading] = useState(true);
    const { showDialogError } = AlertNotification();

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
            if (eventsByUser.length === 0) {
                showDialogError(
                    '¡Aviso importante!',
                    'No hay eventos deportivos disponibles para este día.'
                );
            }
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
                    <Text style={styles.avisoTexto}>Por favor elige otra fecha</Text>

                </View>
            )}
            {!isLoading && (
                <ScrollView>
                    {eventsByUser.map(item => (
                        <TouchableOpacity key={item.id} onPress={() => navigation.navigate('EventDetail', { eventDetails: item, eventDate })} >
                            <Card accessibilityLabel="event" style={GlobalStyles.card}>
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
