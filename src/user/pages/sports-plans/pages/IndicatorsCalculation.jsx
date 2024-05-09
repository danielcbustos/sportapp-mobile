import React from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../../helpers/userSelectors';
import { CircularProgress } from '../../../../components/CircularProgress';

export const IndicatorsCalculation = ({ navigation, route }) => {
    const propiedades = route.params;
    const name = useSelector(selectUserName)
    const intensities = ["Baja", "Media", "Alta"];
    const randomExercises = Math.floor(Math.random() * (10 - 3 + 1)) + 3;
    const randomIntensity = intensities[Math.floor(Math.random() * intensities.length)];
    const randomVo2Max = Math.floor(Math.random() * (70 - 15 + 1)) + 15;

    return (
        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>

            <Text style={styles.resumen}>!Buen Trabajo!</Text>

            <Text style={styles.smLetters}><Text style={{ fontWeight: 'bold' }}>{name}</Text> muy buen trabajo, a continuación te {'\n'} mostramos el resumen de tu entrenamiento {'\n'}y tus indicadores FTP y VO2MAX
            </Text>
            <Text style={styles.textBigHead}>Resumen Entrenamiento</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', width: '100%', marginBottom: 10 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center', marginRight: 30 }}>
                    <Text style={styles.textHeadTraining}>Tiempo Total</Text>
                    <Text style={styles.normalLetters}>{propiedades.totalTimeExcercise} hrs</Text>

                    <Text style={styles.textHeadTwoTraining}>N. Ejercicios</Text>
                    <Text style={styles.normalLetters}>{randomExercises}</Text>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 30 }}>
                    <Text style={styles.textHeadTraining} >Total calorias</Text>
                    <Text style={styles.normalLetters} >{propiedades.totalCalories} cal</Text>

                    <Text style={styles.textHeadTwoTraining} >Intensidad</Text>
                    <Text style={styles.normalLetters} >{randomIntensity}</Text>

                </View>

            </View>
            <Text style={styles.textBigHeadTwo}>Indicadores</Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%' }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={styles.textHead}>Capacidad maxima{'\n'}de uso de oxigeno{'\n'}(VO2MAX)</Text>
                    <CircularProgress progress={randomVo2Max} subtitle={'VO2MAX'} max={70}  ></CircularProgress>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 15 }}>
                    <Text style={[styles.textHead]}>Umbral de potencia{'\n'}funcional{'\n'}(FTP)</Text>

                    <CircularProgress progress={propiedades.ftp} subtitle={'FTP'} max={301} ></CircularProgress>
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
    resumen: {
        marginTop: 15,
        marginBottom: 15,
        fontSize: 32,
        fontWeight: "600",
        color: '#000000',
    },

    smLetters: {
        color: "#000000",
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 24,
        textAlign: "center",
        marginBottom: 20
    },
    normalLetters: {
        color: "#000000",
        fontSize: 15,
        letterSpacing: 0,
        lineHeight: 24,
        textAlign: "center",
        marginBottom: 10
    },
    textHead: {
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 15
    },
    textHeadTraining: {
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 15
    },
    textHeadTwoTraining: {
        fontWeight: "bold",
        textAlign: 'center',
        fontSize: 15
    },
    textBigHead: {
        fontWeight: "bold",
        marginTop: 5,
        marginBottom: 20,
        fontSize: 18
    },
    textBigHeadTwo: {
        marginTop: 5,
        fontWeight: "bold",
        marginBottom: 20,
        fontSize: 18
    }


});

