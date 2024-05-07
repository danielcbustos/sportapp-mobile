import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, View, TouchableOpacity, Animated } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Ionicons } from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { Spineer } from '../../../../utils/Spineer';
import * as Progress from 'react-native-progress';
import { AlertNotification } from '../../../../utils/AlertNotification';


export const HeartRate = ({ navigation }) => {
    const [isVisible, setIsVisible] = useState(true);
    const [loading, setLoading] = useState(true);
    const [bpmLevel, setBpmLevel] = useState('');
    const [colorBar, setColorBar] = useState('');
    const opacity = useState(new Animated.Value(1))[0];
    const { showToastSuccess, showToastError } = AlertNotification();

    const maxBpm = 200;
    const minBpm = 30;
    const bpmRandom = Math.floor(Math.random() * (maxBpm - minBpm + 1)) + minBpm;
    // istanbul ignore next
    useEffect(() => {
        if ((bpmRandom >= 30 && bpmRandom < 60)) {
            setBpmLevel('En Reposo');
            setColorBar('#1E90FF')
            if (bpmLevel === 'En Reposo') {
                showToastSuccess(
                    "¡Estas demasiado relajado!",
                    "Empieza tu actividad fisica"
                );
            }
        } else if ((bpmRandom >= 60 && bpmRandom < 100)) {
            setBpmLevel('Normal');
            setColorBar('#00FF00')
        } else if ((bpmRandom >= 100 && bpmRandom < 130)) {
            setBpmLevel('Moderado');
            setColorBar('#FFFF00')
        } else if ((bpmRandom >= 130 && bpmRandom < 170)) {
            setBpmLevel('Intenso');
            setColorBar('#FFA500')
        } else if ((bpmRandom >= 170 && bpmRandom <= 200)) {
            setBpmLevel('Muy Intenso');
            setColorBar('#FF0000')
            if (bpmLevel === 'Muy Intenso') {
                showToastError(
                    "¡Tus pulsaciones son muy altas!",
                    "Disminuye el ritmo o toma un descanso"
                );
            }
        }
        setLoading(false)
    }, [bpmRandom]);

    useEffect(() => {
        const pulseAnimation = Animated.sequence([
            Animated.timing(opacity, {
                toValue: 0,
                duration: 700,
                useNativeDriver: true,
            }),
            Animated.timing(opacity, {
                toValue: 1,
                duration: 700,
                useNativeDriver: true,
            }),
        ]);

        const loop = Animated.loop(pulseAnimation);
        loop.start();
        return () => loop.stop();
    }, []);

    return (
        <View style={styles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={styles.heartRate}>Frecuencia{'\n'} Cardiaca</Text>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 60 }}>
                {isVisible && (
                    <Animated.View style={[styles.heartContainer, { opacity }]}>
                        <Ionicons name={'heart'} size={126} color='#FF0000' />
                    </Animated.View>
                )}
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center' }}>
                <Text style={[styles.textHead, { fontSize: 36 }]} >{bpmRandom} BPM </Text>
            </View>
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 50 }}>
                <Progress.Bar progress={bpmRandom / 200} width={wp("80%")} color={colorBar} height={50} />

            </View>
            <Spineer isLoading={loading} />
            <View style={{ flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 10 }}>
                <Text style={[styles.textHead, { fontSize: 24 }]} >{bpmLevel} </Text>

            </View>


        </View >
    )
}
const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    heartRate: {
        marginTop: 15,
        marginBottom: 15,
        fontSize: 32,
        fontWeight: "600",
        color: '#FFFFFF',
    },
    textHead: {
        marginTop: 15,
        color: "#FFFFFF",
        fontWeight: "bold",
        marginBottom: 10
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
    }

});
