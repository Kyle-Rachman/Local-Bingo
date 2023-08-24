import React, { useState } from "react";

const UserForm = (props) => {
    const {onSubmitProp, type} = props;
    const [firstName, setFirstName] = useState("");
    const [lastName, setLastName] = useState("");
    const [password, setPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitProp({firstName, lastName, password});
        setFirstName("");
        setLastName("");
        setPassword("");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label htmlFor={"firstName" + type} style={{color: 'white'}}>First Name: </label>
                            <input type="text" id={"firstName" + type} value={firstName} style={{color: 'white'}} onChange={(e) => setFirstName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor={"lastName" + type} style={{color: 'white'}}>Last Name: </label>
                            <input type="text" id={"lastName" + type} value={lastName} style={{color: 'white'}} onChange={(e) => setLastName(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor={"password" + type} style={{color: 'white'}}>Password: </label>
                            <input type="password" id={"password" + type} value={password} style={{color: 'white'}} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                    </div>
                    <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default UserForm;