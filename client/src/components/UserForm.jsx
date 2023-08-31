import React, { useState } from "react";

const UserForm = (props) => {
    const {onSubmitProp, type} = props;
    const [firstName, setFirstName] = useState("");
    const [lastInitial, setLastInitial] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitProp({firstName, lastInitial, password, confirmPassword});
        setFirstName("");
        setLastInitial("");
        setPassword("");
        setconfirmPassword("");
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
                            <label htmlFor={"lastInitial" + type} style={{color: 'white'}}>Last Initial: </label>
                            <input type="text" id={"lastInitial" + type} value={lastInitial} style={{color: 'white'}} onChange={(e) => setLastInitial(e.target.value)}/>
                        </div>
                        <div>
                            <label htmlFor={"password" + type} style={{color: 'white'}}>Password: </label>
                            <input type="password" id={"password" + type} value={password} style={{color: 'white'}} onChange={(e) => setPassword(e.target.value)}/>
                        </div>
                        {
                            type == "register" ?
                            <div>
                                <label htmlFor={"confirmPassword" + type} style={{color: 'white'}}>Confirm Password: </label>
                                <input type="password" id={"confirmPassword" + type} value={confirmPassword} style={{color: 'white'}} onChange={(e) => setconfirmPassword(e.target.value)}/>
                            </div> :
                            ""
                        }
                    </div>
                    <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default UserForm;