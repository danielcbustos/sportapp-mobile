import React from 'react'
import { StyleSheet, TouchableOpacity, View, ScrollView } from 'react-native'
import { GlobalStyles } from '../../../../styles/GlobalStyles'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { Text } from 'react-native';
import { Card } from 'react-native-paper';
import { Spineer } from '../../../../utils/Spineer';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";


export const MealPlanDetail = ({ navigation, route }) => {
    const { mealPlanDetails, } = route.params;

    return (
        <View style={styles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.planesAlimenticios]}>Planes Alimenticios</Text>
            <Text style={[styles.mealPlanName]}>{mealPlanDetails.name}</Text>
            <ScrollView>
                {mealPlanDetails.nutritionalPlan.days.map((day, dayIndex) => (
                    <View key={dayIndex}>
                        <Text style={styles.day}>{day.name}</Text>
                        {day.meals.map((meal, mealIndex) => (
                            <View key={mealIndex}>
                                <Text style={styles.dishType}>{meal.dishType}</Text>
                                <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>

                                    <Card style={[GlobalStyles.miniCard, { marginTop: 10, marginRight: 10 }]}>
                                        <Card.Cover style={GlobalStyles.miniCardCover} source={{ uri: meal.picture }} />
                                    </Card>
                                    <Text style={styles.smLetters}>{meal.name}{'\n'}{meal.calories} calorias</Text>

                                </View>
                            </View>
                        ))}
                    </View>
                ))}
            </ScrollView>
        </View>

    )
}
const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    smLetters: {
        color: '#000000',
        fontSize: 14,
        letterSpacing: 0,
        fontWeight: '600',
        lineHeight: 21,
        marginTop: 5
    },
    mealPlanName: {
        textAlign: 'center',
        fontSize: 24,
        fontWeight: "600",
        color: '#000000',
    },
    day: {
        textAlign: 'center',
        fontSize: 18,
        fontWeight: "600",
        color: '#000000',
        marginTop: 25
    },
    planesAlimenticios: {
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
    dishType: {
        fontSize: 16,
        fontWeight: "600",
        color: '#000000',
        marginTop: 15
    }

});
