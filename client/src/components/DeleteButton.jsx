import React from "react";
import axios from "axios";

const DeleteButton = (props) => {
    const {promptId, successCallback} = props;
    const deletePrompt = async (e) => {
        try {
            const res = await axios.delete('http://localhost:8000/api/prompts/' + promptId);
            successCallback();
        } catch(err) {
            console.log(err)
        }
    };
    return (
        <button onClick={deletePrompt}>Delete</button>
    );
};

export default DeleteButton;