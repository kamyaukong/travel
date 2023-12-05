import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import UserRegField from "./UserRegField"
import callApi from "../../routers/api";

import './UserRegForm.css';

const UserRegForm = () => {
    // Form field variables
    const [formValues, setFormValues] = useState({
        userID: "",
        email: "",
        dob: "",
        password: "",
        verifypassword: "",
    })
    // Control enable/disable of submit button 
    const [isSubmitting, setIsSubmitting] = useState(false);
    // To show message returned from server
    const [statusMessage, setStatusMessage] = useState({message:'', type:''});
    const navigate = useNavigate();

    // Array of the form fields
    // name property must be match with data model on server side
    const regFields = [
        {
            id:1,
            name: "userID",
            type: "text",
            placeholder:"UserID",
            label:"UserID",
            required: true,
            pattern: "^[a-zA-Z0-9]{3,12}$",
            errorMessage: "3-16 characters and no special character",
        }
        ,{
            id:2,
            name: "email",
            type: "email",
            placeholder:"eMail",
            label:"eMail",
            required: true,
            errorMessage: "Need a valid eMail address",
        },{
            id:3,
            name: "password",
            type: "password",
            placeholder:"Password",
            label:"Password",
            required: true,
            pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            errorMessage: "8-20 characters: at least 1 letter, 1 number, and 1 special character",
        }
        ,{
            id:4,
            name: "verifypassword",
            type: "password",
            placeholder:"Verify Password",
            label:"Verify Password",
            required: true,
            pattern: formValues.password,
            errorMessage: "Password don't match!",
        }
    ]

    // Form submission handler using async process
    // Server URL store in .env file
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);  //disabled submit button
        try {
            const data = await callApi(`/users/`, 'POST', formValues);
            /*
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            */
            if (!data) {
                setIsSubmitting(false);
                setStatusMessage({message:'Error when saving: ' + data.error, type:'E'});
                //console.error('Submit failure returned from server: ', data.error);
            } else {
                setStatusMessage({message:'Account registration has been completed', type:'I'});
                setIsSubmitting(false);
                setTimeout(() => navigate('/'), 2000);
            }
        } catch (error) {
            setIsSubmitting(false);
            setStatusMessage({message:'Network error when saving record', type:'E'});
            // console.error("Network Error:", error);
        }
    }

    // Field change event trigger valiation
    const onChange = (e) => {
        setFormValues({...formValues, [e.target.name]: e.target.value})
    }

    // Cancel button handler
    const handleCancel = () => {
        navigate('/'); // Navigates to the main screen (root path)
    };

    // Finally, render the form
    return(
        <div className="UserRegForm">
            <form onSubmit={handleSubmit}>
                <h1>Registration</h1>
                {regFields.map((regField)=>(
                    <UserRegField key={regField.id} {...regField} 
                        value={formValues[regField.name]} 
                        onChange={onChange}>
                    </UserRegField>
                ))}
                <div className="form-buttons">
                    <button onClick={handleCancel}>Cancel</button>
                    <button disabled={isSubmitting}>Submit</button>
                </div>
                {statusMessage.message && (
                    <div className={`statusMessage ${statusMessage.type}`}
                        style={{
                            background: statusMessage.type === 'E' ? 'red' : 'green',
                                marginTop: '10px'
                        }}
                    >
                    {statusMessage.message}
                </div>
                )}
 
           </form>
        </div>
    )
}
export default UserRegForm;