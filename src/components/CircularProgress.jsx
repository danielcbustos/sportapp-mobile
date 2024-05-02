import React from 'react'
import AnimatedProgressWheel from 'react-native-progress-wheel';
export const CircularProgress = ({ progress, subtitle, max, labelStyle, subtitleStyle }) => {
    return (
        <AnimatedProgressWheel

            size={150}
            width={15}
            showProgressLabel={true}
            progress={progress}
            rotation={"-90deg"}
            subtitle={subtitle}
            max={max}
            color="#EA9354"
            duration={800}
            backgroundColor="#5DADE2"
            labelStyle={labelStyle}
            subtitleStyle={subtitleStyle}
        >
        </AnimatedProgressWheel>
    )
}
