import React, { useEffect, useState } from "react";
import axios from "axios";
import styles from './Board.module.css';
import { Link } from "react-router-dom";
import Square from "./Square";
import LogoutButton from "../LogoutButton";

const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i+1));
        [array[i], array[j]] = [array[j], array[i]];
    };
    return array;
};

const checkBingo = (bingoBoard) => {
    for (let i=0; i < 5; i++) {
        if (bingoBoard[i].every(square => square == 1) ||
        [bingoBoard[0][i],bingoBoard[1][i],bingoBoard[2][i],bingoBoard[3][i],bingoBoard[4][i]].every(square => square == 1) ||
        [bingoBoard[0][0],bingoBoard[1][1],bingoBoard[2][2],bingoBoard[3][3],bingoBoard[4][4]].every(square => square == 1) ||
        [bingoBoard[0][4],bingoBoard[1][3],bingoBoard[2][2],bingoBoard[3][1],bingoBoard[4][0]].every(square => square == 1)
        ) {
            return true;
        };
    };
    return false;
};

const Board = (props) => {
    const [prompts, setPrompts] = useState([]);
    const [loaded, setLoaded] = useState(false);
    const [bingo, setBingo] = useState(false);
    const [activeSquares, setActiveSquares] = useState(
        [[0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0],
        [0,0,0,0,0]]);
    useEffect(() => {
        const fetchPrompts = async () => {
            const res = await axios.get('http://localhost:8000/api/prompts');
            const array = await res.data.map((prompt) => prompt.text);
            setPrompts(shuffleArray(array));
            setLoaded(true);
            setActiveSquares(
                [[0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0],
                [0,0,0,0,0]]);
        }
        fetchPrompts().catch((err) => console.log(err));
    }, [loaded]);
    useEffect(() => {
        if (checkBingo(activeSquares)) {
            setBingo(true);
        } else {
            setBingo(false);
        };
    },[activeSquares])

    const toggleActive = (i,j) => {
        if (activeSquares[i][j]) {
            const boardState = [...activeSquares];
            const updatedRow = [...boardState[i]];
            updatedRow[j] = 0;
            boardState[i] = updatedRow;
            setActiveSquares(boardState);
        } else {
            const boardState = [...activeSquares];
            const updatedRow = [...boardState[i]];
            updatedRow[j] = 1;
            boardState[i] = updatedRow;
            setActiveSquares(boardState);
        };
    }

    return (
        <div className={styles.container}>
            <table className={styles.board}>
                <tbody>
                    <tr>
                        <Square text={prompts[0]} isActive={activeSquares[0][0]} handleClick={() => toggleActive(0,0)}></Square>
                        <Square text={prompts[1]} isActive={activeSquares[0][1]} handleClick={() => toggleActive(0,1)}></Square>
                        <Square text={prompts[2]} isActive={activeSquares[0][2]} handleClick={() => toggleActive(0,2)}></Square>
                        <Square text={prompts[3]} isActive={activeSquares[0][3]} handleClick={() => toggleActive(0,3)}></Square>
                        <Square text={prompts[4]} isActive={activeSquares[0][4]} handleClick={() => toggleActive(0,4)}></Square>
                    </tr>
                    <tr>
                        <Square text={prompts[5]} isActive={activeSquares[1][0]} handleClick={() => toggleActive(1,0)}></Square>
                        <Square text={prompts[6]} isActive={activeSquares[1][1]} handleClick={() => toggleActive(1,1)}></Square>
                        <Square text={prompts[7]} isActive={activeSquares[1][2]} handleClick={() => toggleActive(1,2)}></Square>
                        <Square text={prompts[8]} isActive={activeSquares[1][3]} handleClick={() => toggleActive(1,3)}></Square>
                        <Square text={prompts[9]} isActive={activeSquares[1][4]} handleClick={() => toggleActive(1,4)}></Square>
                    </tr>
                    <tr>
                        <Square text={prompts[10]} isActive={activeSquares[2][0]} handleClick={() => toggleActive(2,0)}></Square>
                        <Square text={prompts[11]} isActive={activeSquares[2][1]} handleClick={() => toggleActive(2,1)}></Square>
                        <Square text={"FREE SPACE\nGod is at the center"} isActive={activeSquares[2][2]} handleClick={() => toggleActive(2,2)}></Square>
                        <Square text={prompts[12]} isActive={activeSquares[2][3]} handleClick={() => toggleActive(2,3)}></Square>
                        <Square text={prompts[13]} isActive={activeSquares[2][4]} handleClick={() => toggleActive(2,4)}></Square>
                    </tr>
                    <tr>
                        <Square text={prompts[14]} isActive={activeSquares[3][0]} handleClick={() => toggleActive(3,0)}></Square>
                        <Square text={prompts[15]} isActive={activeSquares[3][1]} handleClick={() => toggleActive(3,1)}></Square>
                        <Square text={prompts[16]} isActive={activeSquares[3][2]} handleClick={() => toggleActive(3,2)}></Square>
                        <Square text={prompts[17]} isActive={activeSquares[3][3]} handleClick={() => toggleActive(3,3)}></Square>
                        <Square text={prompts[18]} isActive={activeSquares[3][4]} handleClick={() => toggleActive(3,4)}></Square>
                    </tr>
                    <tr>
                        <Square text={prompts[19]} isActive={activeSquares[4][0]} handleClick={() => toggleActive(4,0)}></Square>
                        <Square text={prompts[20]} isActive={activeSquares[4][1]} handleClick={() => toggleActive(4,1)}></Square>
                        <Square text={prompts[21]} isActive={activeSquares[4][2]} handleClick={() => toggleActive(4,2)}></Square>
                        <Square text={prompts[22]} isActive={activeSquares[4][3]} handleClick={() => toggleActive(4,3)}></Square>
                        <Square text={prompts[23]} isActive={activeSquares[4][4]} handleClick={() => toggleActive(4,4)}></Square>
                    </tr>
                </tbody>
            </table>
            <div className={styles.buttons}>
                <button onClick={() => setLoaded(false)}>Reload Board</button>
                <Link to={"/prompts"}>Add/Edit Squares</Link>
                <LogoutButton></LogoutButton>
            </div>
            <div className="Bingo">
                {
                    bingo ?
                    "You got Bingo!" :
                    ""
                }
            </div>
        </div>
    );
};

export default Board;