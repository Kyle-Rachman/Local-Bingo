import React, { useEffect, useState } from "react";
import styles from './Square.module.css';

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
            className={active ? `${styles.filled}`: ``}
            onClick={toggleActive}
            onMouseMove={(e)=> handleMouseMove(e)}>
            <div className={styles.content}>{text}</div>
        </td>
    );
};

export default Square;