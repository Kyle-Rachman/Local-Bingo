import React, { useState } from "react";
import DeleteButton from "./DeleteButton";
import InlineEdit from "./InlineEdit";

const listStyle = {
    height: "10%",
    maxHeight: "250px",
    overflowY: "scroll"
};

const PromptList = (props) => {
    const {removeFromDOM, prompts} = props;

    return (
        <>
            <h1>All Possible Squares:</h1>
            <h5>(Click a square to edit it)</h5>
            <br />
            <div style={listStyle}>
                {
                    prompts.map(prompt => {
                        return (
                            <p key = {prompt._id}>
                                <InlineEdit initialValue={prompt.text} promptId={prompt._id}/> | <DeleteButton promptId={prompt._id} successCallback={() => removeFromDOM(prompt._id)}/>
                            </p>
                        );
                    })
                }
            </div>
        </>
    );
};

export default PromptList;