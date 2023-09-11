import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate, useParams } from "react-router-dom";
import LogoutButton from "../LogoutButton";
import UserContext from "../../UserContext";
import styles from "./Profile.module.css";
import { Button, Table, TableHead, TableBody, TableRow, TableCell, TableContainer } from "@mui/material";
import { styled } from "@mui/system";

const StyledTableCell = styled(TableCell)({
    color: "white",
    maxWidth: "10vw",
    verticalAlign: "top",
    whiteSpace: "nowrap"
});

const UserProfile = (props) => {
    const {_id} = useParams();
    const [user, setUser] = useState({});
    const {currentUser, setCurrentUser} = useContext(UserContext);
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
        <div className={styles.grad}>
            <h1>{user.firstName} {user.lastInitial}</h1>
            <TableContainer>
                <Table>
                    <TableBody> 
                        <TableRow>
                            <StyledTableCell style={{textAlign: "left", }}>Number of Bingos</StyledTableCell>
                            <StyledTableCell style={{textAlign: "right"}}>{user.numBingos}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell style={{textAlign: "left"}}>Most Recent Bingo</StyledTableCell>
                            <StyledTableCell style={{textAlign: "right"}}>{date.getUTCMonth()+1}/{date.getUTCDate()}/{date.getUTCFullYear()}</StyledTableCell>
                        </TableRow>
                        <TableRow>
                            <StyledTableCell style={{textAlign: "left"}}>Fun Fact</StyledTableCell>
                            <StyledTableCell style={{textAlign: "right", whiteSpace: "wrap"}}>{
                                user.funFact ?
                                user.funFact :
                                "No fun fact found"
                            }</StyledTableCell>
                        </TableRow>
                    </TableBody>
                </Table>
            </TableContainer>
            <div className={styles.buttons}>
                <Button variant="outlined" onClick={() => navigate('/game')}>Back to Game</Button>
                {
                    currentUser.id == user._id ?
                    <Button variant="outlined" onClick={() => navigate('/profile/' + _id + '/edit')}>Edit Profile</Button> :
                    ""
                }
                <Button variant="outlined" onClick={() => navigate('/leaderboard')}>Leaderboard</Button>
            </div>
            <div>
            {
                currentUser.role == "Admin" ?
                <Button variant="outlined" onClick={() => navigate('/admin')}>Admin Console</Button> :
                ""
                }
            </div>
            <br />
            <LogoutButton></LogoutButton>
        </div>
    );
};

export default UserProfile;