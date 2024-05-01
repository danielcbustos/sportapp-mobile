import React, { useState } from 'react'
import axios from "axios";
import { API_URL_USER } from "@env";
import { selectUserToken } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const useGoalTracking = () => {

    const [goalTracking, setGoalTracking] = useState("");
    const [goalTrackingLoading, setGoalTrackingLoading] = useState(true);

    // const urlAPI = process.env.API_URL_USER;
    const urlAPI = API_URL_USER;

    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };

    const fetchGoalTracking = async (userId) => {

        try {
            const response = await axios.get(`${urlAPI}/api/V1/UserGoalTracking/GetByUserId/${userId}`, tokenPayLoad);
            setGoalTracking(response.data);
            setGoalTrackingLoading(false);
        } catch (error) {
            console.error('Error fetching Goal Tracking data:', error);
            setGoalTrackingLoading(false);
        }
    };


    return { goalTracking, goalTrackingLoading, fetchGoalTracking };
}
