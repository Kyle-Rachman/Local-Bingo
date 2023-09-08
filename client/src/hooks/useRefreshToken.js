import React, { useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';

const useRefreshToken = () => {
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const refresh = async () => {
        const res = await axios.get('http://localhost:8000/api/refresh', {withCredentials: true});
        if (res) {
            setCurrentUser({
                id: res.data.id,
                role: res.data.role
            });
            return res.data.userToken;
        } else {
            setCurrentUser({
                id: 0,
                role: "User"
            });
            return ""
        }
    }
    return refresh;
};

export default useRefreshToken;