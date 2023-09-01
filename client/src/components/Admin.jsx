import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import LogoutButton from "./LogoutButton";
import DeleteButton from "./DeleteButton";

const Admin = (props) => {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:8000/api/users', {}, {withCredentials: true});
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
                const res = await axios.patch('http://localhost:8000/api/users/' + _id, {role: "Prompt Manager"}, {withCredentials: true});
            } else if (roleType == "Prompt Manager") {
                const res = await axios.patch('http://localhost:8000/api/users/' + _id, {role: "User"}, {withCredentials: true});
            } else {
                console.log("You can't change an admin's role! Silly goose.")
            }
            setLoaded(false);
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <>
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
                                    {
                                        (user.role != "Admin") ?
                                        <DeleteButton itemId={user._id} type={"users"} successCallback={() => removeFromDOM(user._id)}/> :
                                        ""
                                    }
                                </td>
                            </tr>
                        );
                    })
                }
                </tbody>
            </table>
            <div className="buttons">
                <LogoutButton></LogoutButton>
            </div>
        </>
    );
};

export default Admin;