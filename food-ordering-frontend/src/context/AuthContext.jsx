import { createContext, useContext, useState } from "react";

const AuthContext = createContext();


// Decode JWT payload
const getRoleFromToken = (token) => {

    if (!token) {
        return null;
    }

    try {

        const payload = JSON.parse(
            atob(token.split(".")[1])
        );

        return payload.role || null;

    } catch (error) {

        console.error(
            "Failed to decode JWT:",
            error
        );

        return null;
    }
};


export const AuthProvider = ({ children }) => {

    const [token, setToken] = useState(
        () => localStorage.getItem("token")
    );


    const [role, setRole] = useState(
        () =>
            getRoleFromToken(
                localStorage.getItem("token")
            )
    );


    // Login
    const login = (newToken) => {

        localStorage.setItem(
            "token",
            newToken
        );

        setToken(newToken);

        setRole(
            getRoleFromToken(newToken)
        );
    };


    // Logout
    const logout = () => {

        localStorage.removeItem("token");

        setToken(null);

        setRole(null);
    };


    const isAuthenticated = !!token;

    const isAdmin = role === "ROLE_ADMIN";

    const isCustomer = role === "ROLE_CUSTOMER";


    return (
        <AuthContext.Provider
            value={{
                token,
                role,
                isAuthenticated,
                isAdmin,
                isCustomer,
                login,
                logout
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};


export const useAuth = () => {

    return useContext(AuthContext);
};