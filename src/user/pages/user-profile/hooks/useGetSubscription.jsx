import React, { useState } from 'react'
import axios from "axios";
import { API_URL_SERVICE } from "@env";
import { selectUserId } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const useGetSubscription = () => {
    const userId = useSelector(selectUserId)
    const [userSubscription, setUserSubscription] = useState();
    const [getSubscriptionLoading, setGetSubscriptionLoading] = useState(true);

    // const urlAPI = process.env.API_URL_SERVICE;
    const urlAPI = API_URL_SERVICE;
    // const urlAPI = "http://192.168.0.7:32770";
    const fetchUserSubscription = async () => {
        try {
            const response = await axios.get(`${urlAPI}/api/v1/subscription/${userId}`);
            setUserSubscription(response.data);
            setGetSubscriptionLoading(false);


        } catch (error) {
            console.error('Error fetching User Subscription data:', error);
            setGetSubscriptionLoading(false);


        }
    };

    return { userSubscription, getSubscriptionLoading, fetchUserSubscription };
}
