import React from 'react'
import Spinner from 'react-native-loading-spinner-overlay';
export const Spineer = ({ isLoading }) => {
    return (
        <Spinner
            visible={isLoading}
            textContent={'Cargando...'}
            textStyle={{ color: '#FFF' }}
        />
    )
}
