import React, { useState } from 'react'
import axios from "axios";
import { API_URL_USER } from "@env";
import { selectUserToken } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const useTypesOfNutrition = () => {

    const [typesOfNutrition, setTypesOfNutrition] = useState([]);
    const [nutritionLoading, setNutritionLoading] = useState(true);

    const urlAPI = process.env.API_URL_USER;
    // const urlAPI = API_URL_USER;

    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };

    const fetchTypesOfNutrition = async () => {

        try {

            const response = await axios.get(`${urlAPI}/api/V1/TypeOfNutrition`, tokenPayLoad);
            setTypesOfNutrition(response.data);
            setNutritionLoading(false);
        } catch (error) {
            console.error('Error fetching Types of nutrition data:', error);
            setNutritionLoading(false);
        }
    };


    return { typesOfNutrition, nutritionLoading, fetchTypesOfNutrition };
}
