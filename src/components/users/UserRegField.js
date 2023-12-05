// import "./UserRegField.css";
import { useState } from "react";
import './UserRegField.css';
const UserRegField = (props) => {
    const {label, errorMessage, onChange, id, ...inputProps} = props;
    const [focused, setFocused] = useState(false);
    const handleBlur = (e) => {
        setFocused(!e.target.validity.valid);
    }

    return (
        <div className="UserRegField">
            <label className="inputLabels">{label}</label>
            <input className="inputFields" {...inputProps} 
                onChange={onChange} 
                onBlur={handleBlur} 
                onFocus={() => inputProps.name === "verifypassword" && setFocused(true)} 
                data-focused={focused.toString()}
                >
            </input>
            <span className="errorMessages" data-show={focused ? "true" : "false"}>
                {errorMessage}
            </span>
        </div>
    )
}

export default UserRegField;