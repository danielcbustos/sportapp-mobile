import axios from "axios";
import { useState } from "react";
// import { Alerts } from "../../Utils/Alerts";
import { API_URL_USER } from "@env";
import { AlertNotification } from "../../utils/AlertNotification";

const useRegisterUser = (initial) => {
  const urlAPI = API_URL_USER;
  const [loading, setLoading] = useState(false);
  const [userCreated, setUserCreated] = useState(false);
  const { showToastSuccess, showToastError } = AlertNotification();

  const createUser = async (newUser) => {
    try {
      setLoading(true);
      const response = await axios.post(
        `${urlAPI}/api/V1/Account/Register`,
        newUser
      );
      setUserCreated(true);
      showToastSuccess(
        "Tu registro fue un éxito",
        "Ya puedes iniciar sesión"
      );
      setLoading(false);

    } catch (error) {
      showToastError(
        "Algo sucedio",
        "Verifica todos los campos"
      );
      setUserCreated(false);

      setLoading(false);
    } finally {
      setLoading(false); // Ensure loading state is updated even on errors
    }

  };

  return {
    createUser,
    loading,
    userCreated,
  };
};

export default useRegisterUser;