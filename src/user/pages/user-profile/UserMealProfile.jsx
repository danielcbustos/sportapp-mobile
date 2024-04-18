import React, { useEffect, useState } from 'react'
import { Button } from "react-native-paper";
import { StyleSheet, Text, View, TouchableOpacity, Alert, ScrollView } from "react-native";
import { Input } from "@rneui/themed";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../../styles/GlobalStyles';
import * as yup from 'yup';
import { Formik } from 'formik';
import useEmailExists from '../../../auth/hooks/useEmailExists';
import useRegisterUser from '../../../auth/hooks/useRegisterUser';
import { Spineer } from '../../../utils/Spineer';
import { useSelector } from 'react-redux';
import { selectUserId, selectUserName, selectUserLastName } from '../../helpers/userSelectors';

export const UserMealProfile = ({ navigation }) => {
    const name = useSelector(selectUserName)
    const { validateEmail, emailExists } = useEmailExists();
    const [formValues] = useState(null);
    const { createUser, loading, userCreated } = useRegisterUser();

    const initialValuesObject = { firstName: '', lastName: '', email: '', isUser: true, password: '', confirmPassword: '', };
    const registerValidationSchema = yup.object().shape({
        firstName: yup.string().required("El nombre es requerido"),
        lastName: yup.string().required("Los apellidos son requeridos "),
        email: yup
            .string()
            .required('El correo es requerido')
            .email('Formato de correo invalido')
            .test("email-exists", "El email ya está registrado", async (value) => {
                await validateEmail(value.trim());
                return emailExists;
            })
        ,
        password: yup
            .string()
            .required('La contraseña es requerida')
            .matches(
                /^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&\*])(?=.{8,})/,
                "La contraseña debe contener 8 caracteres, letras mayusculas, minisculas, numeros y un caracter especial"
            ),
        confirmPassword: yup.string()
            .required("La validacion de contraseña es requerida")
            .oneOf(
                [yup.ref("password")],
                "Las contraseñas no coinciden"
            ),
    });

    const submitRegister = async (values) => {
        await createUser(values);
    }
    useEffect(() => {
        if (userCreated) navigation.navigate('UserHome');
    }, [userCreated]);


    return (

        <ScrollView contentContainerStyle={styles.scrollViewContent}>
            <Formik
                initialValues={formValues || initialValuesObject}
                validationSchema={registerValidationSchema}
                onSubmit={values => { console.log(values); submitRegister(values); }}
                validateOnChange={true}
                validateOnBlur={true}
            >
                {({ handleChange, handleBlur, handleSubmit, errors, touched, values, isValid, }) => (

                    <View style={GlobalStyles.sportApp}>
                        <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                            <TouchableOpacity onPress={() => navigation.goBack()} >
                                <Icon name="arrow-left" style={styles.icon} />
                            </TouchableOpacity>
                        </View>

                        <Text style={styles.planesAlimenticios}>Planes Alimenticios</Text>

                        <Text style={GlobalStyles.smLetters}>Hola <Text style={{ fontWeight: 'bold' }}>{name}</Text>, diligencia la siguiente  {'\n'}información sobre tu perfil alimenticio, para {'\n'} recomendarte algunos planes alimenticios
                        </Text>


                        <Input
                            placeholder="Nombres"
                            inputContainerStyle={[errors.firstName && touched.firstName ? { borderColor: 'red' } : null, styles.inputText]}
                            onChangeText={handleChange('firstName')}
                            onBlur={handleBlur('firstName')}
                            accessibilityLabel="firstName"
                            value={values.firstName}
                            errorStyle={{ color: 'red' }}
                            errorMessage={errors.firstName && touched.firstName ? <Text >{errors.firstName}</Text> : ''}
                        />

                        <Input
                            placeholder="Apellidos"
                            inputContainerStyle={[errors.lastName && touched.lastName ? { borderColor: 'red' } : null, styles.inputText]}
                            onChangeText={handleChange('lastName')}
                            onBlur={handleBlur('lastName')}
                            accessibilityLabel="lastName"
                            value={values.lastName}
                            errorStyle={{ color: 'red' }}
                            errorMessage={errors.lastName && touched.lastName ? <Text >{errors.lastName}</Text> : ''}
                        />

                        <Input
                            placeholder="Correo"
                            inputContainerStyle={[errors.email && touched.email ? { borderColor: 'red' } : null, styles.inputText]}
                            onChangeText={handleChange('email')}
                            onBlur={handleBlur('email')}
                            accessibilityLabel="email"
                            value={values.email}
                            errorStyle={{ color: 'red' }}
                            errorMessage={errors.email && touched.email ? <Text >{errors.email}</Text> : ''}
                        />

                        <Input
                            placeholder="Contraseña"
                            inputContainerStyle={[errors.password && touched.password ? { borderColor: 'red' } : null, styles.inputText]}
                            secureTextEntry={true}
                            onChangeText={handleChange('password')}
                            onBlur={handleBlur('password')}
                            accessibilityLabel="password"
                            value={values.password}
                            errorStyle={{ color: 'red' }}
                            errorMessage={errors.password && touched.password ? <Text >{errors.password}</Text> : ''}
                        />

                        <Input
                            placeholder="Confirmar Contraseña"
                            inputContainerStyle={[errors.confirmPassword && touched.confirmPassword ? { borderColor: 'red' } : null, styles.inputText]}
                            secureTextEntry={true}
                            onChangeText={handleChange('confirmPassword')}
                            onBlur={handleBlur('confirmPassword')}
                            accessibilityLabel="confirmPassword"
                            value={values.confirmPassword}
                            errorStyle={{ color: 'red' }}
                            errorMessage={errors.confirmPassword && touched.confirmPassword ? <Text >{errors.confirmPassword}</Text> : ''}
                        />

                        <Spineer isLoading={loading} />
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
        marginTop: 20
    },
    inputText: {
        marginBottom: 4
    },
    scrollViewContent: {
        flexGrow: 1,
    },


});

