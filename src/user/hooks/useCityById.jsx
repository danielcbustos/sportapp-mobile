import React, { useState } from 'react'
import axios from "axios";
import { API_URL_USER } from "@env";
import { selectUserToken } from '../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const useCityByUser = () => {

    // const [isSubmitting, setIsSubmitting] = useState(false);
    const [cityName, setCityName] = useState("");
    const [loading, setLoading] = useState(true);


    const urlAPI = API_URL_USER;

    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };

    const fetchCity = async (cityId) => {

        try {

            const response = await axios.get(`${urlAPI}/api/Geography/CitiesById/${cityId}`, tokenPayLoad);
            setCityName(response.data);
            setLoading(false);
        } catch (error) {
            console.error('Error fetching city data:', error);
            setLoading(false);
        }
    };


    return { cityName, loading, fetchCity };
}
