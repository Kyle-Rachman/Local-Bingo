import React, { useState } from "react";
import axios from "axios";
import UserForm from "../components/UserForm";
import { useNavigate } from "react-router-dom";

const Home = (props) => {
    const [registerErrors, setRegisterErrors] = useState([]);
    const [loginErrors, setLoginErrors] = useState([]);
    const navigate = useNavigate();
    const registerUser = async (userParam) => {
        try {
            const res = await axios.post('http://localhost:8000/api/users/register', userParam, {withCredentials: true});
            setRegisterErrors([]);
        } catch(err) {
            console.log(err)
            if (typeof err.response.data == "string") {
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
            setLoginErrors([]);
            navigate('/game');
        } catch(err) {
            let errorArr = []
                for (var key in err.response.data.errors) {
                    errorArr.push(err.response.data.errors[key].message);
                };
                setLoginErrors(errorArr);
        };
    };
    return (
        <>
            <UserForm onSubmitProp={registerUser} type="register"/>
            <div className="errors">
                {registerErrors.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))}
            </div>
            <UserForm onSubmitProp={loginUser} type="login"/>
            <div className="errors">
                {loginErrors.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))}
            </div>
        </>
    );
};

export default Home;