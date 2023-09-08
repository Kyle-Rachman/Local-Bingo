import React, { useState } from "react";
import styles from './UserForm.module.css';
import { Button, FormControl, Input, InputLabel, InputAdornment} from "@mui/material";

const UserForm = (props) => {
    const {onSubmitProp, type} = props;
    const [firstName, setFirstName] = useState("");
    const [lastInitial, setLastInitial] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setconfirmPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
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
                    <div className={styles.container}>
                        <FormControl>
                            <InputLabel htmlFor={"firstName" + type} style={{color: 'white', marginTop: "5px"}}>First Name: </InputLabel>
                            <Input type="text" className={styles.field} id={"firstName" + type} value={firstName} style={{color: 'white'}} onChange={(e) => setFirstName(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor={"lastInitial" + type} style={{color: 'white', marginTop: "5px"}}>Last Initial: </InputLabel>
                            <Input type="text" className={styles.field} id={"lastInitial" + type} value={lastInitial} style={{color: 'white'}} onChange={(e) => setLastInitial(e.target.value)}/>
                        </FormControl>
                        <FormControl>
                            <InputLabel htmlFor={"password" + type} style={{color: 'white', marginTop: "5px"}}>Password: </InputLabel>
                            <Input type={showPassword ? "text" : "password"} className={styles.field} id={"password" + type} value={password} style={{color: 'white'}} onChange={(e) => setPassword(e.target.value)}
                            endAdornment={
                                    <InputAdornment className={styles.eye} position="end">
                                        <i className={showPassword ? `far fa-eye-slash ${styles.eye}`: `far fa-eye ${styles.eye}`} id="toggleShowPassword" onClick={() => setShowPassword(prev => !prev)}></i>
                                    </InputAdornment>
                                }/>
                            
                        </FormControl>
                        {
                            type == "register" ?
                            <FormControl>
                                <InputLabel htmlFor={"confirmPassword" + type} style={{color: 'white', marginTop: "5px"}}>Confirm Password: </InputLabel>
                                <Input type={showPassword ? "text" : "password"} className={styles.field} id={"confirmPassword" + type} value={confirmPassword} style={{color: 'white'}} onChange={(e) => setconfirmPassword(e.target.value)}/>
                            </FormControl> :
                            ""
                        }
                    </div>
                    {
                        type == "register" ?
                        <Button variant="outlined" type="submit">Sign Up</Button> :
                        <Button variant="outlined" type="submit">Log In</Button>
                    }
            </form>
        </>
    );
};

export default UserForm;