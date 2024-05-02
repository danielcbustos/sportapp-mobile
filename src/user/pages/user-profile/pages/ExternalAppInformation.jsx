import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CircularProgress } from '../../../../components/CircularProgress';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const ExternalAppInformation = ({ navigation }) => {

    const minSteps = 1300;
    const maxSteps = 30000;
    const maxStepsLabel = `/${maxSteps}`
    const randomSteps = Math.floor(Math.random() * (maxSteps - minSteps + 1)) + minSteps;

    const randomDistance = Math.round((randomSteps / 1300) * 100) / 100;

    const randomCalories = Math.round((randomSteps / 27) * 10) / 10;

    const minSleepScore = 5;
    const maxSleepScore = 98;
    const randomSleepScore = Math.floor(Math.random() * (maxSleepScore - minSleepScore + 1)) + minSleepScore;
    const randomAsleepHour = 0;
    const randomAsleepMin = Math.floor(Math.random() * (59 - 10 + 1)) + 10;
    const randomAsleep = `${randomAsleepHour}hr ${randomAsleepMin}min`;

    const randomDeepHour = 0;
    const randomDeepMin = Math.floor(Math.random() * (59 - 10 + 1)) + 10;
    const randomDeep = `${randomDeepHour}hr ${randomDeepMin}min`;

    const sleepLevel = '';
    if (randomSleepScore >= 5 && randomSleepScore < 10) {
        randomAsleepHour = 1;
        randomDeepHour = 0;
        randomDeepMin = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
        sleepLevel = 'Pobre'
    } else if ((randomSleepScore >= 10 && randomSleepScore < 20)) {
        randomAsleepHour = 2;
        randomDeepHour = 0;
        randomDeepMin = Math.floor(Math.random() * (59 - 30 + 1)) + 30;
        sleepLevel = 'Pobre'
    } else if ((randomSleepScore >= 20 && randomSleepScore < 30)) {
        randomAsleepHour = 3;
        randomDeepHour = 1;
        randomDeepMin = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
        sleepLevel = 'Regular'
    } else if ((randomSleepScore >= 30 && randomSleepScore < 40)) {
        randomAsleepHour = 4;
        randomDeepHour = 1;
        randomDeepMin = Math.floor(Math.random() * (59 - 30 + 1)) + 30;
        sleepLevel = 'Regular'
    } else if ((randomSleepScore >= 40 && randomSleepScore < 50)) {
        randomAsleepHour = 5;
        randomDeepHour = 2;
        sleepLevel = 'Regular'
    } else if ((randomSleepScore >= 50 && randomSleepScore < 60)) {
        randomAsleepHour = 6;
        randomDeepHour = Math.floor(Math.random() * (4 - 2 + 1)) + 2;
        sleepLevel = 'Bueno'
    } else if ((randomSleepScore >= 60 && randomSleepScore < 70)) {
        randomAsleepHour = 6;
        randomDeepHour = Math.floor(Math.random() * (5 - 3 + 1)) + 3;
        sleepLevel = 'Bueno'
    } else if ((randomSleepScore >= 70 && randomSleepScore < 80)) {
        randomAsleepHour = 7;
        randomDeepHour = Math.floor(Math.random() * (6 - 3 + 1)) + 3;
        sleepLevel = 'Bueno'
    } else if ((randomSleepScore >= 80 && randomSleepScore < 90)) {
        randomAsleepHour = 7;
        randomDeepHour = Math.floor(Math.random() * (6 - 5 + 1)) + 5;
        sleepLevel = 'Excelente'
    } else if ((randomSleepScore >= 90 && randomSleepScore <= 98)) {
        randomAsleepHour = 8;
        randomDeepHour = Math.floor(Math.random() * (7 - 5 + 1)) + 5;
        sleepLevel = 'Excelente'
    }






    return (
        <View style={styles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginBottom: 5 }}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={styles.textHead}>Pasos</Text>
                    <CircularProgress progress={randomSteps} subtitle={maxStepsLabel} max={maxSteps} labelStyle={styles.labelStyle} subtitleStyle={styles.subtitle} ></CircularProgress>
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 20 }}>
                    <Text style={styles.smLetters} >Distancia: <Text style={[styles.numberHead, { textAlign: 'left' }]}>{randomDistance} </Text>kms</Text>
                    <Text style={styles.smLetters} >Calorias: <Text style={[styles.numberHead, { textAlign: 'left' }]}>{randomCalories} </Text>kcal</Text>

                </View>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
                <Text style={styles.textHead}>Sueño</Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', width: '33%' }}>
                    <Text style={styles.textHead} >{randomSleepScore} </Text>
                    <Text style={styles.smLetters} >Puntaje de sueño</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center', width: '33%' }}>
                    <Text style={styles.textHead} >{randomAsleep} </Text>
                    <Text style={styles.smLetters} >Tiempo de sueño</Text>
                </View>
                <View style={{ flexDirection: 'column', alignItems: 'center', width: '33%' }}>
                    <Text style={styles.textHead} >{randomDeep}</Text>
                    <Text style={styles.smLetters} >Sueño{'\n'}profundo</Text >
                </View>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 5 }}>
                <Text style={styles.textHead}>{sleepLevel}</Text>
            </View>

            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginBottom: 5 }}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>
                    <Text style={styles.textHead}>Frecuencia Cardiaca</Text>
                    <CircularProgress progress={randomSteps} max={randomSteps} labelStyle={styles.labelStyle} subtitleStyle={styles.subtitle} ></CircularProgress>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }}>
                    <Text style={[styles.textHead, { marginLeft: 15 }]} >PR en press{'\n'}banca plano</Text>

                </View>
            </View>


        </View >
    )
}
const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    smLetters: {
        color: "#FFFFFF",
        fontSize: 14,
        letterSpacing: 0,
        textAlign: "center",
        marginBottom: 10
    },
    textHead: {
        marginTop: 15,
        color: "#FFFFFF",
        fontWeight: "bold",
        marginBottom: 10,
        fontSize: 18
    },
    sportApp: {
        backgroundColor: "#1a1a1a",
        flex: 1,
        width: wp("100%"),
        height: hp("100%"),
        overflow: "hidden",
        alignItems: "center",
        paddingTop: 60,
        paddingLeft: 35,
        paddingRight: 35,
        paddingBottom: 10,
    },
    subtitle: {
        color: "#FFFFFF"
    },
    labelStyle: {
        color: "#FFFFFF"
    },
    numberHead: {
        color: "#FFFFFF",
        fontWeight: "bold",
        fontSize: 18
    }


});

