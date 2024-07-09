import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedInstructor = () => {
    const navigate = useNavigate();

    const pageReload = () => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/signup");
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
}

export default ProtectedInstructor
