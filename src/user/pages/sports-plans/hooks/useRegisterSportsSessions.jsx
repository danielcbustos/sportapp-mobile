import React from 'react'
import axios from "axios";
import { useState } from "react";
import { AlertNotification } from "../../../../utils/AlertNotification";
import { API_URL_USER } from "@env";
import { selectUserToken, selectUserId, selectUserName } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';

export const useRegisterSportsSessions = (navigation) => {
    const { showToastSuccess, showDialogError } = AlertNotification();
    const urlAPI = process.env.API_URL_USER;
    // const urlAPI = API_URL_USER
    const token = (useSelector(selectUserToken));
    const userName = (useSelector(selectUserName));
    const userId = (useSelector(selectUserId));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };
    const registerSportsSessions = async (totalTimeExcercise, totalCalories, ftp) => {
        const startDateTime = new Date().toISOString();
        const sportSession = {
            serviceId: "3fa85f64-5717-4562-b3fc-2c963f66afa6",
            serviceName: "Excercise-FastBurn",
            userId: userId,
            totalTimeExcercise: totalTimeExcercise,
            totalCalories: totalCalories,
            intensityId: "f0fa1aca-0936-4de6-90c0-96add874e03e",
            ftp: ftp,
            startDateTime: startDateTime,
            endDateTime: startDateTime
        };
        axios
            .post(`${urlAPI}/api/V1/RecordTrainingSession/Save`, sportSession, tokenPayLoad)
            .then((response) => {
                navigation.navigate('IndicatorsCalculation', {
                    totalCalories: totalCalories,
                    ftp: ftp,
                    totalTimeExcercise: totalTimeExcercise,
                });
                showToastSuccess(
                    `Excelente entrenamiento ${userName}`,
                    "Mira tu resumen de entrenamiento"
                );

            })
            .catch((error) => {
                showDialogError(
                    `Estamos presentando algunos problemas `,
                    "Recuerda iniciar tu entrenamiento"
                );
            });
    };
    return {
        registerSportsSessions
    };
}
