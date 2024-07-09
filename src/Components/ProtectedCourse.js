import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedCourse = () => {
    const navigate = useNavigate();

    const pageReload = () => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        }
    };
    useEffect(() => {
        pageReload();
        //eslint-disable-next-line
    }, []);
    return (
        <>
            <Outlet />
        </>
    );
};

export default ProtectedCourse;
