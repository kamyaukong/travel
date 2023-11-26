// /src/components/users/UserLogon.js
import { useState } from "react";
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../routers/Authentication';
import FormGenerator from "../common/FormGenerator";
import callApi from "../../routers/api";

// import "./UserLogon.css";

const UserLogon = () => {
  const [logonData, setValues] = useState({
    userID: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });
  const { login, setUserID } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setValues({ ...logonData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const data = await callApi(`/users/logon`, 'POST', logonData);
      console.log("Logon data: ", data);
      if (!data) {
        setIsSubmitting(false);
        setStatusMessage({
          message: data.message || "Invalid credentials",
          type: "E",
        });
      } else {
        // Save token to local storage
        const receivedToken = data.token;
        localStorage.setItem('token', receivedToken); 
        if(setUserID) setUserID(logonData.userID);
        login(receivedToken, logonData.userID);
        navigate(`/itinerary`);
      }
    } catch (error) {
      console.error("Error during logon: ", error);
      setIsSubmitting(false);
      setStatusMessage({ message: "System error: " + error.message, type: "E" });
    }
  };

  /*
  const handleRegisterClick = () => {
    // Redirect to the register URL
    navigate("/register");
  };
  */
  return (
    <div className="UserLoginForm">
      <form onSubmit={handleSubmit}>
        <h1>Logon</h1>
        <FormGenerator
                item={logonData}
                schemaIdentifier={'logon'}
                handleChange={handleChange}
        />
        <button type="submit" disabled={isSubmitting}>
          Logon
        </button>
        {statusMessage.message && (
          <div className={`statusMessage ${statusMessage.type}`} >
          {statusMessage.message}
          </div>
        )}
      </form>
    </div>
  );
};

export default UserLogon;