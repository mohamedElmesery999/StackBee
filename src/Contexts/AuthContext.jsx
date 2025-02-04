import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const authContext = createContext();

export default function AuthContextProvider({ children }) {
    const [isLoggedin, setIsLoggedin] = useState(false);

    useEffect(() => {
        VerifyUserToken();

        // Polling to check if the token changes every 2 seconds
        const interval = setInterval(() => {
            VerifyUserToken();
        }, 2000);

        return () => clearInterval(interval); // Cleanup on unmount
    }, []);

    function VerifyUserToken() {
        const token = localStorage.getItem("token");
        if (!token) {
            setIsLoggedin(false);
            return;
        }

        axios.get("https://ecommerce.routemisr.com/api/v1/auth/verifyToken", {
            headers: { token }
        })
        .then((res) => {
            console.log(res);
            setIsLoggedin(true);
        })
        .catch((err) => {
            localStorage.removeItem("token");
            setIsLoggedin(false);
        });
    }

    return (
        <authContext.Provider value={{ isLoggedin, setIsLoggedin }}>
            {children}
        </authContext.Provider>
    );
}
