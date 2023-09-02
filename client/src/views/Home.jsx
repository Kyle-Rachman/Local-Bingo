import React, { useContext, useState } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";

const Home = (props) => {
    const [registerErrors, setRegisterErrors] = useState([]);
    const [loginError, setLoginError] = useState("");
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
            if (err.response.data.message) {
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
    return (
        <>
            <h2>Register</h2>
            <UserForm onSubmitProp={registerUser} type="register"/>
            <div className="errors">
                {registerErrors.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))}
            </div>
            <hr />
            <h2>Login</h2>
            <UserForm onSubmitProp={loginUser} type="login"/>
            <div className="errors">
                <p>{loginError}</p>
            </div>
            <button onClick={() => {
                setCurrentUser({
                    id: 0,
                    role: "User"
                })
                navigate("/game");
                }}>Play as guest</button>
        </>
    );
};

export default Home;