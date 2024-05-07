import React from 'react'
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native'
import { GlobalStyles } from '../../../../styles/GlobalStyles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Button } from "react-native-paper";
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";

export const SportsPlansDetail = ({ navigation, route }) => {
    const { sportPlanDetails } = route.params;
    return (
        <View style={styles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.rutinaDeportiva]}>Rutina Deportiva</Text>
            <Text style={[styles.sportPlanName]}>{sportPlanDetails.description}</Text>
            <ScrollView>
                {sportPlanDetails.trainingPlan.trainings.map((training, trainingIndex) => (
                    <View key={trainingIndex}>
                        <Text style={styles.trainings}>{training.name}</Text>
                        {training.exercises.map((exercise, exerciseIndex) => (
                            <View key={exerciseIndex}>
                                <Text style={styles.exercise}>{exercise.name}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>

                                    <Card style={[GlobalStyles.miniCard, { marginTop: 10, marginRight: 10 }]}>
                                        <Card.Cover style={GlobalStyles.miniCardCover} source={{ uri: exercise.picture }} />
                                    </Card>
                                    <Text style={styles.smLetters}>{exercise.sets} series{'\n'}{exercise.repeats} repeticiones</Text>

                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
            <View style={{ alignItems: 'center' }}>
                <Button
                    style={styles.btnLarge}
                    labelStyle={GlobalStyles.btnLayerStyle}
                    contentStyle={GlobalStyles.btnLarge1}
                    onPress={() => {

                    }}
                >
                    Comenzar entrenamiento
                </Button>
            </View>
        </View>

    )
}
const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    btnLarge: {
        marginBottom: 15
    },
    smLetters: {
        color: '#000000',
        fontSize: 14,
        letterSpacing: 0,
        fontWeight: '600',
        lineHeight: 21,
        marginTop: 5
    },
    sportPlanName: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "600",
        color: '#000000',
    },
    trainings: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "600",
        color: '#000000',
        marginTop: 25
    },
    rutinaDeportiva: {
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 5,
        fontSize: 32,
        fontWeight: "600",
        color: '#000000',
    },
    sportApp: {
        backgroundColor: "#fff",
        flex: 1,
        width: wp("100%"),
        height: hp("100%"),
        overflow: "hidden",
        paddingTop: 60,
        paddingLeft: 35,
        paddingRight: 35,
        paddingBottom: 10,
    },
    exercise: {
        fontSize: 16,
        fontWeight: "600",
        color: '#000000',
        marginTop: 15
    }

});
