import React, { useEffect } from 'react'
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native'
import { GlobalStyles } from '../../../../styles/GlobalStyles'
import { Button } from "react-native-paper";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import { useCityByUser } from '../../../hooks/useCityById';
import { Spineer } from '../../../../utils/Spineer';
import { useSuscribeSpecialist } from '../hooks/useSuscribeSpecialist';
import { selectUserId } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const SportsSpecialistDetail = ({ navigation, route }) => {
    const userId = (useSelector(selectUserId));
    const { specialistDetails, specialistDate } = route.params;
    const { cityName, loading, fetchCity } = useCityByUser();
    const { suscribeSpecialist, specialistSuscription } = useSuscribeSpecialist(navigation);
    const specialist = {
        productId: specialistDetails.productId,
        name: specialistDetails.name,
        categoryId: specialistDetails.category.id,
        categoryName: specialistDetails.category.name,
        userId: userId,
        planId: specialistDetails.plan.id,
        planName: specialistDetails.plan.name,
        startDateTime: specialistDetails.startDateTime,
        endDateTime: specialistDetails.endDateTime
    };

    const formatTime = (dateString) => {
        const date = new Date(dateString);
        let hours = date.getHours();
        let minutes = date.getMinutes();
        const ampm = hours >= 12 ? 'pm' : 'am';
        hours = hours % 12;
        hours = hours ? hours : 12;
        minutes = minutes < 10 ? '0' + minutes : minutes;
        const formattedTime = hours + ':' + minutes + ' ' + ampm;
        return formattedTime;
    };

    const specialistHour = formatTime(specialistDetails.startDateTime);

    useEffect(() => {
        fetchCity(specialistDetails.cityId);
    }, []);


    return (
        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <ScrollView>
                <Card style={[GlobalStyles.card, { marginTop: 15 }]}>
                    <Card.Cover style={{ height: 320 }} source={{ uri: specialistDetails.picture }} />
                </Card>

                <Spineer isLoading={loading} />
                {!loading && (
                    <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '95%' }}>

                        <Text style={styles.specialistName}>{specialistDetails.name}</Text>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                            <Icon name="map" style={styles.icon} />
                            <Text style={styles.smLetters}>{cityName[0].name}  </Text>
                        </View>

                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                            <Icon name="timer" style={styles.icon} />
                            <Text style={styles.smLetters}>{specialistDate} - {specialistHour}</Text>
                        </View>

                        <Text style={styles.descripcion}>Descripción</Text>
                        <Text style={styles.smLetters}>{specialistDetails.description}</Text>
                    </View>
                )}
                <Button
                    style={styles.btnLarge}
                    labelStyle={GlobalStyles.btnLayerStyle}
                    contentStyle={GlobalStyles.btnLarge1}
                    onPress={() => {
                        suscribeSpecialist(specialist);

                    }}
                >
                    Reservar
                </Button>
            </ScrollView>
        </View>
    )
}
const styles = StyleSheet.create({

    btnLarge: {
        marginTop: 40
    },
    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    smLetters: {
        color: '#000000',
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 24,
        marginTop: 5
    },
    specialistName: {
        fontSize: 24,
        fontWeight: "600",
        color: '#000000',
        marginTop: 30
    },
    descripcion: {
        fontSize: 20,
        fontWeight: "600",
        color: '#000000',
        marginTop: 20
    },


});
