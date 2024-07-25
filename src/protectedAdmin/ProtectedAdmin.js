import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useUser } from "../Contexts/UserContext";

const ProtectedAdmin = () => {
    const navigate = useNavigate();
    const { role } = useUser();

    useEffect(() => {
        if (!localStorage.getItem("accessToken")) {
            navigate("/login");
        } else if (role !== "admin") {
            navigate("/");
        }
    }, [navigate, role]);

    if (!localStorage.getItem("accessToken") || role !== "admin") {
        return null;
    }

    return (
        <div>
            <Outlet />
        </div>
    );
};

export default ProtectedAdmin;
