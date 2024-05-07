import React, { useEffect, useState } from 'react'
import { Button } from "react-native-paper";
import { StyleSheet, Text, View, TouchableOpacity, ScrollView } from "react-native";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../../styles/GlobalStyles';
import { Input } from "@rneui/themed";
import * as yup from 'yup';
import { Formik } from 'formik';
import { Spineer } from '../../../../utils/Spineer';
import { useSelector } from 'react-redux';
import { selectUserName } from '../../../helpers/userSelectors';
import { Picker } from '@react-native-picker/picker';
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from "react-native-responsive-screen";
import { useGetUserProfile } from '../hooks/useGetUserProfile';
import { useGetGenres } from '../hooks/useGetGenres';
import { useGetCountries } from '../hooks/useGetCountries';

export const UserProfile = ({ navigation }) => {

    const name = useSelector(selectUserName)
    const [formValues, setFormValues] = useState({
        genre: '',
        country: '',
        age: 0,
        weight: 0,
        heigth: 0,
    });
    const { countries, countriesLoading, fetchAllCountries } = useGetCountries();
    const { genres, genresLoading, fetchGenres } = useGetGenres();
    const { userProfile, getUserLoading, fetchUserProfile } = useGetUserProfile();
    const userProfileValidationSchema = yup.object().shape({
    });

    useEffect(() => {
        fetchGenres();
    }, []);

    useEffect(() => {
        fetchAllCountries()
    }, []);

    useEffect(() => {
        fetchUserProfile()
    }, []);

    useEffect(() => {
        if (userProfile) {
            setFormValues(prevState => ({
                ...prevState,
                genre: userProfile?.genreId || formValues.genre,
                country: userProfile?.countryId || formValues.country,
                age: userProfile?.age || formValues.age,
                weight: userProfile?.sportProfile?.weight || formValues.weight,
                heigth: userProfile?.sportProfile?.heigth || formValues.heigth,

            }));
        }
    }, [userProfile]);

    return (

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Formik
                initialValues={formValues}
                onSubmit={() => { }}
                validationSchema={userProfileValidationSchema}
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

                        <Text style={styles.planesAlimenticios}>Cuentanos sobre ti</Text>

                        <Text style={styles.smLetters}>Hola <Text style={{ fontWeight: 'bold' }}>{name}</Text>, para mejorar tu{'\n'}experiencia y resultados, necesitamos{'\n'}saber un poco sobre ti
                        </Text>
                        <View style={{ flexDirection: 'column', justifyContent: 'flex-start', width: '95%', }}>
                            <Text style={GlobalStyles.label}>Selecciona tu genero</Text>
                            <Picker
                                testID='web_picker_genre'
                                onValueChange={(value) =>
                                    setFormValues({ ...formValues, genre: value })
                                }
                                selectedValue={formValues.genre}>

                                <Picker.Item label="Selecciona aquí" value={null} />

                                {genres.map(item => (
                                    <Picker.Item label={item.name} value={item.id} key={item.id} />
                                ))}
                            </Picker>
                            {errors.genre && touched.genre && (
                                <Text style={{ color: 'red', fontSize: 12 }}>{errors.genre}</Text>
                            )}
                            <Text style={GlobalStyles.label}>Selecciona tu pais de origen</Text>
                            <Picker
                                testID='web_picker_country'
                                onValueChange={(value) =>
                                    setFormValues({ ...formValues, country: value })
                                }
                                selectedValue={formValues.country}>

                                <Picker.Item label="Selecciona aquí" value={null} />

                                {countries.map(item => (
                                    <Picker.Item label={item.name} value={item.id} key={item.id} />
                                ))}
                            </Picker>
                            {errors.country && touched.country && (
                                <Text style={{ color: 'red', fontSize: 12 }}>{errors.country}</Text>
                            )}

                            <Text style={GlobalStyles.label}>Ingresa tu edad:</Text>

                            <Input
                                testID='input_age'
                                placeholder="Ingresa tu edad"
                                inputContainerStyle={[errors.age && touched.age ? { borderColor: 'red' } : null, styles.inputText]}
                                onChangeText={(value) => setFormValues({ ...formValues, age: value })}
                                onBlur={handleBlur('age')}
                                keyboardType="numeric"
                                style={{ fontSize: 15 }}
                                value={formValues.age.toString()}
                                errorStyle={{ color: 'red' }}
                                errorMessage={errors.age && touched.age ? <Text >{errors.age}</Text> : ''}
                            />

                            <Text style={GlobalStyles.label}>Ingresa tu peso (en kgs)</Text>

                            <Input
                                testID='input_weight'
                                placeholder="Ingresa tu peso"
                                inputContainerStyle={[errors.weight && touched.weight ? { borderColor: 'red' } : null, styles.inputText]}
                                onChangeText={(value) => setFormValues({ ...formValues, weight: value })}
                                onBlur={handleBlur('weight')}
                                keyboardType="numeric"
                                style={{ fontSize: 15 }}
                                value={formValues.weight.toString()}
                                errorStyle={{ color: 'red' }}
                                errorMessage={errors.weight && touched.weight ? <Text >{errors.weight}</Text> : ''}
                            />
                            <Text style={GlobalStyles.label}>Ingresa tu estatura (en cms)</Text>

                            <Input
                                testID='input_heigth'
                                placeholder="Ingresa tu estatura"
                                inputContainerStyle={[errors.heigth && touched.heigth ? { borderColor: 'red' } : null, styles.inputText]}
                                onChangeText={(value) => setFormValues({ ...formValues, heigth: value })}
                                onBlur={handleBlur('heigth')}
                                keyboardType="numeric"
                                style={{ fontSize: 15 }}
                                value={formValues.heigth.toString()}
                                errorStyle={{ color: 'red' }}
                                errorMessage={errors.heigth && touched.heigth ? <Text >{errors.heigth}</Text> : ''}
                            />

                        </View>
                        <Spineer isLoading={genresLoading} />
                        <Spineer isLoading={countriesLoading} />
                        <Spineer isLoading={getUserLoading} />
                        <Button
                            style={styles.btnLarge}
                            labelStyle={GlobalStyles.btnLayerStyle}
                            contentStyle={GlobalStyles.btnLarge1}
                            onPress={() => navigation.navigate('SportsPlansProfile', { formData: formValues })}
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


