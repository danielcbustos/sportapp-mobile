import React, { useEffect, useState } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';

import { selectUserId, selectUserName } from '../helpers/userSelectors';
import { useSportEvents, useSportsEvents } from '../hooks/useSportsEvents';
import { useSelector } from 'react-redux';
import { AgendaComp } from '../../components/AgendaComp';




export const UserReservations = ({ navigation }) => {
    const name = useSelector(selectUserName)

    return (
        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.reservas]}>Reservas</Text>
            <Text style={GlobalStyles.smLetters}>
                <Text style={{ fontWeight: 'bold' }}>{name}</Text>
                , aca puedes visualizar tus reservas
            </Text>
            <View>
                <AgendaComp />
            </View>

        </View>
    )
}
const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    reservas: {
        marginTop: 20,
        marginBottom: 30,
        fontSize: 32,
        fontWeight: "600",
        color: '#000000',
    },





});
