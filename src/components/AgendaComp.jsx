import { Calendar, CalendarList, Agenda } from 'react-native-calendars';

import React, { useEffect, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Text, TouchableOpacity, View, } from 'react-native';
export const AgendaComp = () => {

    const renderItem = (item, firstItemInDay) => {
        return (
            <TouchableOpacity style={styles.item}>
                <Text style={styles.itemText}>{item.name}</Text>
            </TouchableOpacity>
        );
    };

    // Actualiza la función renderEmptyDate para que devuelva un componente View con un Text dentro
    const renderEmptyDate = () => {
        return (
            <View style={styles.emptyDate}>
                <Text style={styles.emptyDateText}>No hay eventos para esta fecha</Text>
            </View>
        );
    };
    return (
        <Agenda
            items={{
                '2012-05-22': [{ name: 'item 1 - any js object' }],
                '2012-05-23': [{ name: 'item 2 - any js object', height: 80 }],
                '2012-05-24': [],
                '2012-05-25': [{ name: 'item 3 - any js object' }, { name: 'any js object' }]
            }}
            loadItemsForMonth={month => {
                console.log('trigger items loading');
            }}
            onCalendarToggled={calendarOpened => {
                console.log(calendarOpened);
            }}
            onDayPress={day => {
                console.log('day pressed');
            }}
            onDayChange={day => {
                console.log('day changed');
            }}
            selected={'2012-05-16'}
            minDate={'2012-05-10'}
            maxDate={'2012-05-30'}
            pastScrollRange={50}
            futureScrollRange={50}
            renderItem={renderItem}
            renderDay={(day, item) => {
                return <View />;
            }}
            renderEmptyDate={renderEmptyDate}
            renderKnob={() => {
                return <View />;
            }}
            renderEmptyData={() => {
                return <View />;
            }}
            rowHasChanged={(r1, r2) => {
                return r1.text !== r2.text;
            }}
            hideKnob={true}
            showClosingKnob={false}
            markedDates={{
                '2012-05-16': { selected: true, marked: true },
                '2012-05-17': { marked: true },
                '2012-05-18': { disabled: true }
            }}
            disabledByDefault={true}
            onRefresh={() => console.log('refreshing...')}
            refreshing={false}
            refreshControl={null}
            theme={{
                agendaDayTextColor: 'yellow',
                agendaDayNumColor: 'green',
                agendaTodayColor: 'red',
                agendaKnobColor: 'blue'
            }}
            style={{}}
        />
    )
}

const styles = StyleSheet.create({
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    itemText: {
        color: '#888',
        fontSize: 16,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
        justifyContent: 'center',
        alignItems: 'center',
    },
    emptyDateText: {
        fontSize: 16,
        color: '#888',
    },
});