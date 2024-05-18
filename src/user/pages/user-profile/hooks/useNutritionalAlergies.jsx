import React, { useState } from 'react'
import axios from "axios";
import { API_URL_USER } from "@env";
import { selectUserToken } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const useNutritionalAlergies = () => {

    const [nutritionalAllergies, setNutritionalAllergies] = useState([]);
    const [allergiesLoading, setAllergiesLoading] = useState(true);

    const urlAPI = process.env.API_URL_USER;
    // const urlAPI = API_URL_USER;

    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };

    const fetchNutritionalAllergies = async () => {

        try {

            const response = await axios.get(`${urlAPI}/api/V1/NutricionalAllergy`, tokenPayLoad);
            setNutritionalAllergies(response.data);
            setAllergiesLoading(false);
        } catch (error) {
            console.error('Error fetching Nutricional Allergies data:', error);
            setAllergiesLoading(false);
        }
    };


    return { nutritionalAllergies, allergiesLoading, fetchNutritionalAllergies };
}
