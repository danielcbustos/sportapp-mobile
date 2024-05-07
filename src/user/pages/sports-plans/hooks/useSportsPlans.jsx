import axios from "axios";
import { useState } from "react";
import { AlertNotification } from "../../../../utils/AlertNotification";
import { API_URL_SERVICE } from "@env";
// const urlAPI = process.env.REACT_APP_API_URL_SERVICE;
export const useSportsPlans = () => {
    const urlAPI = "http://192.168.0.6:32772"
    const { showDialogError } = AlertNotification();
    const [mealPlansByUser, setMealPlansByUser] = useState([]);
    const [loadMealPlans, setLoadMealPlans] = useState(true);
    const [errorInMealPlans, setErrorInMealPlans] = useState(false);

    const getSportsPlans = async () => {
        setLoadMealPlans(true);
        const querySportsPlans = {
            serviceTypes: ["3040214a-a77d-4549-8f67-6b51f7755a3e"],
        };
        axios
            .post(`${urlAPI}/api/v1/productService/getFilteredList`, querySportsPlans)
            .then((response) => {
                const sportsPLans = response.data;
                setMealPlansByUser(sportsPLans);
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
        getSportsPlans,
    };
};
