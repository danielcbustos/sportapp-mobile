import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { CircularProgress } from '../../../../components/CircularProgress';
import { Button } from 'react-native-paper';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Spineer } from '../../../../utils/Spineer';
import * as Progress from 'react-native-progress';
import { GlobalStyles } from '../../../../styles/GlobalStyles';



export const ExternalAppInformation = ({ navigation }) => {
    const [randomAsleepHour, setRandomAsleepHour] = useState(4);
    const [randomDeepHour, setRandomDeepHour] = useState(0);
    const [loading, setLoading] = useState(true);
    const [sleepLevel, setSleepLevel] = useState('');
    const [colorBar, setColorBar] = useState('');
    let minSteps = 1300;
    let maxSteps = 30000;
    let maxStepsLabel = `/${maxSteps}`
    let randomSteps = Math.floor(Math.random() * (maxSteps - minSteps + 1)) + minSteps;
    let randomDistance = Math.round((randomSteps / 1300) * 100) / 100;
    let randomCalories = Math.round((randomSteps / 27) * 10) / 10;

    let minSleepScore = 5;
    let maxSleepScore = 98;
    const randomSleepScore = (Math.floor(Math.random() * (maxSleepScore - minSleepScore + 1)) + minSleepScore);

    let randomAsleepMin = Math.floor(Math.random() * (59 - 10 + 1)) + 10;
    let randomAsleep = `${randomAsleepHour}hr ${randomAsleepMin}min`;

    let randomDeepMin = Math.floor(Math.random() * (59 - 10 + 1)) + 10;
    let randomDeep = `${randomDeepHour}hr ${randomDeepMin}min`;


    useEffect(() => {
        // istanbul ignore next
        if (randomSleepScore >= 5 && randomSleepScore < 10) {
            setRandomAsleepHour(1);
            setRandomDeepHour(0);
            randomDeepMin = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
            setSleepLevel('Pobre');
            setColorBar('#FF0000')

        } else if ((randomSleepScore >= 10 && randomSleepScore < 20)) {
            setRandomAsleepHour(2);
            setRandomDeepHour(0);
            randomDeepMin = Math.floor(Math.random() * (59 - 30 + 1)) + 30;
            setSleepLevel('Pobre');
            setColorBar('#FF0000')
        } else if ((randomSleepScore >= 20 && randomSleepScore < 30)) {
            setRandomAsleepHour(3);
            setRandomDeepHour(1);
            randomDeepMin = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
            setSleepLevel('Regular');
            setColorBar('#FFFF00')
        } else if ((randomSleepScore >= 30 && randomSleepScore < 40)) {
            setRandomAsleepHour(4);
            setRandomDeepHour(1);
            randomDeepMin = Math.floor(Math.random() * (59 - 30 + 1)) + 30;
            setSleepLevel('Regular');
            setColorBar('#FFFF00')
        } else if ((randomSleepScore >= 40 && randomSleepScore < 50)) {
            setRandomAsleepHour(5);
            setRandomDeepHour(2);
            setSleepLevel('Regular');
            setColorBar('#FFFF00')
        } else if ((randomSleepScore >= 50 && randomSleepScore < 60)) {
            setRandomAsleepHour(6);
            setRandomDeepHour(Math.floor(Math.random() * (4 - 2 + 1)) + 2);
            setSleepLevel('Bueno');
            setColorBar('#00FF00')
        } else if ((randomSleepScore >= 60 && randomSleepScore < 70)) {
            setRandomAsleepHour(6);
            setRandomDeepHour(Math.floor(Math.random() * (5 - 3 + 1)) + 3);
            setSleepLevel('Bueno');
            setColorBar('#00FF00')
        } else if ((randomSleepScore >= 70 && randomSleepScore < 80)) {
            setRandomAsleepHour(7);
            setRandomDeepHour(Math.floor(Math.random() * (6 - 3 + 1)) + 3);
            setSleepLevel('Bueno');
            setColorBar('#00FF00')
        } else if ((randomSleepScore >= 80 && randomSleepScore < 90)) {
            setRandomAsleepHour(7);
            setRandomDeepHour(Math.floor(Math.random() * (6 - 5 + 1)) + 5);
            setSleepLevel('Excelente');
            setColorBar('#1E90FF')
        } else if ((randomSleepScore >= 90 && randomSleepScore <= 98)) {
            setRandomAsleepHour(8);
            setRandomDeepHour(Math.floor(Math.random() * (7 - 5 + 1)) + 5);
            randomDeepMin = Math.floor(Math.random() * (30 - 10 + 1)) + 10;
            setSleepLevel('Excelente');
            setColorBar('#1E90FF')
        }
        setLoading(false)
    }, [randomSleepScore]);




    return (
        <View style={styles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginBottom: 15 }}>
                <Text style={styles.textHead}>Pasos</Text>
            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginBottom: 5 }}>
                <View style={{ flexDirection: 'column', alignItems: 'flex-start' }}>

                    <CircularProgress progress={randomSteps} subtitle={maxStepsLabel} max={maxSteps} labelStyle={styles.labelStyle} subtitleStyle={styles.subtitle} ></CircularProgress>
                </View>

                <View style={{ flexDirection: 'column', justifyContent: 'center', marginLeft: 20 }}>
                    <Text style={styles.smLetters} >Distancia: <Text style={[styles.numberHead, { textAlign: 'left' }]}>{randomDistance} </Text>kms</Text>
                    <Text style={styles.smLetters} >Calorias: <Text style={[styles.numberHead, { textAlign: 'left' }]}>{randomCalories} </Text>kcal</Text>

                </View>
            </View>
            <Spineer isLoading={loading} />
            <View>
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
                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginTop: 10 }}>
                    <Progress.Bar progress={randomSleepScore / 100} width={wp("80%")} color={colorBar} height={15} />
                </View>

                <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 5 }}>
                    <Text style={styles.textHead}>{sleepLevel}</Text>
                </View>
            </View>

            <View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%' }}>
                    <Text style={styles.textHead}>Frecuencia Cardiaca</Text>


                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', width: '100%', marginTop: 15 }}>

                    <Button
                        style={styles.btnLarge}
                        labelStyle={GlobalStyles.btnLayerStyle}
                        contentStyle={GlobalStyles.btnLarge1}
                        onPress={() => navigation.navigate('HeartRate')}
                    >
                        Chequear
                    </Button>

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
    btnLarge: {
        marginTop: 15
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

