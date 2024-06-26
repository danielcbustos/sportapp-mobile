import React, { useEffect } from 'react'
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { Spineer } from '../../../../utils/Spineer';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserName } from '../../../helpers/userSelectors';
import { useGoalTracking } from '../hooks/useGoaltracking';
import { CircularProgress } from '../../../../components/CircularProgress';
import { Button } from 'react-native-paper';


export const Progress = ({ navigation }) => {
    const name = useSelector(selectUserName)
    const userId = useSelector(selectUserId)
    const { goalTracking, goalTrackingLoading, fetchGoalTracking } = useGoalTracking();

    const kgOfMuscleGained = goalTracking ? goalTracking.kgOfMuscleGained : 0;
    const kgOfMuscleGainedMax = 15

    const prInFlatBenchPress = goalTracking ? goalTracking.prInFlatBenchPress : 0;
    const prInFlatBenchPressMax = 100

    const cmsInArm = goalTracking ? goalTracking.cmsInArm : 0;
    const cmsInArmMax = 40

    const prInSquad = goalTracking ? goalTracking.prInSquad : 0;
    const prInSquadMax = 200

    useEffect(() => {
        fetchGoalTracking(userId)

    }, []);


    return (
        <View style={GlobalStyles.sportApp}>
            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                <TouchableOpacity onPress={() => navigation.goBack()} >
                    <Icon name="arrow-left" style={styles.icon} />
                </TouchableOpacity>
            </View>

            <Text style={styles.progress}>Progreso</Text>

            <Text style={styles.smLetters}>Hola <Text style={{ fontWeight: 'bold' }}>{name}</Text>, has seguimiento de tus metas{'\n'}propuestas y chequea tu progreso
            </Text>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 20 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={styles.textHead}>Kgs de musculo{'\n'}ganado</Text>
                    <CircularProgress progress={kgOfMuscleGained} subtitle={`/${kgOfMuscleGainedMax}`} max={kgOfMuscleGainedMax} ></CircularProgress>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }}>
                    <Text style={[styles.textHead, { marginLeft: 15 }]} >PR en press{'\n'}banca plano</Text>

                    <CircularProgress progress={prInFlatBenchPress} subtitle={`/${prInFlatBenchPressMax}`} max={prInFlatBenchPressMax}  ></CircularProgress>
                </View>


            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', width: '100%', marginBottom: 20 }}>
                <View style={{ flexDirection: 'column', alignItems: 'center' }}>
                    <Text style={styles.textHead}>Cms de brazo</Text>
                    <CircularProgress progress={cmsInArm} subtitle={`/${cmsInArmMax}`} max={cmsInArmMax}  ></CircularProgress>
                </View>

                <View style={{ flexDirection: 'column', alignItems: 'center', marginLeft: 20 }}>
                    <Text style={[styles.textHead, { marginLeft: 15 }]}>PR en sentadilla</Text>

                    <CircularProgress progress={prInSquad} subtitle={`/${prInSquadMax}`} max={prInSquadMax} ></CircularProgress>
                </View>


            </View>

            <Spineer isLoading={goalTrackingLoading} />

            <Button
                style={styles.btnLarge}
                labelStyle={GlobalStyles.btnLayerStyle}
                contentStyle={GlobalStyles.btnLarge1}
                onPress={() => {
                    fetchGoalTracking(userId);
                }}
            >
                Actualizar
            </Button>


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
    progress: {
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
    textHead: {
        fontWeight: "bold",
        textAlign: 'center',
        marginBottom: 10,
        fontSize: 15
    }


});

