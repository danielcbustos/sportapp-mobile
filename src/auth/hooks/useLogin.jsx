import { useState } from "react";
import axios from "axios";
import { API_URL_USER } from "@env";
import { AlertNotification } from "../../utils/AlertNotification";
import { useDispatch } from "react-redux";
import { setUserState } from "../../../store/sessionUser/sessionUserSlice";

const useLogin = () => {

    const { showToastSuccess, showToastError, showDialogSuccess, showDialogError } = AlertNotification();
    const dispatch = useDispatch();
    const [loadingUser, setLoadingUser] = useState(false);

    const [userLogged, setUserLogged] = useState(false);
    const [error, setError] = useState(null);
    const urlAPI = API_URL_USER;

    // const urlAPI = "http://localhost:5088"

    const LoginUser = async (formCredentials) => {
        setLoadingUser(true);
        setError(null);
        setUserLogged(false);

        try {
            const response = await axios.post(
                `https://sportappusersapi.azurewebsites.net/api/V1/Account/Login`,
                formCredentials
            );
            dispatch(setUserState(response.data));
            setUserLogged(true);
            showMessageForLogin(response.data.name);

        } catch (error) {
            setUserLogged(false);
            showErrorMessage();
            setError(error);
        } finally {
            setLoadingUser(false);
        }
    };

    const showMessageForLogin = (name) => {
        showToastSuccess("¡Inicio de sesión exitoso!", `¡Bienvenido ${name}!, disfruta de Sport App`);

    };

    const showErrorMessage = () => {
        showDialogError(
            "¡Credenciales Incorrectas!", "Por favor intentalo de nuevo",
        );

    };

    return {
        LoginUser,
        loadingUser,
        error,
        userLogged,
    };
};

export default useLogin;