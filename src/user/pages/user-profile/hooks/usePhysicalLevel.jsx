import React, { useState } from 'react'
import axios from "axios";
import { API_URL_USER } from "@env";
import { selectUserToken } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const usePhysicalLevel = () => {

    const [physicalLevel, setPhysicalLevel] = useState([]);
    const [physicalLevelLoading, setPhysicalLevelLoading] = useState(true);

    const urlAPI = process.env.API_URL_USER;
    // const urlAPI = API_URL_USER;

    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };

    const fetchPhysicalLevels = async () => {

        try {
            const response = await axios.get(`${urlAPI}/api/V1/PhysicalLevel`, tokenPayLoad);
            setPhysicalLevel(response.data);
            setPhysicalLevelLoading(false);
        } catch (error) {
            console.error('Error fetching physical levels data:', error);
            setPhysicalLevelLoading(false);
        }
    };

    return { physicalLevel, physicalLevelLoading, fetchPhysicalLevels };
}
