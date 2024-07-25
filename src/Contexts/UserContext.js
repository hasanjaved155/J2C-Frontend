import axios from "axios";
import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
const UserContext = createContext();

// Provide the context to your app
const UserProvider = ({ children }) => {
    const [token, setToken] = useState(localStorage.getItem("accessToken"));
    const [role, setRole] = useState("");

    const fetchUserRole = async () => {
        try {
            const res = await axios.get('/auth/user-role', {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            setRole(res?.data?.role);
        } catch (error) {
            console.error('Error fetching user role:', error);
        }
    };

    useEffect(() => {
        if (token) {
            fetchUserRole();
        }
    }, [token]); // Add token as a dependency

    return (
        <UserContext.Provider value={{ token, setToken, setRole, role }}>
            {children}
        </UserContext.Provider>
    );
};

// Custom hook to use the UserContext
const useUser = () => useContext(UserContext);

export { useUser, UserProvider };
