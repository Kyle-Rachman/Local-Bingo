import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams } from "react-router-dom";
import UserContext from "../UserContext";

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
                navigate(-1)
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
        <>
            <h1>Edit Profile Information</h1>
            {
                loaded && <form onSubmit={handleSubmit}>
                    <div className="formInput">
                        <label htmlFor="firstName" style={{color: 'white'}}>First Name: </label>
                        <input type="text" id="firstName" value={firstName} style={{color: 'white'}} onChange={(e) => setFirstName(e.target.value)}/>
                    </div>
                    <div className="formInput">
                        <label htmlFor="lastInitial" style={{color: 'white'}}>Last Initial: </label>
                        <input type="text" id="lastInitial" value={lastInitial} style={{color: 'white'}} onChange={(e) => setLastInitial(e.target.value)}/>
                    </div>
                    <div className="formInput">
                        <label htmlFor="funFact" style={{color: 'white'}}>Fun Fact: </label>
                        <input type="text" id="funFact" value={funFact} style={{color: 'white'}} onChange={(e) => setFunFact(e.target.value)}/>
                    </div>
                    <div className="formInput">
                        <button type="submit">Submit</button>
                        <button onClick={() => navigate("/profile/" + _id)}>Cancel</button>
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
        </>
    );
};

export default EditProfile;