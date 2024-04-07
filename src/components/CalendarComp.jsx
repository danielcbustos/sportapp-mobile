import React, { useState } from 'react';
import { Calendar, LocaleConfig } from 'react-native-calendars';

LocaleConfig.locales['es'] = {
    monthNames: [
        'Enero',
        'Febrero',
        'Marzo',
        'Abril',
        'Mayo',
        'Junio',
        'Julio',
        'Agosto',
        'Septiembre',
        'Octubre',
        'Noviembre',
        'Diciembre'
    ],
    monthNamesShort: ['Ene.', 'Feb.', 'Mar', 'Abr', 'May', 'Jun', 'Jul.', 'Ago', 'Sep', 'Oct', 'Nov', 'Dec'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miercoles', 'Jueves', 'Viernes', 'Sabado'],
    dayNamesShort: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sa'],
    today: "Hoy"
};

LocaleConfig.defaultLocale = 'es';

export const CalendarComp = ({ onDateSelect }) => {
    const [selected, setSelected] = useState('');

    return (

        <Calendar
            onDayPress={day => {
                setSelected(day.dateString);
                onDateSelect(day.dateString); // Llamar a la función de devolución de llamada con la fecha seleccionada
            }}
            markedDates={{
                [selected]: { selected: true, disableTouchEvent: true, selectedDotColor: 'red' }
            }}
            style={{ marginTop: 50, marginBottom: 40, width: 300 }}
            theme={{
                selectedDayBackgroundColor: '#EA9354',
                selectedDayTextColor: '#ffffff',
                todayTextColor: '#EA9354',
                dayTextColor: '#2d4150',
                arrowColor: '#000000'
            }}
        />


    );
};