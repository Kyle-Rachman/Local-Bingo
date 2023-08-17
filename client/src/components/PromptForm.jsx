import React, { useState } from "react";

const PromptForm = (props) => {
    const {initialText, onSubmitProp} = props;
    const [text, setText] = useState(initialText);

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmitProp({text});
        setText("");
    };

    return (
        <>
            <form onSubmit={handleSubmit}>
                <div>
                    <div>
                        <label htmlFor="text" style={{color: 'white'}}>Text: </label>
                        <input type="text" id="text" value={text} style={{color: 'white'}} onChange={(e) => setText(e.target.value)}/>
                    </div>
                </div>
                <button type="submit">Submit</button>
            </form>
        </>
    );
};

export default PromptForm;