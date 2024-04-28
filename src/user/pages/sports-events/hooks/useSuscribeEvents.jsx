import React from 'react'
import axios from "axios";
import { useState } from "react";
import { AlertNotification } from "../../../../utils/AlertNotification";
import { API_URL_USER } from "@env";
import { selectUserToken, selectUserId } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';

export const useSuscribeEvents = (navigation) => {

    const { showDialogError, showToastSuccess } = AlertNotification();
    const [eventSuscription, setEventSuscription] = useState(false);
    const urlAPI = API_URL_USER
    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };
    const suscribeEvent = async (event) => {
        axios
            .post(`${urlAPI}/api/V1/EventSuscription`, event, tokenPayLoad)
            .then((response) => {
                if (response.data.suscribed) {
                    navigation.navigate('UserHome');
                    showToastSuccess(
                        `Tu inscripcion en el evento ${event.name} fue exitosa `,
                        "Puedes registrarte en mas eventos"
                    );
                } else {

                    showDialogError(
                        `Ya estas registrado en el evento ${event.name} `,
                        "Puedes registrarte en otros eventos"
                    );
                }


            })
            .catch((error) => {
                showDialogError(
                    `Problemas en tu inscripcion ${event.name} `,
                    "Lo sentimos no pudimos hacerla , intentalo de nuevo mas tarde."
                );
            });
    };
    return {
        eventSuscription,
        suscribeEvent
    };
}
