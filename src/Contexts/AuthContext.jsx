import { createContext, useState } from "react";


export const authContext = createContext()

export default function AuthContextProvider({children}){

    const[isLoggedin , setIsLoggedin] = useState(localStorage.getItem("token") != null)

    return<>
        <authContext.Provider value={{isLoggedin , setIsLoggedin}}>
            {children}
        </authContext.Provider>
    
    </>
}




