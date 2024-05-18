import React, { useState } from 'react'
import axios from "axios";
import { API_URL_USER } from "@env";
import { selectUserToken } from '../../../helpers/userSelectors';
import { useSelector } from 'react-redux';


export const useGetGenres = () => {

    const [genres, setGenres] = useState([]);
    const [genresLoading, setGenresLoading] = useState(true);

    const urlAPI = process.env.API_URL_USER;
    // const urlAPI = API_URL_USER;

    const token = (useSelector(selectUserToken));
    let tokenPayLoad = { headers: { Authorization: `Bearer ${token}` } };

    const fetchGenres = async () => {

        try {

            const response = await axios.get(`${urlAPI}/api/V1/Genres`, tokenPayLoad);
            setGenres(response.data);
            setGenresLoading(false);
        } catch (error) {
            console.error('Error fetching genres data:', error);
            setGenresLoading(false);
        }
    };


    return { genres, genresLoading, fetchGenres };
}
