import React, { useEffect, useState } from 'react'

import { Button } from "react-native-paper";
import { StyleSheet, Text, ImageBackground, View, TouchableOpacity, Alert } from "react-native";
import { Input, Button as RNEButton } from "@rneui/themed";
import Icon from 'react-native-vector-icons/MaterialIcons';
import { GlobalStyles } from '../../styles/GlobalStyles';
import useLogin from '../hooks/useLogin';
import { Formik } from 'formik';
import * as yup from 'yup';


export const Login = ({ navigation }) => {

    const [formValues, setformValues] = useState(null);
    const { LoginUser, loadingUser, userLogged } = useLogin("");

    const initialValuesObject = {
        email: "",
        password: "",
    };

    const loginValidationSchema = yup.object().shape({
        email: yup
            .string()
            .required('El correo es requerido')
            .email('Formato de correo invalido'),
        password: yup
            .string()
            .required('La contraseña es requerida')
            .min(8, 'La contraseña debe tener mas de 8 caracteres'),
    });


    const submitLogin = async (values) => {
        await LoginUser(values);
    }

    useEffect(() => {
        if (userLogged) {
            setformValues(initialValuesObject);
            navigation.navigate('UserHome');
        }
    }, [userLogged]);

    return (
        <Formik
            initialValues={formValues || initialValuesObject}
            validationSchema={loginValidationSchema}
            onSubmit={values => { console.log(values); submitLogin(values); }}
            validateOnChange={true}
            validateOnBlur={true}

        >

            {({ handleChange, handleBlur, handleSubmit, errors, touched, values, isValid, }) => (
                <View style={[GlobalStyles.sportApp, GlobalStyles.container]}>
                    <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center', width: '100%' }}>
                        <TouchableOpacity onPress={() => navigation.goBack()} >
                            <Icon name="arrow-left" style={styles.icon} />
                        </TouchableOpacity>
                    </View>

                    <ImageBackground
                        style={styles.dog21Icon}
                        source={require("../../../assets/perro.png")}
                    />
                    <Input

                        placeholder="Correo"
                        leftIcon={{ name: "account-outline", type: "material-community", color: errors.email && touched.email ? 'red' : undefined }}
                        inputContainerStyle={errors.email && touched.email ? { borderColor: 'red' } : null}
                        onChangeText={handleChange('email')}
                        onBlur={handleBlur('email')}
                        value={values.email}
                        errorStyle={{ color: 'red' }}
                        errorMessage={errors.email && touched.email ? <Text >{errors.email}</Text> : ''}
                    />

                    <Input

                        placeholder="Contraseña"
                        leftIcon={{ name: "lock-outline", type: "material-community", color: errors.password && touched.password ? 'red' : undefined }}
                        inputContainerStyle={errors.password && touched.password ? { borderColor: 'red' } : null}
                        secureTextEntry={true}
                        onChangeText={handleChange('password')}
                        onBlur={handleBlur('password')}
                        value={values.password}
                        errorStyle={{ color: 'red' }}
                        errorMessage={errors.password && touched.password ? <Text >{errors.password}</Text> : ''}
                    />

                    <Button
                        style={styles.btnLarge}
                        labelStyle={GlobalStyles.btnLayerStyle}
                        contentStyle={GlobalStyles.btnLarge1}
                        onPress={handleSubmit}
                        disabled={!isValid}
                    >
                        Iniciar sesión
                    </Button>


                    <Text
                        style={[styles.olvidasteTuContrasea, styles.aunNoTienesTypo]}
                    >¿Olvidaste tu contraseña? </Text>

                    <RNEButton
                        title=" Click  aquí"
                        radius="5"
                        iconPosition="left"
                        type="clear"
                        color="#000"
                        titleStyle={styles.clickAquBtn}
                        containerStyle={styles.clickAquBtn1}
                    />


                    <Text style={[styles.aunNoTienes, styles.aunNoTienesTypo]}>
                        ¿Aun no tienes cuenta?
                    </Text>

                    <RNEButton
                        title=" Registrate  aquí"
                        radius="5"
                        iconPosition="left"
                        type="clear"
                        color="#000"
                        titleStyle={styles.registrateAquBtn}
                        containerStyle={styles.registrateAquBtn1}
                        onPress={() => navigation.navigate('SignUp')}
                    />
                </View>
            )}
        </Formik>

    );

}
const styles = StyleSheet.create({



    registrateAquBtn: {
        color: "#000",
        fontSize: 14,
    },
    registrateAquBtn1: {
        left: 232,
        top: 722,
        position: "absolute",
    },

    clickAquBtn: {
        color: "#000",
        fontSize: 12,
    },
    clickAquBtn1: {
        left: 250,
        top: 671,
        position: "absolute",
    },

    aunNoTienesTypo: {
        textAlign: "center",
        color: '#000000',
        lineHeight: 24,
        letterSpacing: 0,
        position: "absolute",
    },
    btnLarge: {
        marginTop: 30
    },
    aunNoTienes: {
        top: 722,
        left: 65,

    },
    dog21Icon: {

        width: 284,
        height: 272,

    },
    olvidasteTuContrasea: {
        top: 671,
        left: 96,
        fontSize: 12,
    },

    icon: {
        fontSize: 42,
        color: '#EA9354',
    },


});

