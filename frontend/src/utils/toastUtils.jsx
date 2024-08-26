import "react-toastify/dist/ReactToastify.css";
import { toast } from 'react-toastify'
import { FaCheckCircle } from 'react-icons/fa';

export const sucessToast = (message) => {
    toast.success(message, {
      autoClose: 2500,
      hideProgressBar: true, // timer
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      className: "custom-toast-success",
      style: {
        backgroundColor: "#2c3f1b",
        color: "#fff",
    }})

}

export const errorToast = (message) => {
    toast.error(message, {
      autoClose: 2500,
      hideProgressBar: true, // timer
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "dark",
    });
}

export const rideAcceptToast = (message) => {
    toast.success(message, {
      autoClose: 2500,
      hideProgressBar: true, // timer
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      icon: <FaCheckCircle color="#4B5878" />,
      className: "custom-toast-success",
      style: {
        backgroundColor: "#3D4A6A",
        color: "#fff",
    }})

}