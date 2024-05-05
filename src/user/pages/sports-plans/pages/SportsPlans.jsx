import React, { useEffect, useState } from 'react'
import { StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { Text as CardText } from 'react-native-paper';
import { Card } from 'react-native-paper';
import { Spineer } from '../../../../utils/Spineer';
import { AlertNotification } from '../../../../utils/AlertNotification';
import { useSportsPlans } from '../hooks/useSportsPlans';


export const SportsPlans = ({ navigation }) => {
    const { mealPlansByUser, loadMealPlans, errorInMealPlans, getSportsPlans } = useSportsPlans()
    const [isLoading, setIsLoading] = useState(true);
    const { showDialogError } = AlertNotification();

    useEffect(() => {
        getSportsPlans();
    }, []);

    return (

        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>
            <Text style={[styles.planesAlimenticios]}>Rutinas Deportivas</Text>
            <Text style={GlobalStyles.smLetters}>Estos son las rutinas deportivas que te{'\n'}
                recomendamos de acuerdo a la información{'\n'}
                que proporcionaste en tu registro </Text>


            <Spineer isLoading={loadMealPlans} />


            <ScrollView>
                {mealPlansByUser.map(item => (
                    <TouchableOpacity key={item.productId}
                        onPress={() => navigation.navigate('SportsPlanDetail', { mealPlanDetails: item })}
                    >
                        <Card accessibilityLabel="sportsPlan" style={GlobalStyles.card}>
                            <Card.Content>
                                <CardText style={GlobalStyles.cardText} variant="bodyMedium">{item.name}</CardText>
                            </Card.Content>
                            <Card.Cover source={{ uri: item.picture }} />
                        </Card>

                    </TouchableOpacity>


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
    planesAlimenticios: {
        marginTop: 20,
        marginBottom: 70,
        fontSize: 32,
        fontWeight: "600",
        color: '#000000',
    },
    aviso: {
        alignItems: 'center',
        marginTop: 180,
    },
    avisoTexto: {
        fontSize: 20,
        fontWeight: "600",
        color: '#000000',
    }


});
