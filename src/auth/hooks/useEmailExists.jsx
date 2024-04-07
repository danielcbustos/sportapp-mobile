import { useState } from "react";
import axios from "axios";
import { API_URL_USER } from "@env";

const useEmailExists = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [emailExists, setEmailExists] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const urlAPI = API_URL_USER;

  const validateEmail = async (email) => {
    setIsSubmitting(true);
    try {
      const response = await axios.get(`${urlAPI}/api/V1/Account/is-email-unique/${email.trim()}`);
      setEmailExists(response.data);
      setErrorMessage("");
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return {
    isSubmitting,
    emailExists,
    errorMessage,
    validateEmail,
  };
};

export default useEmailExists;