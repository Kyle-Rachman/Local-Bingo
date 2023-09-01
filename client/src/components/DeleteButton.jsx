import React from "react";
import axios from "axios";

const DeleteButton = (props) => {
    const {itemId, type, successCallback} = props;
    const deleteItem = async (e) => {
        try {
            const res = await axios.delete('http://localhost:8000/api/' + type + '/' + itemId);
            successCallback();
        } catch(err) {
            console.log(err)
        }
    };
    return (
        <button onClick={deleteItem}>Delete</button>
    );
};

export default DeleteButton;