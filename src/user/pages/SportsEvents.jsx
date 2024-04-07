import React, { useEffect } from 'react'
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



export const SportsEvents = ({ navigation, route }) => {

    const { selectedDate, eventsByUser } = route.params;
    // const { eventsByUser, loadEvents, errorInEvents, getEvents } = useSportEvents();
    const formattedDate = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        // Ajustar la fecha sumándole un día
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('es-ES', options);
    };
    // useEffect(() => {
    //     getEvents();
    // }, []);
    // const { eventsByUser, loadEvents, errorInEvents, getEvents } =
    //     useCalendarEvents(userId, name);

    // console.log(`eventos ${eventsByUser[0].description}`)
    // const renderItem = ({ item }) => (
    //     <TouchableOpacity >
    //         <Text>{item.name}</Text>
    //     </TouchableOpacity>
    // );

    return (

        <View style={[GlobalStyles.sportApp, GlobalStyles.container]}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.eventos]}>Eventos Deportivos</Text>
            <Text style={GlobalStyles.smLetters}>Selecciona el evento deportivo en el que {'\n'}deseas participar el día</Text>
            <Text style={styles.negrilla}>{formattedDate(selectedDate)}</Text>


            <View>
                {eventsByUser.length > 0 ? (
                    <Text>La lista de eventos no está vacía.</Text>
                ) : (
                    <Text>La lista de eventos está vacía.</Text>
                )}
            </View>



            <ScrollView>
                {eventsByUser.map(item => (
                    <TouchableOpacity onPress={() => navigation.navigate('EventDetail')} >
                        <Card style={GlobalStyles.card}>
                            <Card.Content>
                                <CardText style={GlobalStyles.cardText} variant="bodyMedium">{item.name}</CardText>
                            </Card.Content>
                            <Card.Cover source={{ uri: item.picture }} />
                        </Card>

                    </TouchableOpacity>


                ))}
            </ScrollView>



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
    card: {

        justifyContent: 'center',
        marginTop: 6,
        backgroundColor: '#fff',

        width: 320
    },

    cardText: {

        alignSelf: 'center',
        fontWeight: 'bold',
        fontSize: 20
    },





});
