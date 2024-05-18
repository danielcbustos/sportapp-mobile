import React, { useState } from 'react'
import axios from "axios";
import { API_URL_USER } from "@env";
import { selectUserToken } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const useGetGoals = () => {

    const [goal, setGoals] = useState([]);
    const [goalLoading, setGoalLoading] = useState(true);

    const urlAPI = process.env.API_URL_USER;
    // const urlAPI = API_URL_USER;

    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };

    const fetchGoals = async () => {

        try {

            const response = await axios.get(`${urlAPI}/api/V1/Goal`, tokenPayLoad);
            setGoals(response.data);
            setGoalLoading(false);
        } catch (error) {
            console.error('Error fetching goals data:', error);
            setGoalLoading(false);
        }
    };


    return { goal, goalLoading, fetchGoals };
}
