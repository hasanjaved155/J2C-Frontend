import React, { createContext, useContext, useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-hot-toast';

// Create a context for the cart
const RemainingContext = createContext();

// Custom hook to use the CartContext


const RemainingProvider = ({ children }) => {

    const [isInstructor, setInstructor] = useState(false);

    const user = JSON.parse(localStorage.getItem("user"));

    const checkInstructorStatus = async () => {
        if (!user?.email) {
            setInstructor(false);
            return;
        }

        try {
            const res = await axios.get(`/teach/checkInstructor/${user.email}`);
            if (res?.data?.success) {
                const instructor = res?.data?.instructor;
                // Check if the instructor has access
                setInstructor(instructor?.access === true);
                console.log(instructor)
            } else {
                setInstructor(false);
            }
        } catch (error) {
            setInstructor(false);
            // Uncomment the line below to show an error toast
            // toast.error('Fill the form of instructor');
        }
    };

    useEffect(() => {
        checkInstructorStatus();
    }, [user?.email]); // Add user.email as a dependency


    return (
        <RemainingContext.Provider value={{ isInstructor, setInstructor }}>
            {children}
        </RemainingContext.Provider>
    );
};


const useRemain = () => useContext(RemainingContext);
export { useRemain, RemainingProvider };