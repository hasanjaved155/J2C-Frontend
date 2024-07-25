import React, { createContext, useContext, useState, useEffect } from "react";

// Create a context
const CourseContext = createContext();

// Provide the context to your app
const CourseProvider = ({ children }) => {
    const [dropCourse, setDropCourse] = useState(() => {
        // Initialize state from localStorage
        const savedCourses = localStorage.getItem("dropCourse");
        return savedCourses ? JSON.parse(savedCourses) : [];
    });

    const [courseLoading, setCourseLoading] = useState(true);

    // Save state to localStorage whenever it changes
    useEffect(() => {
        localStorage.setItem("dropCourse", JSON.stringify(dropCourse));
    }, [dropCourse]);

    return (
        <CourseContext.Provider value={{ dropCourse, setDropCourse }}>
            {children}
        </CourseContext.Provider>
    );
};

// Custom hook to use the CourseContext
const useCourse = () => useContext(CourseContext);

export { useCourse, CourseProvider };
