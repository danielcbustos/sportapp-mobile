import { AnimatedCircularProgress } from 'react-native-circular-progress';
import React from 'react'
import { Text } from 'react-native';

export const CircularProgress = ({ fill, marginLeft, text }) => {
    return (
        <AnimatedCircularProgress
            size={150}
            width={15}
            fill={fill}
            rotation={360}
            tintColor="#EA9354"
            duration={800}
            backgroundColor="#5DADE2"
            style={{ marginLeft }}
        >
            {
                () => (
                    <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>{`${text}`}</Text> // Aquí el texto es dinámico
                )
            }
        </AnimatedCircularProgress>
    )
}
