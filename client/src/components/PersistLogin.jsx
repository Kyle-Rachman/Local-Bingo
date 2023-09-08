import { Outlet } from "react-router-dom";
import { useState, useEffect, useContext } from "react";
import useRefreshToken from '../hooks/useRefreshToken'
import UserContext from "../UserContext";

const PersistLogin = () => {
    const [isLoading, setIsLoading] = useState(true);
    const refresh = useRefreshToken();
    const {currentUser, setCurrentUser} = useContext(UserContext);

    useEffect(() => {
        const verifyRefreshToken = async () => {
            try {
                await refresh();
            } catch (err) {
                console.log(err);
            } finally {
                setIsLoading(false);
            }
        };

        if (!currentUser.id) {
            verifyRefreshToken();
        } else {
            setIsLoading(false);
        }
    }, []);

    useEffect(() => {
        console.log(`isLoading: ${isLoading}`)
        console.log(`user: ${currentUser.id}`)
    })

    return (
        <>
            {
                isLoading ?
                <p>Loading...</p> :
                <Outlet />
            }
        </>
    )
}

export default PersistLogin;