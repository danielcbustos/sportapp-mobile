import React, { useEffect, useState, useRef } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../../styles/GlobalStyles';

import { Button } from "react-native-paper";
import { useRegisterSportsSessions } from '../hooks/useRegisterSportsSessions';
import { AlertNotification } from '../../../../utils/AlertNotification';

export const RegisterSportsSessions = ({ navigation }) => {

    const { registerSportsSessions } = useRegisterSportsSessions(navigation);
    const [time, setTime] = useState(0);
    const [running, setRunning] = useState(false);
    const intervalRef = useRef(null);
    const startTimeRef = useRef(0);
    const { showToastSuccess, showToastError } = AlertNotification();
    let totalCalories = Math.round(0.3 * time);
    let randomFtp = Math.floor(Math.random() * (300 - 100 + 1)) + 100;
    const startStopwatch = () => {
        startTimeRef.current = Date.now() - time * 1000;
        intervalRef.current = setInterval(() => {
            setTime(Math.floor((Date.now() -
                startTimeRef.current) / 1000));
        }, 1000);
        setRunning(true);
    };

    const pauseStopwatch = () => {
        clearInterval(intervalRef.current);
        setRunning(false);
    };

    const resetStopwatch = () => {
        clearInterval(intervalRef.current);
        setTime(0);
        setRunning(false);
    };

    const resumeStopwatch = () => {
        startTimeRef.current = Date.now() - time * 1000;
        intervalRef.current = setInterval(() => {
            setTime(Math.floor(
                (Date.now() - startTimeRef.current) / 1000));
        }, 1000);
        setRunning(true);
    };
    const formatTime = (timeInSeconds) => {
        const hours = Math.floor(timeInSeconds / 3600);
        const minutes = Math.floor((timeInSeconds % 3600) / 60);
        const seconds = timeInSeconds % 60;

        return `${hours}:${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    };

    useEffect(() => {
        // istanbul ignore next
        if (time > 0) {
            if (time == 10 || time % 50 == 0) {
                showToastSuccess(
                    "¡Estas muy calmado!",
                    "¡Aumenta 10 kg el peso!"
                );

            } else if (time == 22 || time % 65 == 0) {
                showToastError(
                    "¡Tus pulsaciones son demasiado altas!",
                    "¡Realiza solo 6 repeticiones!"
                );
            } else if (time == 34 || time % 81 == 0) {

                showToastError(
                    "¡Tus pulsaciones aumentaron anormalmente!",
                    "Disminuye 10 kg el peso"
                );
            }
        }

    }, [time]);
    return (
        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.seguimiento]}>Seguimiento</Text>
            <Text style={[styles.actividadFisica]}>Actividad Fisica</Text>
            <View style={styles.container}>
                <View style={styles.timeContainer}>
                    <View style={styles.outerCircle}>
                        <View style={styles.innerCircle}>
                            <Text style={styles.timeText}>{formatTime(time)}</Text>
                        </View>
                    </View>
                </View>
                <Text style={styles.smLetters}>Sesión de entrenamiento</Text>
                <View style={styles.buttonContainer}>
                    {running ? (
                        <TouchableOpacity
                            style={[styles.button, styles.pauseButton]}
                            onPress={pauseStopwatch}
                        >
                            <Text style={styles.buttonText}>Pausar</Text>
                        </TouchableOpacity>
                    ) : (
                        <>
                            <TouchableOpacity
                                testID='start'
                                style={[styles.button, styles.startButton]}
                                onPress={startStopwatch}
                            >
                                <Text style={styles.buttonText}>Iniciar</Text>
                            </TouchableOpacity>
                            <TouchableOpacity
                                style={[styles.button, styles.resetButton]}
                                onPress={resetStopwatch}
                            >
                                <Text style={styles.buttonText}>
                                    Reiniciar
                                </Text>
                            </TouchableOpacity>
                        </>
                    )}
                    {!running && (
                        <TouchableOpacity
                            style={[styles.button, styles.resumeButton]}
                            onPress={resumeStopwatch}
                        >
                            <Text style={styles.buttonText}>
                                Reanudar
                            </Text>
                        </TouchableOpacity>
                    )}
                </View>
            </View>

            <Button
                style={styles.btnLarge}
                labelStyle={GlobalStyles.btnLayerStyle}
                contentStyle={GlobalStyles.btnLarge1}
                onPress={() => { registerSportsSessions(formatTime(time), totalCalories, randomFtp) }}
            >
                Finalizar entrenamiento
            </Button>
        </View>
    )
}
const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    btnLarge: {
        marginTop: 60
    },

    actividadFisica: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "600",
        color: '#000000',
        marginBottom: 50
    },
    seguimiento: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 5,
        fontSize: 32,
        fontWeight: "600",
        color: '#000000',
    },
    container: {
        justifyContent: 'center',
        alignItems: 'center',
    },
    header: {
        fontSize: 30,
        color: "green",
        marginBottom: 10,
    },
    subHeader: {
        fontSize: 18,
        marginBottom: 10,
        color: "blue",
    },
    timeContainer: {
        alignItems: 'center',
        marginBottom: 20,
    },
    outerCircle: {
        width: 250,
        height: 250,
        borderRadius: 125,
        backgroundColor: '#EA9354',
        justifyContent: 'center',
        alignItems: 'center',
    },
    innerCircle: {
        width: 220,
        height: 220,
        borderRadius: 110,
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
    },
    timeText: {
        fontSize: 48,
    },
    buttonContainer: {
        flexDirection: 'row',
        marginTop: 20,
    },
    button: {
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 5,
    },
    startButton: {
        backgroundColor: '#2ecc71',
        marginRight: 10,
    },
    resetButton: {
        backgroundColor: '#e74c3c',
        marginRight: 10,
    },
    pauseButton: {
        backgroundColor: '#EA9354',
    },
    resumeButton: {
        backgroundColor: '#3498db',
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: "600",
    },
    smLetters: {
        color: '#000000',
        fontSize: 20,
        letterSpacing: 0,
        lineHeight: 24,
        textAlign: "center",
    },


});

