import "./UserRegField.css";
import { useState } from "react";

const UserRegField = (props) => {
    const {label, errorMessage, onChange, id, ...inputProps} = props;
    const [focused, setFocused] = useState(false);
    const handleFocus = (e) => {
        setFocused(true);
    }

    return (
        <div className="UserRegField">
            <label className="inputLabels">{label}</label>
            <input className="inputFields" {...inputProps} 
                onChange={onChange} 
                onBlur={handleFocus} 
                onFocus={() => inputProps.name === "verifypassword" && setFocused(true)} 
                focused={focused.toString()}
                >
            </input>
            <div className="errorMessages">
                <span>{errorMessage}</span>
            </div>
        </div>
    )
}

export default UserRegField;