import React, { useEffect, useState } from "react";
import styles from './Board.module.css';

const Square = (props) => {
    const {text, isLoaded} = props;
    const [active, setActive] = useState(isLoaded);
    useEffect(() => setActive(isLoaded), [isLoaded]);

    const toggleActive = () => {
        if (active) {
            setActive(false);
        } else {
            setActive(true);
        };
    }

    return (
        <td
            className={active ? `${styles.filled}`: `${styles.square}`}
            onClick={toggleActive}>
            <div className={styles.content}>{text}</div>
        </td>
    );
};

export default Square;