import React, { useEffect } from 'react'
import { Outlet, useNavigate } from 'react-router-dom';

const ProtectedInstructorPage = () => {
    const navigate = useNavigate();

    const pageReload = () => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/teach");
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

export default ProtectedInstructorPage
