import React, { useEffect, useState } from "react";
import PromptForm from "../components/PromptForm";
import PromptList from "../components/PromptList";
import axios from "axios";
import { Link } from "react-router-dom";
import LogoutButton from "../components/LogoutButton";

const PromptsView = (props) => {
    const [prompts, setPrompts] = useState([]);
    const [errors, setErrors] = useState([]);
    useEffect(() => {
        const fetchPrompts = async () => {
            const res = await axios.get('http://localhost:8000/api/prompts');
            const data = await res.data;
            setPrompts(data);
        }
        fetchPrompts().catch((err) => console.log(err));
    }, []);
    const createPrompt = async (promptParam) => {
        try {
            const res = await axios.post('http://localhost:8000/api/prompts/new', promptParam);
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
            const res = await axios.delete('http://localhost:8000/api/prompts/' + promptId);
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
        </>
    );
};

export default PromptsView;