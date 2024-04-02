import React from 'react'
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";




export const Home = ({ navigation }) => {
    return (
        <View style={styles.pantallaInicialSportapp}>
            <ImageBackground
                style={styles.image1Icon}
                resizeMode="cover"
                source={require('../../assets/inicio.png')}
            />
            <Text style={styles.sportApp}>
                <Text style={styles.sport}>Sport </Text>
                <Text style={styles.app}>App</Text>
            </Text>
            <Button
                style={styles.btnLarge}
                mode="contained"
                labelStyle={styles.btnLargeBtn}
                contentStyle={styles.btnLargeBtn1}
                onPress={() => navigation.navigate('Login')}
            >
                Empezar
            </Button>
            <Text style={styles.noTeLimites}>{`No te limites, desafiate a ti mismo
`}</Text>
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
        height: 45,
        width: 328,
    },
    image1Icon: {
        top: 76,
        left: 18,
        width: 336,
        height: 811,
        position: "absolute",
    },
    sport: {

    },
    app: {
        color: "#ea9354",
    },
    sportApp: {
        top: "8.15%",
        left: "21.4%",
        fontSize: 48,
        fontWeight: "600",

        textAlign: "left",
        position: "absolute",
    },
    btnLarge: {
        backgroundColor: '#EA9354',
        bottom: 105,
        left: 51,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        elevation: 4,
        shadowOpacity: 1,
        borderBottomColor: "",
        position: "absolute",
    },
    noTeLimites: {
        top: 179,
        left: 74,
        fontSize: 20,
        letterSpacing: 0,
        lineHeight: 24,

        textAlign: "center",
        width: 282,

        position: "absolute",
    },
    pantallaInicialSportapp: {
        backgroundColor: "#fff",
        flex: 1,
        width: "100%",
        height: 932,
        overflow: "hidden",
    },
});
