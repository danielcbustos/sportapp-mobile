import React, { useEffect } from 'react'
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { CalendarComp } from '../../../../components/CalendarComp';
import { Button } from "react-native-paper";
import { useState } from 'react';


export const SportsSpecialistAvailability = ({ navigation }) => {

    const [selectedDate, setSelectedDate] = useState('');
    const [isButtonClicked, setIsButtonClicked] = useState(false);

    const handleDateSelect = (date) => {
        setSelectedDate(date);
    };
    // istanbul ignore next
    const handleViewAvailability = () => {
        setIsButtonClicked(true);
    };
    // istanbul ignore next
    const formatSelectedDate = (date) => {
        const selectedDateObj = new Date(date);
        selectedDateObj.setDate(selectedDateObj.getDate() + 1);
        const year = selectedDateObj.getFullYear();
        const month = String(selectedDateObj.getMonth() + 1).padStart(2, '0');
        const day = String(selectedDateObj.getDate()).padStart(2, '0');
        const formattedDate = `${year}-${month}-${day}T00:00:00.000Z`;
        return formattedDate;
    };

    const isValid = selectedDate !== '';

    useEffect(() => {
        // istanbul ignore next
        if (isButtonClicked) {
            const formattedDate = formatSelectedDate(selectedDate);
            setIsButtonClicked(false);
            navigation.navigate('SportsSpecialists', { selectedDate, formattedDate });
        }
    }, [isButtonClicked]);


    return (
        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.disponibilidad]}>Disponibilidad</Text>
            <Text style={GlobalStyles.smLetters}>Selecciona la fecha  y chequea la {'\n'}disponibilidad de nuestros deportologos</Text>
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
