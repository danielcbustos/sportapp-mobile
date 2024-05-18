import React, { useState } from 'react'
import axios from "axios";
import { API_URL_USER } from "@env";
import { selectUserToken, selectUserId } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';
import { AlertNotification } from '../../../../utils/AlertNotification';


export const useUpdateMealProfile = () => {
    const [mealProfileLoading, setMetProfileLoading] = useState(false);
    const [mealProfileUpdated, setMealProfileUpdated] = useState(false);
    const { showToastSuccess, showToastError } = AlertNotification();
    const urlAPI = process.env.API_URL_USER;
    // const urlAPI = API_URL_USER;

    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };

    const updateMealProfile = async (updUser) => {

        try {
            setMetProfileLoading(true);
            const response = await axios.put(`${urlAPI}/api/V1/UserSportProfile`, updUser, tokenPayLoad);
            setMealProfileUpdated(true);
            showToastSuccess(
                "Tú perfil fue actualizado con éxito",
                "Continua disfrutando de SportApp"
            );
            setMetProfileLoading(false);
            setMealProfileUpdated(false);
        } catch (error) {
            showToastError(
                "Algo sucedio",
                "Verifica todos los campos"
            );
            setMealProfileUpdated(false);
            setMetProfileLoading(false);
        } finally {
            setMetProfileLoading(false);
        }
    };


    return { mealProfileUpdated, mealProfileLoading, updateMealProfile };
}
