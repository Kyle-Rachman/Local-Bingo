import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import UserContext from "../UserContext";

const Leaderboard = (props) => {
    const [users, setUsers] = useState([]);
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:8000/api/users', {}, {withCredentials: true});
            const data = await res.data;
            setUsers(data.filter(user => user.firstName != "Admin"));
        }
        fetchUsers().catch((err) => console.log(err));
    }, []);

    const sortLeaderboard = async (field, direction) => {
        try {
            const res = await axios.get('http://localhost:8000/api/users/sorted/' + field + '/' + direction);
            const data = await res.data;
            setUsers(data.filter(user => user.firstName != "Admin"));
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <>
            <div style={{textAlign: "right"}}>
                <LogoutButton></LogoutButton>
            </div>
            <h1>Leaderboard:</h1>
            <table>
                <thead>
                    <tr>
                        <th>
                            Name
                            <button onClick={() => sortLeaderboard("firstName","")}>Asc</button>
                            <button onClick={() => sortLeaderboard("firstName","-")}>Dsc</button>
                        </th>
                        <th>
                            Number of Bingos
                            <button onClick={() => sortLeaderboard("numBingos","")}>Asc</button>
                            <button onClick={() => sortLeaderboard("numBingos","-")}>Dsc</button>
                        </th>
                        <th>
                            Most Recent Bingo
                            <button onClick={() => sortLeaderboard("lastWin","")}>Asc</button>
                            <button onClick={() => sortLeaderboard("lastWin","-")}>Dsc</button>
                        </th>
                    </tr>
                </thead>
                <tbody> 
                {
                    users.map(user => {
                        const date = new Date(user.lastWin)
                        return (
                            <tr key = {user._id}>
                                <td><Link to={"/profile/"+user._id}> {user.firstName} {user.lastInitial}</Link></td>
                                <td>{user.numBingos}</td>
                                <td>{date.getUTCMonth()+1}/{date.getUTCDate()}/{date.getUTCFullYear()}</td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            <div className="buttons">
                <button onClick={() => navigate('/game')}>Back to Game</button>
                {
                    currentUser.id != 0 ?
                    <button onClick={() => navigate('/profile/' + currentUser.id)}>Your Profile</button> :
                    ""
                }
            </div>
        </>
    );
};

export default Leaderboard;