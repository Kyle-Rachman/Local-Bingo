import React, { useEffect, useState } from "react";
import axios from "axios";

const promptStyle = {
    resize: "vertical",
    backgroundColor: "transparent",
    border: "0"
}

const error = {
    resize: "vertical",
    backgroundColor: "red",
    border: "0",
    color: 'white',
    borderRadius: "2px",
    padding: "0px 2px"
}

const InlineEdit = (props) => {
    const {initialValue, promptId} = props;
    const [text, setText] = useState(initialValue);
    const editPrompt = (promptText) => {
        axios.patch('http://localhost:8000/api/prompts/' + promptId, promptText)
            .catch(err => console.log(err));
    };
    useEffect(() => {
        editPrompt({text})
    }, [text]);

    return (
        <>
        {
            text ?
            <textarea
            cols={100}
            rows={1}
            aria-label="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={promptStyle}
            /> :
            <textarea
                cols={100}
                rows={1}
                aria-label="Text"
                placeholder="You need at least one character of text!"
                onChange={(e) => {
                    const textValue = e.target.value.replace(/\n/g, "");
                    setText(textValue);
                }}
                style={error}
                className="empty"
            />
        }
        </>
    );
};

export default InlineEdit;