import React, { useEffect, useState } from 'react'
import { Button } from "react-native-paper";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import * as yup from 'yup';
import { Formik } from 'formik';
import { Spineer } from '../../../../utils/Spineer';

import { Picker } from '@react-native-picker/picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useGetUserProfile } from '../hooks/useGetUserProfile';
import { usePhysicalLevel } from '../hooks/usePhysicalLevel';
import { useGetGoals } from '../hooks/useGetGoals';

export const SportsPlansProfile = ({ navigation, route }) => {
    const { formData: previousFormData } = route.params;
    const [formValues, setFormValues] = useState({
        goals: '',
        physicalLevels: ''
    });
    const { goal, goalLoading, fetchGoals } = useGetGoals();
    const { physicalLevel, physicalLevelLoading, fetchPhysicalLevels } = usePhysicalLevel();
    const { userProfile, getUserLoading, fetchUserProfile } = useGetUserProfile();
    const sportsPlansProfileValidationSchema = yup.object().shape({
    });

    useEffect(() => {
        fetchPhysicalLevels();
    }, []);

    useEffect(() => {
        fetchGoals()
    }, []);

    useEffect(() => {
        fetchUserProfile()
    }, []);

    useEffect(() => {
        if (userProfile) {
            setFormValues(prevState => ({
                ...prevState,
                physicalLevels: userProfile?.sportProfile?.physicalLevelId || formValues.physicalLevels,
                goals: userProfile?.goals || formValues.goals,
            }));
        }
    }, [userProfile]);

    const navigateToNextScreen = () => {

        const updatedFormData = {
            ...previousFormData,
            ...formValues,
        };
        navigation.navigate('UserMealProfile', { formData: updatedFormData });
    };
    return (

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Formik
                initialValues={formValues}
                onSubmit={() => { }}
                validationSchema={sportsPlansProfileValidationSchema}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ handleChange, handleBlur, handleSubmit, errors, touched, values, isValid, }) => (

                    <View style={styles.sportApp}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} >
                                <Icon name="arrow-left" style={styles.icon} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.planesAlimenticios}>¿Cual es tu meta?</Text>

                        <Text style={styles.smLetters}>Puedes seleccionar mas de una meta, se{'\n'}pueden modificar mas adelante si asi lo{'\n'}deseas
                        </Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
                            <View  >
                                <SectionedMultiSelect
                                    items={goal.map((item) => ({
                                        id: item.id,
                                        name: item.name,
                                    }))}
                                    IconRenderer={MaterialIcons}
                                    uniqueKey="id"
                                    confirmText='Confirmar'
                                    searchPlaceholderText='Filtrar'
                                    styles={{ button: { backgroundColor: '#EA9354' } }}
                                    onSelectedItemsChange={(items) => setFormValues({ ...formValues, goals: items })}
                                    selectedItems={formValues.goals}
                                    selectedText='seleccionados'
                                />

                            </View>
                        </View>
                        <Text style={styles.planesAlimenticios}>Nivel Fisico</Text>

                        <Text style={styles.smLetters}>Selecciona tu nivel de actividad fisica, esto nos{'\n'}permitira sugerirte un programa adecuado{'\n'}para tus necesidades
                        </Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '100%' }}>
                            <Picker
                                testID='web_picker_goals'
                                onValueChange={(value) =>
                                    setFormValues({ ...formValues, physicalLevels: value })
                                }
                                selectedValue={formValues.physicalLevels}>

                                <Picker.Item label="Selecciona aquí" value={null} />

                                {physicalLevel.map(item => (
                                    <Picker.Item label={item.name} value={item.id} key={item.id} />
                                ))}
                            </Picker>
                            {errors.physicalLevels && touched.physicalLevels && (
                                <Text style={{ color: 'red', fontSize: 12 }}>{errors.physicalLevels}</Text>
                            )}
                        </View>

                        <Spineer isLoading={physicalLevelLoading} />
                        <Spineer isLoading={goalLoading} />
                        <Spineer isLoading={getUserLoading} />
                        <Button
                            style={styles.btnLarge}
                            labelStyle={GlobalStyles.btnLayerStyle}
                            contentStyle={GlobalStyles.btnLarge1}
                            onPress={navigateToNextScreen}
                        // disabled={!isValid}
                        >
                            Continuar
                        </Button>
                    </View>
                )
                }
            </Formik >
        </ScrollView >
    )
}

const styles = StyleSheet.create({

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },
    planesAlimenticios: {
        marginTop: 20,
        marginBottom: 30,
        fontSize: 32,
        fontWeight: "600",
        color: '#000000',
    },

    btnLarge: {
        marginTop: 15
    },

    scrollViewContent: {
        flexGrow: 1,

    },
    label: {
        fontSize: 15,
        fontWeight: 'bold'
    },
    smLetters: {
        color: "#000000",
        fontSize: 14,
        letterSpacing: 0,
        lineHeight: 24,
        textAlign: "center",
        marginBottom: 20
    },
    sportApp: {
        backgroundColor: "#fff",
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

});


