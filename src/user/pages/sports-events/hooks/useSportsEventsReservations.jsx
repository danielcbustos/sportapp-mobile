import axios from "axios";
import { useState } from "react";
import { AlertNotification } from "../../../../utils/AlertNotification";
import { API_URL_SERVICE } from "@env";

export const useSportsEventsReservations = (userId) => {
    // const urlAPI = process.env.REACT_APP_API_URL_SERVICE;
    const urlAPI = API_URL_SERVICE
    const { showDialogError } = AlertNotification();
    const [eventsReservationsByUser, setEventsReservationsByUser] = useState([]);
    const [loadEvents, setLoadEvents] = useState(true);
    const [errorInEvents, setErrorInEvents] = useState(false);

    const getEventsReservations = async () => {
        setLoadEvents(true);
        const queryEvents = {
            userId: userId,
            serviceTypes: ["93fc91b3-47dd-49e8-9589-01671491cc73"]
        };

        axios
            .post(`${urlAPI}/api/v1/productService/getFilteredList`, queryEvents)
            .then((response) => {
                const events = response.data;
                setEventsReservationsByUser(events);
                setLoadEvents(false);
                setErrorInEvents(false);
            })
            .catch((error) => {
                setErrorInEvents(true);
                setLoadEvents(false);
                showDialogError(
                    "Algo sucedio...",
                    "Lo sentimos no pudimos traer tus reservas de eventos"
                );
            });
    };

    return {
        eventsReservationsByUser,
        loadEvents,
        errorInEvents,
        getEventsReservations,
    };
};
