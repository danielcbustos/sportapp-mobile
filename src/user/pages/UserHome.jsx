
import React, { useEffect } from 'react'
import { Button, StyleSheet, Text, TouchableOpacity, View, FlatList, ScrollView, ImageBackground } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserName, selectUserLastName } from '../helpers/userSelectors';
import { Text as CardText } from 'react-native-paper';
import { Card } from 'react-native-paper';
import { useGetSubscription } from './user-profile/hooks/useGetSubscription';
import { Spineer } from '../../utils/Spineer';

export const UserHome = ({ navigation }) => {
    const name = useSelector(selectUserName)
    const { userSubscription, getSubscriptionLoading, fetchUserSubscription } = useGetSubscription();

    useEffect(() => {
        fetchUserSubscription();
    }, []);

    return (
        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '95%', }}>

                <Text style={[styles.nombreUsuario]}>Hola, {name}</Text>
            </View>

            <Text style={GlobalStyles.smLetters}>Sport App es tu compañero ideal en tu camino{'\n'}hacia una vida más saludable y activa</Text>
            <TouchableOpacity   >
                <Card style={[GlobalStyles.card, { marginTop: 20, marginBottom: 5 }]}>
                    <Card.Cover source={require("../../../assets/daniel-inicio2.png")} />
                </Card>
            </TouchableOpacity>
            <ScrollView>
                <TouchableOpacity onPress={() => navigation.navigate('Services')}  >
                    <Card style={GlobalStyles.card}>
                        <Card.Content>
                            <CardText style={GlobalStyles.cardText} variant="bodyMedium">Servicios</CardText>
                        </Card.Content>
                        <Card.Cover style={GlobalStyles.cardCover} source={require("../../../assets/servicios.jpg")} />
                    </Card>
                </TouchableOpacity>

                <TouchableOpacity onPress={() => navigation.navigate('Progress')}>
                    <Card style={GlobalStyles.card}>
                        <Card.Content>
                            <CardText style={GlobalStyles.cardText} variant="bodyMedium">Progreso</CardText>
                        </Card.Content>
                        <Card.Cover style={GlobalStyles.cardCover} source={require("../../../assets/progreso.jpg")} />
                    </Card>
                </TouchableOpacity>
                <Spineer isLoading={getSubscriptionLoading} />
                {!getSubscriptionLoading && userSubscription.plan.name != 'Basic' && (
                    <TouchableOpacity onPress={() => navigation.navigate('ExternalAppInformation')} >
                        <Card style={GlobalStyles.card}>
                            <Card.Content>
                                <CardText style={GlobalStyles.cardText} variant="bodyMedium">Conectar con App Externa</CardText>
                            </Card.Content>
                            <Card.Cover style={GlobalStyles.cardCover} source={require("../../../assets/app-externa.png")} />
                        </Card>
                    </TouchableOpacity>
                )}
            </ScrollView>

        </View >

    )
}
const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    nombreUsuario: {
        fontSize: 20,
        fontWeight: "600",
        color: '#000000',
        marginBottom: 10
    },
    smLetters: {
        color: '#000000',
        fontSize: 14,



    },

});

