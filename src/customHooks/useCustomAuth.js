import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { axiosInstance } from "../api/axiosinstance.config";
import { endpoints } from "../api/endpoints";
import useNotification from "./useNotification";

const useAuth = () => {
  const [loading, setloading] = useState(false);
  const { onNotify } = useNotification();
  const navigate = useNavigate();
  const location = useLocation();

  //   function to call for sign up
  const onAuth = async (request) => {
    console.log("Form values", request);

    // Define the endpoint based on request parameters
    let endpoint;
    // Check if the current route is not "/admin/signin"
    if (location.pathname !== "/admin/signin") {
      // Determine endpoint based on the presence of firstName/lastName
      if (request.firstName || request.lastName) {
        endpoint = endpoints.auth.signup;
      } else {
        endpoint = endpoints.auth.signin;
      }
    } else {
      // If the route is "/admin/signin", set admin-specific endpoint
      endpoint = endpoints.auth.adminsignin;
    }

    try {
      const response = await axiosInstance.post(endpoint, request);

      if (response.data?.responseCode === "00") {
        // console.log(response.data?.response);
        onNotify("success", "Successful", response?.data?.responseMessage);

        // collect the data and store them
        console.log(endpoint);
        localStorage.clear();
        localStorage.setItem("***", response.data?.data?.token);
        localStorage.setItem("firstName", response.data?.data?.firstName);
        localStorage.setItem("lastName", response.data?.data?.lastName);
        localStorage.setItem("email", response.data?.data?.email);
        localStorage.setItem("userName", response.data?.data?.userName);
        localStorage.setItem("phone", response.data?.data?.phone);
        localStorage.setItem(
          "verificationStatus",
          response.data?.data?.verificationStatus
        );

        // upon completion
        setloading(false);

        setTimeout(() => {
          if (location.pathname === "/admin/signin") {
            return navigate("/admin/dashboard");
          } else {
            return navigate("/user/dashboard");
          }
        }, 2000);
      } else {
        console.log(endpoint);
        onNotify("error", "Error occured", response?.data?.responseMessage);
        // upon failure
        setloading(false);
      }
    } catch (error) {
      console.error(error);
      setloading(false); // upon failure
      onNotify("error", "Error occured", error.response?.data?.responseMessage);
    }
  };

  return {
    onAuth,
    loading,
  };
};

export { useAuth };
