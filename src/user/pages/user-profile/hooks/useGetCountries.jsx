import React, { useState } from 'react'
import axios from "axios";
import { API_URL_USER } from "@env";
import { selectUserToken } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const useGetCountries = () => {

    const [countries, setCountries] = useState([]);
    const [countriesLoading, setCountriesLoading] = useState(true);

    const urlAPI = process.env.API_URL_USER;
    // const urlAPI = API_URL_USER;

    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };

    const fetchAllCountries = async () => {

        try {
            const response = await axios.get(`${urlAPI}/api/Geography/AllCountries`, tokenPayLoad);
            setCountries(response.data);
            setCountriesLoading(false);
        } catch (error) {
            console.error('Error fetching countries data:', error);
            setCountriesLoading(false);
        }
    };

    return { countries, countriesLoading, fetchAllCountries };
}
