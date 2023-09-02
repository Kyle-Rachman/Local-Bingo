import React, { createContext } from "react";

const UserContext = createContext({
    id: 0,
    role: "User"
});

export default UserContext;