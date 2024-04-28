import React from 'react'
import { StyleSheet, TouchableOpacity, View } from 'react-native'
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Text as CardText } from 'react-native-paper';

export const UserReservations = ({ navigation }) => {

    return (
        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.navigate('UserHome')} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.reservas]}>Reservas</Text>
            <Text style={[GlobalStyles.smLetters, { marginBottom: 50 }]}>Chequea las reservas que has realizado{'\n'}en Sport App</Text>

            <TouchableOpacity onPress={() => navigation.navigate('SportsEventsReservations')} >
                <Card style={[GlobalStyles.card, { marginBottom: 40 }]}>
                    <Card.Content>
                        <CardText style={GlobalStyles.cardText} variant="bodyMedium">Eventos Deportivos</CardText>
                    </Card.Content>
                    <Card.Cover style={GlobalStyles.cardCover} source={require("../../../../../assets/eventos-deportivos.png")} />
                </Card>
            </TouchableOpacity>

            <TouchableOpacity  >
                <Card style={GlobalStyles.card}>
                    <Card.Content>
                        <CardText style={GlobalStyles.cardText} variant="bodyMedium">Deportologo</CardText>
                    </Card.Content>
                    <Card.Cover style={GlobalStyles.cardCover} source={require("../../../../../assets/deportologo.jpg")} />
                </Card>
            </TouchableOpacity>

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
        marginBottom: 50,
        fontSize: 32,
        fontWeight: "600",
        color: '#000000',
    }




});
