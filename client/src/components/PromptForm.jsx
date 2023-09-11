import React, { useState } from "react";
import { Button, FormControl, Input, InputLabel} from "@mui/material";

const field = {
    border: "1px inset white",
    borderRadius: "5px",
    marginBottom: "20px",
    color: 'white',
    marginBottom: "10px",
    padding: "0px 2px"
}

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
                        <FormControl>
                            <InputLabel htmlFor="text" style={{color: 'white', marginTop: "5px"}}>Text:</InputLabel>
                            <Input type="text" id="text" value={text} style={field} onChange={(e) => setText(e.target.value)} />
                        </FormControl>
                    </div>
                </div>
                <Button variant="outlined" type="submit" style={{marginBottom: "5px"}}>Add Square</Button>
            </form>
        </>
    );
};

export default PromptForm;