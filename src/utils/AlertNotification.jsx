import React from 'react'
import { ALERT_TYPE, Dialog, Toast } from 'react-native-alert-notification';
export const AlertNotification = () => {
    const showToastSuccess = (title, textBody) => {
        Toast.show({
            type: ALERT_TYPE.SUCCESS,
            title,
            textBody,
            autoClose: 6000,
            titleStyle: {
                fontSize: 18,
            },
            textBodyStyle: {
                fontSize: 16,
            },


        })
    };

    const showToastError = (title, textBody) => {

        Toast.show({
            type: ALERT_TYPE.DANGER,
            title,
            textBody,
            autoClose: 6000,
            titleStyle: {
                fontSize: 18,
            },
            textBodyStyle: {
                fontSize: 16,
            },



        })
    };
    const showDialogSuccess = (title, textBody) => {
        Dialog.show({
            type: ALERT_TYPE.SUCCESS,
            title,
            textBody,
            button: 'Cerrar',


        })
    };

    const showDialogError = (title, textBody) => {

        Dialog.show({
            type: ALERT_TYPE.DANGER,
            title,
            textBody,
            button: 'Cerrar',

        })
    };


    return {
        showToastSuccess,
        showToastError,
        showDialogSuccess,
        showDialogError,

    }
}
