import React, { useEffect } from 'react'
import { ImageBackground, StyleSheet, Text, View } from "react-native";
import { Button } from "react-native-paper";
import { GlobalStyles } from '../../styles/GlobalStyles';



export const Home = ({ navigation }) => {

    return (
        <View style={GlobalStyles.sportApp}>
            <ImageBackground
                style={styles.image1Icon}
                resizeMode="cover"
                source={require('../../../assets/inicio.png')}
            />
            <Text style={styles.sportApp}>
                <Text >Sport </Text>
                <Text style={styles.app}>App</Text>
            </Text>
            <Text style={styles.noTeLimites}>No te limites, desafiate a ti{'\n'} mismo
            </Text>
            <Button
                style={styles.btnLarge}

                labelStyle={GlobalStyles.btnLayerStyle}
                contentStyle={GlobalStyles.btnLarge1}
                onPress={() => navigation.navigate('Login')}
            >
                Empezar
            </Button>

        </View>
    )
}

const styles = StyleSheet.create({

    image1Icon: {
        top: 85,
        left: 22,
        width: 320,
        height: 771,
        position: "absolute",
    },
    app: {
        color: "#ea9354",
    },
    sportApp: {
        fontSize: 48,
        fontWeight: "600",

    },
    btnLarge: {

        bottom: 105,
        shadowColor: "rgba(0, 0, 0, 0.25)",
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowRadius: 4,
        elevation: 4,
        shadowOpacity: 1,

        position: "absolute",
    },
    noTeLimites: {
        marginTop: 30,
        fontSize: 20,
        letterSpacing: 0,
        lineHeight: 24,
        textAlign: "center",

    },
});
