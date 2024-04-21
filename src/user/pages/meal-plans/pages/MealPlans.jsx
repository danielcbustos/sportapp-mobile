import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserName } from '../../../helpers/userSelectors';
import { Text as CardText } from 'react-native-paper';
import { Card } from 'react-native-paper';
import { Spineer } from '../../../../utils/Spineer';
import { AlertNotification } from '../../../../utils/AlertNotification';


export const MealPlans = ({ navigation }) => {
    const userId = useSelector(selectUserId);
    // const { selectedDate, formattedDate } = route.params;
    // const { eventsByUser, loadEvents, errorInEvents, getEvents } = useSportEvents(userId);
    const [isLoading, setIsLoading] = useState(true);
    const { showDialogError } = AlertNotification();


    return (

        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.planesAlimenticios]}>Planes Alimenticios</Text>
            <Text style={GlobalStyles.smLetters}>Estos son los planes alimenticios que te{'\n'}recomendamos de acuerdo a la información{'\n'}que proporcionaste
            </Text>


            {/* <Spineer isLoading={isLoading} /> */}

            {/* 
            <ScrollView>
                {eventsByUser.map(item => (
                    <TouchableOpacity key={item.productId} onPress={() => navigation.navigate('EventDetail', { eventDetails: item, eventDate })} >
                        <Card accessibilityLabel="event" style={GlobalStyles.card}>
                            <Card.Content>
                                <CardText style={GlobalStyles.cardText} variant="bodyMedium">{item.name}</CardText>
                            </Card.Content>
                            <Card.Cover source={{ uri: item.picture }} />
                        </Card>

                    </TouchableOpacity>


                ))}
            </ScrollView> */}

        </View>

    )
}
const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    planesAlimenticios: {
        marginTop: 20,
        marginBottom: 70,
        fontSize: 32,
        fontWeight: "600",
        color: '#000000',
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
