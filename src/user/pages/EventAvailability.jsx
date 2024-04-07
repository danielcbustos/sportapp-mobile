import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { CalendarComp } from '../../components/CalendarComp';
import { Button } from "react-native-paper";
import { useState } from 'react';

import { useSelector } from 'react-redux';
import { selectUserId, selectUserName } from '../helpers/userSelectors';
import { useSportEvents } from '../hooks/useSportsEvents';

export const EventAvailability = ({ navigation }) => {
    const userId = useSelector(selectUserId);
    const name = useSelector(selectUserName)
    const [selectedDate, setSelectedDate] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);
    const { eventsByUser, loadEvents, errorInEvents, getEvents } = useSportEvents(userId);
    console.log(eventsByUser)

    const handleDateSelect = (date) => {
        setSelectedDate(date); // Actualizar el estado de la fecha seleccionada
    };


    const handleViewAvailability = () => {
        setIsButtonClicked(true);
    };

    // useEffect(() => {
    //     if (isValid && isButtonClicked) {
    //         getEvents();
    //         navigation.navigate('SportsEvents', { selectedDate, eventsByUser });
    //     }
    // }, [isValid, isButtonClicked]);

    const formatSelectedDate = (date) => {
        // Crear un objeto Date a partir de la cadena de fecha seleccionada
        const selectedDateObj = new Date(date);
        // Sumar un día a la fecha seleccionada
        selectedDateObj.setDate(selectedDateObj.getDate() + 1);
        // Obtener las partes de la fecha (año, mes, día)
        const year = selectedDateObj.getFullYear();
        const month = String(selectedDateObj.getMonth() + 1).padStart(2, '0'); // Se agrega 1 al mes porque en JavaScript los meses van de 0 a 11
        const day = String(selectedDateObj.getDate()).padStart(2, '0');
        // Formatear la fecha en el formato deseado
        const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;
        return formattedDate;
    };
    const isValid = selectedDate !== '';

    useEffect(() => {
        if (isButtonClicked) {
            const formattedDate = formatSelectedDate(selectedDate);
            getEvents(formattedDate);
            console.log(formattedDate)
            setSelectedDate('');
            setIsButtonClicked(false);

            navigation.navigate('SportsEvents', { selectedDate, eventsByUser });


        }
    }), [];

    // isButtonclicked

    return (
        <View style={[GlobalStyles.sportApp, GlobalStyles.container]}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.disponibilidad]}>Disponibilidad</Text>
            <Text style={GlobalStyles.smLetters}>Selecciona la fecha  y chequea que eventos {'\n'}deportivos hay</Text>
            <CalendarComp onDateSelect={handleDateSelect} />
            <Button
                style={styles.btnLarge}

                labelStyle={GlobalStyles.btnLayerStyle}
                contentStyle={GlobalStyles.btnLarge1}
                onPress={handleViewAvailability}
                disabled={!isValid}
            >
                Ver disponibilidad
            </Button>

        </View>
    )
}

const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    disponibilidad: {
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



});
