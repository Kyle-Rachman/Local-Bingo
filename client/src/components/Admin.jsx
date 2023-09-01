import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import DeleteButton from "./DeleteButton";

const Admin = (props) => {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:8000/api/users');
            const data = await res.data;
            setUsers(data);
            setLoaded(true)
        }
        fetchUsers().catch((err) => console.log(err));
    }, [loaded]);

    const removeFromDOM = async (userId) => {
        try {
            setUsers(users.filter(user => user._id != userId));
        } catch (err) {
            console.log(err);
        };
    };

    const changeUserRole = async (roleType, _id) => {
        try {
            if (roleType == "User") {
                const res = await axios.patch('http://localhost:8000/api/users/' + _id, {role: "Prompt Manager"});
            } else {
                const res = await axios.patch('http://localhost:8000/api/users/' + _id, {role: "User"});
            }
            setLoaded(false);
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <>
            <div style={{textAlign: "right"}}>
                <LogoutButton></LogoutButton>
            </div>
            <h1>Admin Console:</h1>
            <table>
                <thead>
                    <tr>
                        <th>Name</th>
                        <th>Number of Bingos</th>
                        <th>Role</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody> 
                {
                    users.map(user => {
                        return (
                            <tr key = {user._id}>
                                <td><Link to={"/profile/"+user._id}> {user.firstName} {user.lastInitial}</Link></td>
                                <td>{user.numBingos}</td>
                                <td>{user.role}</td>
                                <td>
                                    <button onClick={() => changeUserRole(user.role, user._id)}>
                                        {
                                            (user.role == "User") ?
                                            "Promote" :
                                            "Demote"
                                        }
                                    </button>
                                    <DeleteButton itemId={user._id} type={"users"} successCallback={() => removeFromDOM(user._id)}/>
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            <div className="buttons">
                <button onClick={() => navigate('/game')}>Back to Game</button>
            </div>
        </>
    );
};

export default Admin;