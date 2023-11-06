import { useState } from "react";
import UserRegField from "./UserRegField"
import "./UserRegForm.css";

const UserRegForm = () => {
    // Form field variables
    const [values, setValues] = useState({
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
        }
        ,{
            id:3,
            name: "dob",
            type: "date",
            placeholder:"Date of Birth",
            label:"Date of Birth",
        }
        ,{
            id:4,
            name: "password",
            type: "password",
            placeholder:"Password",
            label:"Password",
            required: true,
            pattern: "^(?=.*[A-Za-z])(?=.*\\d)(?=.*[@$!%*#?&])[A-Za-z\\d@$!%*#?&]{8,}$",
            errorMessage: "8-20 characters: at least 1 letter, 1 number, and 1 special character",
        }
        ,{
            id:5,
            name: "verifypassword",
            type: "password",
            placeholder:"Verify Password",
            label:"Verify Password",
            required: true,
            pattern: values.password,
            errorMessage: "Password don't match!",
        }
    ]

    // Form submission handler using async process
    // Server URL store in .env file
    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);  //disabled submit button
        try {
            const response = await fetch(`${process.env.REACT_APP_API_URL}/users`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(values),
            });
            const data = await response.json();
            if (!response.ok) {
                setIsSubmitting(false);
                setStatusMessage({message:'Error when saving: ' + data.error, type:'E'});
                //console.error('Submit failure returned from server: ', data.error);
            } else {
                setStatusMessage({message:'Account registration has been completed', type:'I'});
            }
        } catch (error) {
            setIsSubmitting(false);
            setStatusMessage({message:'Network error when saving record', type:'E'});
            // console.error("Network Error:", error);
        }
    }

    // Field change event trigger valiation
    const onChange = (e) => {
        setValues({...values, [e.target.name]: e.target.value})
    }

    // Finally, render the form
    return(
        <div className="UserRegForm">
            <form onSubmit={handleSubmit}>
                <h1>Registration</h1>
                {regFields.map((regField)=>(
                    <UserRegField key={regField.id} {...regField} 
                        value={values[regField.name]} 
                        onChange={onChange}>
                    </UserRegField>
                ))}
                <button disabled={isSubmitting}>Submit</button>
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