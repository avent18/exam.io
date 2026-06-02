import {ServerUrl } from "../App"
import axios from "axios"
import {setUserData} from '../redux/userSlice'


export const CREDITS_BEFORE_PAYMENT_KEY = "examio_credits_before_payment";

export const getCurrentUser = async (dispatch) => {
  try {
    const response = await axios.get(`${ServerUrl}/api/user/getCurrentUser`, {
      withCredentials: true,
    });
    dispatch(setUserData(response.data));
    return response.data;
  } catch (error) {
    console.error(error);
    return null;
  }
};

/** Refetch user — use after Stripe payment (webhook may take a few seconds) */
export const refreshUserCredits = async (dispatch) => getCurrentUser(dispatch);

export const generateNotes = async(payload)=>{
  try {
    const result = await axios.post(`${ServerUrl}/api/generate/generateNotes`, payload, {
      withCredentials: true,
    });
    return result.data;
  } catch (error) {
    console.error(error.response?.data || error.message);
    throw error;
  }
}


export const getHistoryNotes = async () => {
  const response = await axios.get(`${ServerUrl}/api/generate/getNotes`, {
    withCredentials: true,
  });
  return response.data;
};

export const downloadPDF = async(payload) =>{
  try{
    const response = await axios.post(`${ServerUrl}/api/pdf/generate-pdf`, payload, {
      withCredentials: true,
      responseType: "blob", // Important for handling binary data
    });

    const blob = new Blob([response.data], { type: "application/pdf" });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "ExamIo.pdf";
    link.click();
    window.URL.revokeObjectURL(url); // Clean up the URL object
    return response.data; 
  } catch (error) {
    const text = await error.response?.data?.text();
    console.log(text);
    console.error(error.response?.data || error.message);
    throw error;
  }
}