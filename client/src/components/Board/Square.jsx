import React, { useEffect, useState } from "react";
import styles from './Square.module.css';

const Square = (props) => {
    const {text, isActive, handleClick} = props;
    const [active, setActive] = useState(isActive);
    useEffect(() => setActive(isActive), [isActive]);

    return (
        <td id={styles.bingoSquare}
            className={active ? `${styles.filled}`: ``}
            onClick={handleClick}>
            <div className={styles.content}>{text}</div>
        </td>
    );
};

export default Square;