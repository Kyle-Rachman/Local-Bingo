import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LogoutButton from "./LogoutButton";

const UserProfile = (props) => {
    const {_id} = useParams();
    const [user, setUser] = useState({});
    const date = new Date(user.lastWin);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUser = async () => {
            const res = await axios.get('http://localhost:8000/api/users/' + _id);
            const data = await res.data;
            setUser(data);
        }
        fetchUser().catch((err) => console.log(err));
    }, []);

    return (
        <>
            <div style={{textAlign: "right"}}>
                <LogoutButton></LogoutButton>
            </div>
            <h1>{user.firstName} {user.lastInitial}</h1>
            <table>
                <tbody> 
                    <tr>
                        <th>Number of Bingos</th>
                        <td>{user.numBingos}</td>
                    </tr>
                    <tr>
                        <th>Most Recent Bingo</th>
                        <td>{date.getUTCMonth()+1}/{date.getUTCDate()}/{date.getUTCFullYear()}</td>
                    </tr>
                    <tr>
                        <th>Fun Fact</th>
                        <td>{
                            user.funFact ?
                            user.funFact :
                            "No fun fact found"
                        }</td>
                    </tr>
                </tbody>
            </table>
            <div className="buttons">
                <button onClick={() => navigate('/game')}>Back to Game</button>
                <button onClick={() => navigate('/profile/' + _id + '/edit')}>Edit Profile</button>
                <button onClick={() => navigate('/leaderboard')}>Leaderboard</button>
            </div>
        </>
    );
};

export default UserProfile;