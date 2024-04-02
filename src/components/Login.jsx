import React from 'react'

import { Button as RNPButton } from "react-native-paper";
import { StyleSheet, Text, ImageBackground, View } from "react-native";
import { Input, Button as RNEButton } from "@rneui/themed";
// import { Button, Icon } from "@ui-kitten/components";
// import { Color, FontFamily, FontSize } from "../GlobalStyles";

export const Login = ({ navigation }) => {
    return (

        <View style={styles.loginSportapp}>
            <RNPButton
                style={styles.btnLarge}
                mode="contained"
                labelStyle={styles.btnLargeBtn}
                contentStyle={styles.btnLargeBtn1}
            >
                Iniciar sesión
            </RNPButton>
            <Text style={[styles.aunNoTienes, styles.aunNoTienesTypo]}>
                ¿Aun no tienes cuenta?
            </Text>
            <Input
                value="Usuario"
                placeholder="Usuario"
                required={true}
                leftIcon={{ name: "account-outline", type: "material-community" }}
                inputStyle={{ color: "rgba(39, 52, 49, 0.6)" }}
                containerStyle={styles.textFieldOutlineTextInput}
            />
            <Input
                value="Contraseña"
                placeholder="Contraseña"
                required={true}
                leftIcon={{ name: "lock-outline", type: "material-community" }}
                inputStyle={{ color: "rgba(39, 52, 49, 0.6)" }}
                containerStyle={styles.textFieldOutlineText1Input}
            />
            <ImageBackground
                style={styles.dog21Icon}
                resizeMode="cover"
                source={require("../../assets/perro.png")}
            />
            <RNEButton
                title=" Registrate  aquí"
                radius="5"
                iconPosition="left"
                type="clear"
                color="#000"
                titleStyle={styles.registrateAquBtn}
                containerStyle={styles.registrateAquBtn1}
                buttonStyle={styles.registrateAquBtn2}
                onPress={() => navigation.navigate('SignUp')}
            />
            <RNEButton
                title=" Click  aquí"
                radius="5"
                iconPosition="left"
                type="clear"
                color="#000"
                titleStyle={styles.clickAquBtn}
                containerStyle={styles.clickAquBtn1}
                buttonStyle={styles.clickAquBtn2}
            />
            <Text
                style={[styles.olvidasteTuContrasea, styles.aunNoTienesTypo]}
            >{`¿Olvidaste tu contraseña? `}</Text>
            {/* <Button
                style={styles.arrowCircleChevronLeft}
                size="3x"
                status="primary"
                appearance="outline"
                color="#ea9354"
                accessoryLeft={
                    <Icon name="arrow-left-circle-outline" pack="material" />
                }
            /> */}
        </View>
    )
}
const styles = StyleSheet.create({
    btnLargeBtn: {
        color: "#fcfcfc",
        fontSize: 16,
        fontWeight: "700",
    },
    btnLargeBtn1: {
        backgroundColor: '#EA9354',
        height: 45,
        width: 328,

    },
    textFieldOutlineTextInput: {
        left: "11.86%",
        right: "11.86%",
        width: "76.28%",
        height: "6.01%",
        top: "48.78%",
        bottom: "47.21%",
        position: "absolute",
    },
    textFieldOutlineText1Input: {
        left: "11.86%",
        right: "11.86%",
        width: "76.28%",
        height: "6.01%",
        top: "55.65%",
        bottom: "40.67%",
        position: "absolute",
    },
    registrateAquBtn: {
        color: "#000",
        fontSize: 14,
    },
    registrateAquBtn1: {
        left: 232,
        top: 722,
        position: "absolute",
    },
    registrateAquBtn2: {},
    clickAquBtn: {
        color: "#000",
        fontSize: 12,
    },
    clickAquBtn1: {
        left: 250,
        top: 671,
        position: "absolute",
    },
    clickAquBtn2: {},
    aunNoTienesTypo: {
        textAlign: "center",


        color: '#000000',

        lineHeight: 24,
        letterSpacing: 0,
        position: "absolute",
    },
    btnLarge: {
        bottom: 240,
        left: 51,
        position: "absolute",
    },
    aunNoTienes: {
        top: 722,
        left: 65,

    },
    dog21Icon: {
        top: 129,
        left: 67,
        width: 284,
        height: 272,
        position: "absolute",
    },
    olvidasteTuContrasea: {
        top: 671,
        left: 96,
        fontSize: 12,
    },
    arrowCircleChevronLeft: {
        height: "3.43%",
        width: "7.44%",
        top: "6.97%",
        right: "83.72%",
        bottom: "89.59%",
        left: "8.84%",
        position: "absolute",
    },
    loginSportapp: {

        backgroundColor: '#fff',
        flex: 1,
        width: "100%",
        height: 932,
        overflow: "hidden",
    },
});

