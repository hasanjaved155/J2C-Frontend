import React from "react";
import { Outlet, useNavigate } from "react-router-dom";

const ProtectedAdmin = () => {
    const navigate = useNavigate();

    if (!localStorage.getItem("accessToken")) {
        return navigate("/login");
    }

    const user = JSON.parse(localStorage.getItem("user"));


    if (user.role !== "admin") {
        return navigate("/dashboard");
    }
    return (
        <div>
            <Outlet />
        </div>
    );
};

export default ProtectedAdmin;
