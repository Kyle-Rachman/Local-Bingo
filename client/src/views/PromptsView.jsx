import React, { useContext, useEffect, useState } from "react";
import PromptForm from "../components/PromptForm";
import PromptList from "../components/PromptList";
import axios from "axios";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";
import UserContext from "../UserContext";

const listStyle = {
    height: "10%",
    width: "50%",
    maxHeight: "250px",
    overflowY: "scroll",
    textAlign: "left"
};

const PromptsView = (props) => {
    const [prompts, setPrompts] = useState([]);
    const [errors, setErrors] = useState([]);
    const [manager, setManager] = useState(false);
    const {currentUser, setCurrentUser} = useContext(UserContext);
    useEffect(() => {
        const fetchPrompts = async () => {
            const res = await axios.get('http://localhost:8000/api/prompts');
            const data = await res.data;
            setPrompts(data);
            if (currentUser.role == "Prompt Manager" || currentUser.role == "Admin") {
                setManager(true);
            }
        }
        fetchPrompts().catch((err) => console.log(err));
    }, []);
    const createPrompt = async (promptParam) => {
        try {
            const res = await axios.post('http://localhost:8000/api/prompts/new', promptParam, {withCredentials: true});
            const data = await res.data;
            setErrors([]);
            setPrompts([...prompts, data]);
        } catch(err) {
            if (typeof err.response.data == "string") {
                setErrors(["This prompt already exists!"]);
            } else{
                let errorArr = []
                for (var key in err.response.data.errors) {
                    errorArr.push(err.response.data.errors[key].message);
                };
                setErrors(errorArr);
            };
        };
    };
    const removeFromDOM = async (promptId) => {
        try {
            setPrompts(prompts.filter(prompt => prompt._id != promptId));
        } catch(err) {
            console.log(err);
        };
    };
    return (
        <>
            <div style={{textAlign: "right"}}>
                <LogoutButton></LogoutButton>
            </div>
            {
                manager ?
                <>
                    <h2>Add a Square!</h2>
                    <PromptForm onSubmitProp={createPrompt} initialText=""/>
                    <div className="errors">
                        {errors.map((err, index) => (
                                <p key={index}>{err}</p>
                            ))}
                    </div>
                    <br />
                    <Link to={"/game"}>To Board</Link>
                    <br /> <br />
                    <hr/>
                    <PromptList prompts={prompts} removeFromDOM={removeFromDOM}/>
                </> :
                <>
                    <h1>All Possible Squares:</h1>
                    <Link to={"/game"}>To Board</Link>
                    <br /> <br />
                    <hr/>
                    <br />
                    <div style={listStyle}>
                    {
                        prompts.map(prompt =>
                            <p key={prompt._id}>{prompt.text}</p>
                        )
                    }
                    </div>
                </>
            }
        </>
    );
};

export default PromptsView;