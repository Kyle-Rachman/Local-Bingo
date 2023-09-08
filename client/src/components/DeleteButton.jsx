import React from "react";
import axios from "axios";
import { Button } from "@mui/material";

const DeleteButton = (props) => {
    const {itemId, type, successCallback} = props;
    const deleteItem = async (e) => {
        try {
            const res = await axios.delete('http://localhost:8000/api/' + type + '/' + itemId, {withCredentials: true});
            successCallback();
        } catch(err) {
            console.log(err)
        }
    };
    return (
        <Button variant="outlined" color="error" onClick={deleteItem} style={{margin: "10px"}}>Delete</Button>
    );
};

export default DeleteButton;