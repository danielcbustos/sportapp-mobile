import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
import { Text as CardText } from 'react-native-paper';
import { Card } from 'react-native-paper';

export const Services = ({ navigation }) => {

    return (
        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.servicios]}>Servicios</Text>
            <Text style={GlobalStyles.smLetters}>Te ofrecemos los siguientes servicios en{'\n'}Sport App, ¡disfrutalos!</Text>

            <ScrollView>
                <TouchableOpacity  >
                    <Card style={GlobalStyles.card}>
                        <Card.Content>
                            <CardText style={GlobalStyles.cardText} variant="bodyMedium">Rutinas Deportivas</CardText>
                        </Card.Content>
                        <Card.Cover style={GlobalStyles.cardCover} source={require("../../../assets/planes-deportivos.png")} />
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('EventAvailability')} >
                    <Card style={GlobalStyles.card}>
                        <Card.Content>
                            <CardText style={GlobalStyles.cardText} variant="bodyMedium">Eventos Deportivos</CardText>
                        </Card.Content>
                        <Card.Cover style={GlobalStyles.cardCover} source={require("../../../assets/eventos-deportivos.png")} />
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('MealPlans')}>
                    <Card style={GlobalStyles.card}>
                        <Card.Content>
                            <CardText style={GlobalStyles.cardText} variant="bodyMedium">Planes Alimenticios</CardText>
                        </Card.Content>
                        <Card.Cover style={GlobalStyles.cardCover} source={require("../../../assets/planes-alimenticios.png")} />
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity  >
                    <Card style={GlobalStyles.card}>
                        <Card.Content>
                            <CardText style={GlobalStyles.cardText} variant="bodyMedium">Deportologo</CardText>
                        </Card.Content>
                        <Card.Cover style={GlobalStyles.cardCover} source={require("../../../assets/deportologo.jpg")} />
                    </Card>
                </TouchableOpacity>
            </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    servicios: {
        marginTop: 20,
        marginBottom: 50,
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
