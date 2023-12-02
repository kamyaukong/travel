// /src/components/users/UserLogon.js
import { useState } from "react";
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../routers/Authentication';
import FormGenerator from "../common/FormGenerator";
import callApi from "../../routers/api";

import "./UserLogon.css";

const UserLogon = () => {
  const [logonData, setValues] = useState({
    userID: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
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
          setStatusMessage("");
      } else {
        // Save token to local storage
        const receivedToken = data.token;
        localStorage.setItem('token', receivedToken); 
        if(setUserID) setUserID(logonData.userID);
        login(receivedToken, logonData.userID);
        navigate(`/itinerary`);
      }
    } catch (error) {
      if(error.status === 401) {
        setIsSubmitting(false);
        setStatusMessage("Invalid user ID or password");
      } else {
        console.error("Error during logon: ", error.message);
        setIsSubmitting(false);
        setStatusMessage("System error: " + error.message);
      }
    }
  };

  return (
    <div className="logon-form-container">
      <div className="UserLogonForm">
        <form onSubmit={handleSubmit}>
          <h1>Logon</h1>
          <FormGenerator
                  item={logonData}
                  schemaIdentifier={'logon'}
                  handleChange={handleChange}
          />
          <button type="submit" className="button-style" disabled={isSubmitting}>
            Logon
          </button>
          <div className="statusMessage-container">
            {statusMessage && (
              <div className="statusMessage active">
                {statusMessage? statusMessage: ""}
              </div>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default UserLogon;