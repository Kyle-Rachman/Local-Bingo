import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import UserContext from "../../UserContext";
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from "@mui/material";
import { styled } from "@mui/system";
import styles from "./Leaderboard.module.css";

const StyledTableCell = styled(TableCell)({
    color: "white",
    maxWidth: "5vw",
    textAlign: "center",
    verticalAlign: "top",
    background: "none"
});


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
        <div className={styles.grad}>
            <div className={styles.wrapper}>
                <h1>Leaderboard:</h1>
                <TableContainer style={{maxHeight: "350px"}}>
                    <Table stickyHeader style={{margin: "0 auto"}}>
                        <TableHead>
                            <TableRow>
                                <StyledTableCell style={{backgroundColor: "rgb(88,123,179)"}}>
                                    <div className={styles.headcell}>
                                        Name
                                        <div className="buttons">
                                            <Button onClick={() => sortLeaderboard("firstName","")}><KeyboardArrowUpIcon fontSize="small"/></Button>
                                            <Button onClick={() => sortLeaderboard("firstName","-")}><KeyboardArrowDownIcon fontSize="small"/></Button>
                                        </div>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell style={{backgroundColor: "rgb(88,123,179)"}}>
                                    <div className={styles.headcell}>
                                        Number of Bingos
                                        <div className="buttons">
                                            <Button onClick={() => sortLeaderboard("numBingos","")}><KeyboardArrowUpIcon fontSize="small"/></Button>
                                            <Button onClick={() => sortLeaderboard("numBingos","-")}><KeyboardArrowDownIcon fontSize="small"/></Button>
                                        </div>
                                    </div>
                                </StyledTableCell>
                                <StyledTableCell style={{backgroundColor: "rgb(88,123,179)"}}>
                                    <div className={styles.headcell}>
                                        Most Recent Bingo
                                        <div className="buttons">
                                            <Button onClick={() => sortLeaderboard("lastWin","")}><KeyboardArrowUpIcon fontSize="small"/></Button>
                                            <Button onClick={() => sortLeaderboard("lastWin","-")}><KeyboardArrowDownIcon fontSize="small"/></Button>
                                        </div>
                                    </div>
                                </StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody> 
                        {
                            users.map(user => {
                                const date = new Date(user.lastWin)
                                return (
                                    <TableRow key = {user._id}>
                                        <StyledTableCell><Link to={"/profile/"+user._id} style={{color: "white"}}> {user.firstName} {user.lastInitial}</Link></StyledTableCell>
                                        <StyledTableCell>{user.numBingos}</StyledTableCell>
                                        <StyledTableCell>{date.getUTCMonth()+1}/{date.getUTCDate()}/{date.getUTCFullYear()}</StyledTableCell>
                                    </TableRow>
                                );
                            })
                        }
                        </TableBody>
                    </Table>
                </TableContainer>
                <div className={styles.buttons}>
                    <Button variant="outlined" onClick={() => navigate('/game')}>Back to Game</Button>
                    {
                        currentUser.id != 0 ?
                        <Button variant="outlined" onClick={() => navigate('/profile/' + currentUser.id)}>Your Profile</Button> :
                        ""
                    }
                </div>
                <LogoutButton></LogoutButton>
            </div>
        </div>
    );
};

export default Leaderboard;