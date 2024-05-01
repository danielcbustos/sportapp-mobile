import React, { useState } from 'react'
import axios from "axios";
import { API_URL_USER } from "@env";
import { selectUserToken, selectUserId } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const useGetUserProfile = () => {
    const userId = useSelector(selectUserId)
    const [userProfile, setUserProfile] = useState();
    const [getUserLoading, setGetUserLoading] = useState(true);

    // const urlAPI = process.env.API_URL_USER;
    const urlAPI = API_URL_USER;

    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };

    const fetchUserProfile = async () => {

        try {
            const response = await axios.get(`${urlAPI}/api/V1/UserSportProfile/${userId}`, tokenPayLoad);
            response.data.dateOfBirth = response.data.dateOfBirth.slice(0, 10);
            setUserProfile(response.data);
            setGetUserLoading(false);
        } catch (error) {
            console.error('Error fetching User Profile data:', error);
            setGetUserLoading(false);
        }
    };


    return { userProfile, getUserLoading, fetchUserProfile };
}
