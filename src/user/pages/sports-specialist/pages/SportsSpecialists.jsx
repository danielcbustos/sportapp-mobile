import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { Text as CardText } from 'react-native-paper';
import { Card } from 'react-native-paper';
import { Spineer } from '../../../../utils/Spineer';
import { AlertNotification } from '../../../../utils/AlertNotification';
import { useSportsSpecialists } from '../hooks/useSportsSpecialists';


export const SportsSpecialists = ({ navigation, route }) => {
    const { selectedDate, formattedDate } = route.params;
    const { sportsSpecialist, loadSportsSpecialist, errorInSportsSpecialist, getSportsSpecialist } = useSportsSpecialists();
    const [isLoading, setIsLoading] = useState(true);
    const { showDialogError } = AlertNotification();

    const formattedDateTwo = (dateString) => {
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        const date = new Date(dateString);
        date.setDate(date.getDate() + 1);
        return date.toLocaleDateString('es-ES', options);
    };


    const specialistDate = formattedDateTwo(selectedDate);

    useEffect(() => {
        getSportsSpecialist(formattedDate);
    }, []);

    useEffect(() => {
        if (!loadSportsSpecialist) {
            setIsLoading(false);
            if (sportsSpecialist.length === 0) {
                showDialogError(
                    '¡Aviso importante!',
                    'No hay deportologos deportivos disponibles para este día.'
                );
            }
        }
    }, [loadSportsSpecialist]);



    return (

        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.deportologo]}>Deportologo</Text>
            <Text style={GlobalStyles.smLetters}>Selecciona uno de nuestros deportologos {'\n'}disponibles para el día</Text>
            <Text style={styles.negrilla}>{specialistDate}</Text>

            <Spineer isLoading={isLoading} />
            {!isLoading && sportsSpecialist.length === 0 && (
                <View style={styles.aviso}>
                    <Text style={styles.avisoTexto}>Por favor elige otra fecha</Text>

                </View>
            )}
            {!isLoading && (
                <ScrollView>
                    {sportsSpecialist.map(item => (
                        <TouchableOpacity key={item.productId} onPress={() => navigation.navigate('SportsSpecialistDetail', { specialistDetails: item, specialistDate })} >
                            <Card accessibilityLabel="specialist" style={GlobalStyles.card}>
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
    deportologo: {
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
