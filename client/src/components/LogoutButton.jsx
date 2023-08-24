import React from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const LogoutButton = (props) => {
    const navigate = useNavigate();
    const logoutUser = async (e) => {
        try {
            const res = await axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true});
            navigate('/');
        } catch(err) {
            console.log(err);
        };
    };
    return (
        <button onClick={logoutUser}>Log Out</button>
    );
};

export default LogoutButton;