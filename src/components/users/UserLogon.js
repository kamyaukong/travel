// /src/components/users/UserLogon.js
import { useState } from "react";
import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../../routers/Authentication';
import "./UserLogon.css";

const UserLogon = () => {
  const [values, setValues] = useState({
    userID: "",
    password: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [statusMessage, setStatusMessage] = useState({ message: "", type: "" });
  const { login } = useContext(AuthContext);
  const { setUserID } = useContext(AuthContext);
  const navigate = useNavigate();

  const loginFields = [
    {
      id: 1,
      name: "userID",
      type: "text",
      placeholder: "UserID",
      label: "UserID",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      label: "Password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
console.log(JSON.stringify(values));
    try {
      const response = await fetch(
        `${process.env.REACT_APP_API_URL}/users/logon`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(values),
        }
      );

      const data = await response.json();

      if (!response.ok) {
        setIsSubmitting(false);
        setStatusMessage({
          message: data.message || "Invalid credentials",
          type: "E",
        });
      } else {
        const receivedToken = data.token;
        localStorage.setItem('token', receivedToken); // Save token to local storage
        if(setUserID) setUserID(values.userID);
        //setToken(response.data.token);
        // Redirect to the home page ("/")
        login(receivedToken);
        //window.location.href = `${process.env.REACT_APP_API_URL}/itinerary`;
        navigate(`/itinerary`);

      }
    } catch (error) {
      console.error("Error during login:", error);
      setIsSubmitting(false);
      setStatusMessage({ message: "Network error during login", type: "E" });
    }
  };
  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleRegisterClick = () => {
    // Redirect to the register URL
    window.location.href = "/register";
  };

  return (
    <div className="UserLoginForm">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {loginFields.map((loginField) => (
          <div key={loginField.id} className="form-group">
            <label htmlFor={loginField.name}>{loginField.label}</label>
            <input
              type={loginField.type}
              id={loginField.name}
              name={loginField.name}
              placeholder={loginField.placeholder}
              value={values[loginField.name]}
              onChange={onChange}
              required={loginField.required}
            />
          </div>
        ))}
        <button type="submit" disabled={isSubmitting}>
          Submit
        </button>
        {statusMessage.message && (
          <div
            className={`statusMessage ${statusMessage.type}`}
            style={{
              background: statusMessage.type === "E" ? "red" : "green",
              marginTop: "10px",
            }}
          >
            {statusMessage.message}
          </div>
        )}

        <button type="button" onClick={handleRegisterClick}>
          Register
        </button>
      </form>
    </div>
  );
};

export default UserLogon;