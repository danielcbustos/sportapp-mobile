

import axios from "axios";
import { useState } from "react";
import { AlertNotification } from "../../utils/AlertNotification";
import { API_URL_SERVICE } from "@env";

export const useSportEvents = (userId) => {
    const urlAPI = API_URL_SERVICE
    const { showDialogError } = AlertNotification();
    const [eventsByUser, setEventsByUser] = useState([]);
    const [loadEvents, setLoadEvents] = useState(true);
    const [errorInEvents, setErrorInEvents] = useState(false);

    const getEvents = async (selectedDate) => {
        setLoadEvents(true);
        const queryEvents = {
            user: userId,
            serviceTypes: ["93fc91b3-47dd-49e8-9589-01671491cc73"],
            startDateTime: selectedDate,
            endDateTime: selectedDate,

        };
        axios
            .post(`${urlAPI}/api/v1/productService/getFilteredList`, queryEvents)
            .then((response) => {
                const events = response.data;
                setEventsByUser(events);
                setLoadEvents(false);
                setErrorInEvents(false);
            })
            .catch((error) => {
                setErrorInEvents(true);
                setLoadEvents(false);
                showDialogError(
                    "Algo sucedio...",
                    "Lo sentimos no pudimos traer los eventos intenta en otro momento"
                );
            });
    };

    return {
        eventsByUser,
        loadEvents,
        errorInEvents,
        getEvents,
    };
};
