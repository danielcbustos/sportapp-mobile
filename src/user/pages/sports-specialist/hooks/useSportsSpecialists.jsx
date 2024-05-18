import axios from "axios";
import { useState } from "react";
import { AlertNotification } from "../../../../utils/AlertNotification";
import { API_URL_SERVICE } from "@env";

export const useSportsSpecialists = () => {
    // const urlAPI = process.env.REACT_APP_API_URL_SERVICE;
    const urlAPI = API_URL_SERVICE
    const { showDialogError } = AlertNotification();
    const [sportsSpecialist, setSportsSpecialist] = useState([]);
    const [loadSportsSpecialist, setLoadSportsSpecialist] = useState(true);
    const [errorInSportsSpecialist, setErrorInSportsSpecialist] = useState(false);

    const getSportsSpecialist = async (selectedDate) => {
        setLoadSportsSpecialist(true);
        const querySpecialists = {
            serviceTypes: ["66e0bbd9-227e-4d31-bb5f-4fbfb4a46a95"],
            startDateTime: selectedDate,
            endDateTime: selectedDate,

        };

        axios
            .post(`${urlAPI}/api/v1/productService/getFilteredList`, querySpecialists)
            .then((response) => {
                const specialists = response.data;
                setSportsSpecialist(specialists);
                setLoadSportsSpecialist(false);
                setErrorInSportsSpecialist(false);
            })
            .catch((error) => {
                setErrorInSportsSpecialist(true);
                setLoadSportsSpecialist(false);
                showDialogError(
                    "Algo sucedio...",
                    "Lo sentimos no pudimos traer los deportologos intenta en otro momento"
                );
            });
    };

    return {
        sportsSpecialist,
        loadSportsSpecialist,
        errorInSportsSpecialist,
        getSportsSpecialist,
    };
};
