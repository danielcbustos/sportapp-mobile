import React, { useEffect, useState } from 'react'
import { Button } from "react-native-paper";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView, Switch, KeyboardAvoidingView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { Input } from "@rneui/themed";
import * as yup from 'yup';
import { Formik } from 'formik';
import { Spineer } from '../../../../utils/Spineer';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserName, selectUserLastName, selectUserEmail } from '../../../helpers/userSelectors';
import { useNutritionalAlergies } from '../hooks/useNutritionalAlergies';
import { useTypesOfNutrition } from '../hooks/useTypesOfNutrition';
import { Picker } from '@react-native-picker/picker';
import SectionedMultiSelect from 'react-native-sectioned-multi-select';
import { MaterialIcons } from '@expo/vector-icons';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useGetUserProfile } from '../hooks/useGetUserProfile';
import { useUpdateMealProfile } from '../hooks/useUpdateMealProfile';
export const UserMealProfile = ({ navigation }) => {
    const userId = useSelector(selectUserId)
    const name = useSelector(selectUserName)
    const lastname = useSelector(selectUserLastName)
    const email = useSelector(selectUserEmail)
    const [formValues, setFormValues] = useState({
        hasMedicalAllergies: false,
        nutritionType: '',
        averagesCaloriesPerDay: 0,
        hasAllergies: false,
        mealAllergies: [],
    });
    const { nutritionalAllergies, allergiesloading, fetchNutritionalAllergies } = useNutritionalAlergies();
    const { typesOfNutrition, nutritionloading, fetchTypesOfNutrition } = useTypesOfNutrition();
    const { userProfile, getUserLoading, fetchUserProfile } = useGetUserProfile();
    const { mealProfileUpdated, mealProfileLoading, updateMealProfile } = useUpdateMealProfile()
    const mealProfileValidationSchema = yup.object().shape({
        // calories: yup.string().required("Las calorias son requerida"),
        // nutritionType: yup.string().required("El tipo de dieta es requerido"),
    });

    const submitMealProfile = async () => {
        const userUpd = {
            userId: userId,
            name: name,
            lastName: lastname,
            email: email,
            phoneNumber: "",
            dateOfBirth: "2005-04-18T00:00:00+00:00",
            genreId: "ad14435c-b91a-45b9-b440-3b67d5f43dcb",
            age: 19,
            countryId: "710c238d-447e-4b64-99e8-19655514c3c2",
            stateId: "f70c5f4e-90ce-4a70-9a4c-b47a98d35dd5",
            cityId: "bb1b5f76-2b95-4782-8273-714d3d6e5373",
            nutrionalProfile: {
                hasAllergies: formValues.hasAllergies,
                hasMedicalAllergies: formValues.hasMedicalAllergies,
                typeOfNutritionId: formValues.nutritionType,
                averagesCaloriesPerDay: formValues.averagesCaloriesPerDay,
            },
            nutricionalAllergies: formValues.mealAllergies,
            activities: [],
            goals: [],
            sportProfile: {
                excerciseByWeek: 0,
                physicalLevelId: "a75fcf31-da27-4ac6-b914-9cdb12776cd2",
                hasInjuries: false,
                whatInjuries: "",
                weight: 0,
                heigth: 0,
            },
        }

        try {
            await updateMealProfile(userUpd);
        } catch (error) {
            console.error("Error updating meal profile:", error);
        }
    }
    useEffect(() => {
        if (mealProfileUpdated) {
            navigation.navigate('UserHome');
        }
    }, [mealProfileUpdated]);

    useEffect(() => {
        fetchNutritionalAllergies();
    }, []);

    useEffect(() => {
        fetchTypesOfNutrition()
    }, []);

    useEffect(() => {
        fetchUserProfile()
    }, []);

    useEffect(() => {
        if (userProfile) {
            setFormValues(prevState => ({
                ...prevState,
                hasAllergies: userProfile?.nutrionalProfile?.hasAllergies || formValues.hasAllergies,
                hasMedicalAllergies: userProfile?.nutrionalProfile?.hasMedicalAllergies || formValues.hasMedicalAllergies,
                nutritionType: userProfile?.nutrionalProfile?.typeOfNutritionId || formValues.nutritionType,
                averagesCaloriesPerDay: userProfile?.nutrionalProfile?.averagesCaloriesPerDay || formValues.averagesCaloriesPerDay,
                mealAllergies: userProfile?.nutricionalAllergies || formValues.mealAllergies,
            }));
        }
    }, [userProfile]);
    return (

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Formik
                initialValues={formValues}
                onSubmit={() => submitMealProfile()}
                validationSchema={mealProfileValidationSchema}
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

                        <Text style={styles.planesAlimenticios}>Planes Alimenticios</Text>

                        <Text style={styles.smLetters}>Hola <Text style={{ fontWeight: 'bold' }}>{name}</Text>, diligencia la siguiente  {'\n'}información sobre tu perfil alimenticio, para {'\n'} recomendarte algunos planes alimenticios
                        </Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '95%', }}>
                            <Text style={GlobalStyles.label}>¿Tienes alergias medicas? </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#EA9354' }}
                                    thumbColor={formValues.hasMedicalAllergies ? '#f4f3f4' : '#f4f3f4'}
                                    value={formValues.hasMedicalAllergies}
                                    onValueChange={(value) => setFormValues({ ...formValues, hasMedicalAllergies: value })}
                                    accessibilityLabel="medicalAllergies"
                                />
                                <Text >{formValues.hasMedicalAllergies ? 'Si' : 'No'}</Text>
                            </View>

                            <Text style={GlobalStyles.label}>¿Cual es tu tipo de dieta? </Text>
                            <Picker
                                // prompt="Selecciona aquí"
                                onValueChange={(value) =>
                                    setFormValues({ ...formValues, nutritionType: value })
                                }
                                selectedValue={formValues.nutritionType}>
                                <Picker.Item label="Selecciona aquí" value={null} />
                                {typesOfNutrition.map(item => (
                                    <Picker.Item label={item.name} value={item.id} key={item.id} />
                                ))}
                            </Picker>
                            {errors.nutritionType && touched.nutritionType && (
                                <Text style={{ color: 'red', fontSize: 12 }}>{errors.nutritionType}</Text>
                            )}

                            <Text style={GlobalStyles.label}>Promedio de calorias que consumes al día: </Text>

                            <Input
                                placeholder="Ingresa tus calorias"
                                inputContainerStyle={[errors.calories && touched.calories ? { borderColor: 'red' } : null, styles.inputText]}
                                onChangeText={(value) => setFormValues({ ...formValues, averagesCaloriesPerDay: value })}
                                onBlur={handleBlur('calories')}
                                keyboardType="numeric"
                                style={{ fontSize: 15 }}
                                value={formValues.averagesCaloriesPerDay.toString()}
                                errorStyle={{ color: 'red' }}
                                errorMessage={errors.calories && touched.calories ? <Text >{errors.calories}</Text> : ''}
                            />

                            <Text style={GlobalStyles.label}>¿Tienes alergias alimenticias? </Text>
                            <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                                <Switch
                                    trackColor={{ false: '#767577', true: '#EA9354' }}
                                    thumbColor={formValues.hasAllergies ? '#f4f3f4' : '#f4f3f4'}
                                    value={formValues.hasAllergies}
                                    accessibilityLabel="mealAllergies"
                                    onValueChange={(value) => {

                                        if (!value) {
                                            setFormValues({ ...formValues, hasAllergies: value, mealAllergies: [] });
                                        } else {
                                            setFormValues({ ...formValues, hasAllergies: value });
                                        }
                                    }}
                                />
                                <Text >{formValues.hasAllergies ? 'Si' : 'No'}</Text>
                            </View>
                            <View>

                                <Text style={GlobalStyles.label}>¿A que alimentos eres alergico? </Text>
                                <SectionedMultiSelect
                                    items={nutritionalAllergies.map((item) => ({
                                        id: item.id,
                                        name: item.name,
                                    }))}
                                    IconRenderer={MaterialIcons}
                                    uniqueKey="id"
                                    confirmText='Confirmar'
                                    searchPlaceholderText='Filtrar'
                                    styles={{ button: { backgroundColor: '#EA9354' } }}
                                    onSelectedItemsChange={(items) => setFormValues({ ...formValues, mealAllergies: items })}
                                    selectedItems={formValues.mealAllergies}
                                    selectedText='seleccionados'
                                    disabled={!formValues.hasAllergies}
                                />

                            </View>

                        </View>
                        <Spineer isLoading={allergiesloading} />
                        <Spineer isLoading={nutritionloading} />
                        <Spineer isLoading={getUserLoading} />
                        <Spineer isLoading={mealProfileLoading} />
                        <Button
                            style={styles.btnLarge}
                            labelStyle={GlobalStyles.btnLayerStyle}
                            contentStyle={GlobalStyles.btnLarge1}
                            onPress={handleSubmit}
                            disabled={!isValid}
                        >
                            Guardar
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
        height: hp("110%"),
        overflow: "hidden",
        alignItems: "center",
        paddingTop: 60,
        paddingLeft: 35,
        paddingRight: 35,
        paddingBottom: 10,
    },

});

