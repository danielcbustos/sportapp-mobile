import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { useSelector } from 'react-redux';
import { selectUserId } from '../../../helpers/userSelectors';
import { useSportsEventsReservations } from '../hooks/useSportsEventsReservations';
import { Text as CardText } from 'react-native-paper';
import { Card } from 'react-native-paper';
import { Spineer } from '../../../../utils/Spineer';
import { AlertNotification } from '../../../../utils/AlertNotification';


export const SportsEventsReservations = ({ navigation, route }) => {
    // const { selectedDate, formattedDate } = route.params;
    const userId = (useSelector(selectUserId));
    const { eventsReservationsByUser, loadEvents, errorInEvents, getEventsReservations } = useSportsEventsReservations(userId);
    const [isLoading, setIsLoading] = useState(true);
    const { showDialogError } = AlertNotification();
    const formattedDateTwo = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('es-ES', options);
    };


    // const eventDate = formattedDateTwo(selectedDate);

    useEffect(() => {
        getEventsReservations();
    }, []);

    useEffect(() => {
        if (!loadEvents) {
            setIsLoading(false);
            if (eventsReservationsByUser.length === 0) {
                showDialogError(
                    '¡Aviso importante!',
                    'No tienes eventos deportivos Reservados aun.'
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
            <Text style={[styles.eventos, { textAlign: 'center' }]}>Reservas:{'\n'}Eventos Deportivos</Text>
            <Text style={GlobalStyles.smLetters}>Estos son los eventos deportivos en los {'\n'}que reservaste tu cupo.</Text>
            {/* <Text style={styles.negrilla}>{eventDate}</Text> */}

            <Spineer isLoading={isLoading} />
            {!isLoading && eventsReservationsByUser.length === 0 && (
                <View style={styles.aviso}>
                    <Text style={styles.avisoTexto}>Realiza tus reservas en el menú{'\n'}Servicios/EventosDeportivos</Text>

                </View>
            )}
            {!isLoading && (
                <ScrollView>
                    {eventsReservationsByUser.map(item => (
                        <TouchableOpacity key={item.productId}>
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
