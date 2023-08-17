import React, { useEffect, useState } from "react";
import axios from "axios";

const promptStyle = {
    resize: "vertical",
    backgroundColor: "transparent",
    border: "0"
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
        <textarea
            cols={100}
            rows={1}
            aria-label="Text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            style={promptStyle}
        />
    );
};

export default InlineEdit;