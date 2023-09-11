import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import DeleteButton from "../DeleteButton";
import UserContext from "../../UserContext";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from "@mui/material";
import { styled } from "@mui/system";
import styles from "./Admin.module.css";

const StyledTableCell = styled(TableCell)({
    color: "white",
    maxWidth: "10vw",
    textAlign: "center",
    verticalAlign: "top",
    background: "none"
});

const Admin = (props) => {
    const [users, setUsers] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUsers = async () => {
            const res = await axios.get('http://localhost:8000/api/users', {}, {withCredentials: true});
            const data = await res.data;
            if (currentUser.role != "Admin") {
                navigate("/game");
            }
            setUsers(data);
            setLoaded(true);
        };
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

    const sortUsers = async (field, direction) => {
        try {
            const res = await axios.get('http://localhost:8000/api/users/sorted/' + field + '/' + direction);
            const data = await res.data;
            setUsers(data);
        } catch (err) {
            console.log(err);
        };
    };

    return (
        <>
            <div className={styles.wrapper}>
                <h1>Admin Console:</h1>
                <TableContainer style={{maxHeight: "350px"}}>
                    <Table stickyHeader style={{margin: "0 auto"}}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{backgroundColor: "rgb(64,95,145)"}}>
                                    <div className={styles.headcell}>
                                        Name
                                        <div className="buttons">
                                            <Button onClick={() => sortUsers("firstName","")}><KeyboardArrowUpIcon fontSize="small"/></Button>
                                            <Button onClick={() => sortUsers("firstName","-")}><KeyboardArrowDownIcon fontSize="small"/></Button>
                                        </div>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell style={{backgroundColor: "rgb(64,95,145)"}}>
                                    <div className={styles.headcell}>
                                        Role
                                        <div>
                                            <Button onClick={() => sortUsers("role","")}><KeyboardArrowUpIcon fontSize="small"/></Button>
                                            <Button onClick={() => sortUsers("role","-")}><KeyboardArrowDownIcon fontSize="small"/></Button>
                                        </div>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell style={{backgroundColor: "rgb(64,95,145)"}}>
                                    <div className={styles.headcell}>
                                        Actions
                                    </div>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody style={{margin: "0 auto"}}> 
                        {
                            users.map(user => {
                                return (
                                    <TableRow key = {user._id}>
                                        <StyledTableCell><Link to={"/profile/"+user._id}> {user.firstName} {user.lastInitial}</Link></StyledTableCell>
                                        <StyledTableCell>{user.role}</StyledTableCell>
                                        <StyledTableCell>
                                            <div className={styles.actions}>
                                                <Button variant="outlined" onClick={() => changeUserRole(user.role, user._id)}>
                                                    {
                                                        (user.role == "User") ?
                                                        "Promote" :
                                                        "Demote"
                                                    }
                                                </Button>
                                                {
                                                    (user.role != "Admin") ?
                                                    <DeleteButton itemId={user._id} type={"users"} successCallback={() => removeFromDOM(user._id)}/> :
                                                    ""
                                                }
                                            </div>
                                        </StyledTableCell>
                                    </TableRow>
                                );
                            })
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <LogoutButton></LogoutButton>
            </div>
        </>
    );
};

export default Admin;