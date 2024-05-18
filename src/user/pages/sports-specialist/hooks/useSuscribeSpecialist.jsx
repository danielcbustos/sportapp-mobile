import React from 'react'
import axios from "axios";
import { useState } from "react";
import { AlertNotification } from "../../../../utils/AlertNotification";
import { API_URL_USER } from "@env";
import { selectUserToken, selectUserId } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';

export const useSuscribeSpecialist = (navigation) => {
    const { showDialogError, showToastSuccess } = AlertNotification();
    const [specialistSuscription, setSpecialistSuscription] = useState(false);
    const urlAPI = process.env.API_URL_USER;
    // const urlAPI = API_URL_USER
    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };
    const suscribeSpecialist = async (specialist) => {
        axios
            .post(`${urlAPI}/api/V1/EventSuscription`, specialist, tokenPayLoad)
            .then((response) => {
                if (response.data.suscribed) {
                    navigation.navigate('UserHome');
                    showToastSuccess(
                        `Tu agendamiento con el ${specialist.name} fue exitoso `,
                        "Recuerda llegar 10 min anticipado"
                    );
                } else {

                    showDialogError(
                        `Ya tienes agenda con el ${specialist.name} `,
                        "Agenda otro día"
                    );
                }


            })
            .catch((error) => {
                showDialogError(
                    `Problemas en tu reserva con el ${specialist.name} `,
                    "Lo sentimos no pudimos hacerla , intentalo de nuevo mas tarde."
                );
            });
    };
    return {
        specialistSuscription,
        suscribeSpecialist
    };
}
