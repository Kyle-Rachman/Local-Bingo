import React, { useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import UserContext from "../UserContext";
import { Button } from "@mui/material";

const LogoutButton = (props) => {
    const navigate = useNavigate();
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const logoutUser = async (e) => {
        try {
            if (currentUser.id == 0) {
                localStorage.clear();
                navigate('/')
            }
            const res = await axios.post('http://localhost:8000/api/users/logout', {}, {withCredentials: true});
            localStorage.clear();
            setCurrentUser({
                id: 0,
                role: "User"
            });
            navigate('/');
        } catch(err) {
            console.log(err);
        };
    };
    return (
        <Button variant="outlined" color="warning" onClick={logoutUser}>Leave</Button>
    );
};

export default LogoutButton;