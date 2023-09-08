import React, { useContext, useState } from "react";
import axios from "axios";
import UserForm from "../components/UserForm/UserForm";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import styles from "./Home.module.css";
import { Button } from "@mui/material";

const Home = (props) => {
    const [registerErrors, setRegisterErrors] = useState([]);
    const [loginError, setLoginError] = useState("");
    const [newUser, setNewUser] = useState(false);
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const navigate = useNavigate();
    const registerUser = async (userParam) => {
        try {
            const res = await axios.post('http://localhost:8000/api/users/register', userParam, {withCredentials: true});
            setCurrentUser({
                id: res.data.user._id,
                role: res.data.user.role
            })
            setRegisterErrors([]);
            navigate('/game');
        } catch(err) {
            if (err.response.data.message == "User already exists") {
                setRegisterErrors(["This user already exists!"]);
            } else{
                let errorArr = []
                for (var key in err.response.data.errors) {
                    errorArr.push(err.response.data.errors[key].message);
                };
                setRegisterErrors(errorArr);
            };
        };
    };

    const loginUser = async (userParam) => {
        try {
            const res = await axios.post('http://localhost:8000/api/users/login', userParam, {withCredentials: true});
            setCurrentUser({
                id: res.data.user._id,
                role: res.data.user.role
            })
            setLoginError("");
            navigate('/game');
        } catch(err) {
            if (err.response.data.message) {
                setLoginError("Invalid login attempt!");
            }
        };
    };

    const toggleForm = () => {
        setNewUser(prev => !prev);
        setRegisterErrors([]);
        setLoginError("");
    }

    return (
        <>
            <div className={styles.wrapper}>
                <h1>Local Bingo!</h1>
                <br />
                <div className={styles.forms}>
                    {
                        newUser && <div className={styles.userform} id={styles.register}>
                            <h2>Sign Up</h2>
                            <UserForm onSubmitProp={registerUser} type="register"/>
                            <div className={styles.errors}>
                                {registerErrors.map((err, index) => (
                                        <p key={index}>{err}</p>
                                    ))}
                            </div>
                        </div>
                    }
                    {
                        !newUser && <div className={styles.userform} id={styles.login}>
                            <h2>Login</h2>
                            <UserForm onSubmitProp={loginUser} type="login"/>
                            <div className={styles.errors}>
                                <p>{loginError}</p>
                            </div>
                        </div>
                    }
                </div>
                <p className={styles.changeform} onClick={toggleForm}>
                    {
                        !newUser ?
                        "Need an account? Sign up!" :
                        "Already have an account? Log in here"
                    }
                </p>
                <Button variant="outlined" onClick={() => {
                    setCurrentUser({
                        id: 0,
                        role: "User"
                    })
                    navigate("/game");
                    }}>Play as guest</Button>
            </div>
        </>
    );
};

export default Home;