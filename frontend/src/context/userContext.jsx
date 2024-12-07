import React, { createContext, useState } from "react";

export const userDataContext = createContext();

const userContext = ({children}) => {

    const [user, setUser] = useState({
        email : '',
        fullname : {
            firstname : '',
            lastname : ''
        }
    });

    return (
        <div>
            <userDataContext.Provider value={[user, setUser]}>
                {children}
            </userDataContext.Provider>
        </div>
    )
}

export default userContext;