import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './Board.module.css';
import { Link } from "react-router-dom";
import Square from "./Square";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
};

const Board = (props) => {
    const [prompts, setPrompts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    useEffect(() => {
        const fetchPrompts = async () => {
            const res = await axios.get('http://localhost:8000/api/prompts');
            const array = await res.data.map((prompt) => prompt.text);
            setPrompts(shuffleArray(array));
            setLoaded(true);
        }
        fetchPrompts().catch((err) => console.log(err));
    }, [loaded]);

    return (
        <div className={styles.container}>
            <table className={styles.board}>
                <tbody>
                    <tr>
                        <Square text={prompts[0]} isLoaded={!loaded}></Square>
                        <Square text={prompts[1]} isLoaded={!loaded}></Square>
                        <Square text={prompts[2]} isLoaded={!loaded}></Square>
                        <Square text={prompts[3]} isLoaded={!loaded}></Square>
                        <Square text={prompts[4]} isLoaded={!loaded}></Square>
                    </tr>
                    <tr>
                        <Square text={prompts[5]} isLoaded={!loaded}></Square>
                        <Square text={prompts[6]} isLoaded={!loaded}></Square>
                        <Square text={prompts[7]} isLoaded={!loaded}></Square>
                        <Square text={prompts[8]} isLoaded={!loaded}></Square>
                        <Square text={prompts[9]} isLoaded={!loaded}></Square>
                    </tr>
                    <tr>
                        <Square text={prompts[10]} isLoaded={!loaded}></Square>
                        <Square text={prompts[11]} isLoaded={!loaded}></Square>
                        <Square text={"FREE SPACE\nGod is at the center"} isLoaded={!loaded}></Square>
                        <Square text={prompts[12]} isLoaded={!loaded}></Square>
                        <Square text={prompts[13]} isLoaded={!loaded}></Square>
                    </tr>
                    <tr>
                        <Square text={prompts[14]} isLoaded={!loaded}></Square>
                        <Square text={prompts[15]} isLoaded={!loaded}></Square>
                        <Square text={prompts[16]} isLoaded={!loaded}></Square>
                        <Square text={prompts[17]} isLoaded={!loaded}></Square>
                        <Square text={prompts[18]} isLoaded={!loaded}></Square>
                    </tr>
                    <tr>
                        <Square text={prompts[19]} isLoaded={!loaded}></Square>
                        <Square text={prompts[20]} isLoaded={!loaded}></Square>
                        <Square text={prompts[21]} isLoaded={!loaded}></Square>
                        <Square text={prompts[22]} isLoaded={!loaded}></Square>
                        <Square text={prompts[23]} isLoaded={!loaded}></Square>
                    </tr>
                </tbody>
            </table>
            <div className={styles.buttons}>
                <button onClick={() => setLoaded(false)}>Reload Board</button>
                <Link to={"/prompts"}>Add/Edit Squares</Link>
            </div>
        </div>
    );
};

export default Board;