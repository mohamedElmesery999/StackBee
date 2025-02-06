import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
    const [isLoggedin, setIsLoggedin] = useState(false);
    const [isLoading, setIsLoading] = useState(true); // Loading only on first render

    useEffect(() => {
        VerifyUserToken();              //M. Run immediately when open project

        const interval = setInterval(() => {
            VerifyUserToken(false);    // Pass `false` to avoid resetting `isLoading`
        }, 2000);

        return () => clearInterval(interval);
    }, []);

    function VerifyUserToken(initialCheck = true) {
        if (initialCheck) setIsLoading(true);

             const token = localStorage.getItem("token");

        if (!token) {
            setIsLoggedin(false);
            setIsLoading(false);
            return;
        }

        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
            headers: { token }
        })
        .then(() => {
            setIsLoggedin(true);
        })
        .catch(() => {
            localStorage.removeItem("token");
            setIsLoggedin(false);
        })
        .finally(() => {
            setIsLoading(false); 
        });
    }

    return (
        <authContext.Provider value={{ isLoggedin, setIsLoggedin, isLoading }}>
            {children}
        </authContext.Provider>
    );
}
