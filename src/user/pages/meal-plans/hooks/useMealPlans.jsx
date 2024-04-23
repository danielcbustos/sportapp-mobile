

import axios from "axios";
import { useState } from "react";
import { AlertNotification } from "../../../../utils/AlertNotification";
import { API_URL_SERVICE } from "@env";

export const useMealPlans = () => {
    const urlAPI = API_URL_SERVICE
    const { showDialogError } = AlertNotification();
    const [mealPlansByUser, setMealPlansByUser] = useState([]);
    const [loadMealPlans, setLoadMealPlans] = useState(true);
    const [errorInMealPlans, setErrorInMealPlans] = useState(false);


    const getMealPlans = async (userId) => {
        setLoadMealPlans(true);
        const queryMealPlans = {
            user: userId,
            serviceTypes: ["01B50F0D-3226-4DF2-B912-4DA4B37D9BD9"],
        };
        axios
            .post(`${urlAPI}/api/v1/productService/getFilteredList`, queryMealPlans)
            .then((response) => {
                const mealPLans = response.data;
                setMealPlansByUser(mealPLans);
                setLoadMealPlans(false);
                setErrorInMealPlans(false);
            })
            .catch((error) => {
                setErrorInMealPlans(true);
                setLoadMealPlans(false);
                showDialogError(
                    "Algo sucedio...",
                    "Lo sentimos no pudimos traer los planes alimenticios intenta en otro momento"
                );
            });
    };

    return {
        mealPlansByUser,
        loadMealPlans,
        errorInMealPlans,
        getMealPlans,
    };
};
