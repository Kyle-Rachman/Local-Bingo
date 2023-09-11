import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../../UserContext";
import styles from "./Profile.module.css";
import { Button, FormControl, Input, InputLabel} from "@mui/material";

const EditProfile = (props) => {
    const {_id} = useParams();
    const [firstName, setFirstName] = useState("");
    const [lastInitial, setLastInitial] = useState("");
    const [funFact, setFunFact] = useState("");
    const [loaded, setLoaded] = useState(false);
    const [errors, setErrors] = useState([]);
    const {currentUser, setCurrentUser} = useContext(UserContext);
    const navigate = useNavigate();
    useEffect(() => {
        const fetchUserInfo = async () => {
            const res = await axios.get('http://localhost:8000/api/users/' + _id, {}, {withCredentials: true});
            const data = await res.data;
            setFirstName(data.firstName);
            setLastInitial(data.lastInitial);
            setFunFact(data.funFact);
            setLoaded(true);
            if (currentUser.id != _id) {
                navigate("/profile/" + _id)
            }
        }
        fetchUserInfo().catch((err) => console.log(err));
    }, [loaded]);

    const handleSubmit = (e) => {
        e.preventDefault();
        updateUser({firstName, lastInitial, funFact});
        setFirstName("");
        setLastInitial("");
        setFunFact("");
    };

    const updateUser = async (userParam) => {
        try {
            const res = await axios.patch('http://localhost:8000/api/users/' + _id, userParam, {withCredentials: true});
            navigate("/profile/" + _id);
        } catch (err) {
            let errorArr = []
            for (var key in err.response.data.errors) {
                errorArr.push(err.response.data.errors[key].message);
            };
            setErrors(errorArr);
            setLoaded(false);
        }
    };

    return (
        <div className={styles.grad}>
            <h1>Edit Profile Information</h1>
            {
                loaded && <form onSubmit={handleSubmit}>
                    <div>
                        <FormControl>
                            <InputLabel htmlFor="firstName" style={{color: "white"}}>First Name: </InputLabel>
                            <Input className={styles.field} style={{color: "white"}} type="text" id="firstName" value={firstName} onChange={(e) => setFirstName(e.target.value)}/>
                        </FormControl>
                        <br />
                        <FormControl>
                            <InputLabel htmlFor="lastInitial" style={{color: "white"}}>Last Initial: </InputLabel>
                            <Input className={styles.field} style={{color: "white"}} type="text" id="lastInitial" value={lastInitial} onChange={(e) => setLastInitial(e.target.value)}/>
                        </FormControl>
                        <br />
                        <FormControl>
                            <InputLabel htmlFor="funFact" style={{color: "white"}}>Fun Fact: </InputLabel>
                            <Input multiline className={styles.field} style={{color: "white", width: "205px", padding: "2px"}} type="text" id="funFact" value={funFact} onChange={(e) => setFunFact(e.target.value)}/>
                        </FormControl>
                    </div>
                    <div className={styles.buttons}>
                        <Button variant="outlined" type="submit">Update Profile</Button>
                        <Button variant="outlined" onClick={() => navigate("/profile/" + _id)}>Cancel</Button>
                    </div>
                </form>
            }
            <div className="errors">
                {
                    errors.map((err, index) => (
                        <p key={index}>{err}</p>
                    ))
                }
            </div>
        </div>
    );
};

export default EditProfile;