import React, { useState, useEffect } from "react";
import axios from "axios";
import toast from "react-hot-toast";

const InstructorAccess = () => {
    const [instructors, setInstructors] = useState([]);

    const fetchUsers = async () => {
        try {
            const res = await axios.get("/teach/be-instructors");
            setInstructors(res?.data?.instructors);
        } catch (err) {
            console.error(`Failed to fetch instructors: ${err}`);
        }
    };

    const toggleAccess = async (email) => {
        try {
            const res = await axios.put(`/teach/be-instructor/access/${email}`);
            if (res.data.success) {
                toast.success(res?.data?.message)
                setInstructors((prevInstructors) =>
                    prevInstructors.map((instructor) =>
                        instructor.email === email
                            ? { ...instructor, access: !instructor.access }
                            : instructor
                    )
                );
                setTimeout(() => {
                    window.location.reload();
                }, 700);
            } else {
                console.error('Failed to update access status:', res.data.message);
            }
        } catch (err) {
            console.error('Error updating access status:', err);
        }
    };

    useEffect(() => {
        fetchUsers();
    }, []);

    return (
        <div
            className="ml-24 -translate-y-6"
            style={{ marginLeft: "80px", marginTop: "1.5rem" }}>
            <div className="indicator" style={{ marginRight: "800px" }}>
                <span className="indicator-item badge badge-secondary">
                    {instructors.length}
                </span>
                <button className="btn">All Instructors</button>
            </div>
            <h1 className="text-2xl font-bold text-gray-800 mb-4">All Users</h1>
            <div>
                <div
                    className="overflow-x-auto overflow-scroll"
                    style={{ height: "22rem", width: "52rem" }}>
                    <table className="table table-xs table-pin-rows table-pin-cols">
                        <thead>
                            <tr>
                                <th>Email_Id</th>
                                <th>PhoneNo</th>
                                <th>Domain</th>
                                <th>Access</th>
                            </tr>
                        </thead>
                        <tbody>
                            {instructors?.map((user, index) => (
                                <tr key={index}>
                                    <td>{user.email}</td>
                                    <td>{user.phone}</td>
                                    <td>{user.domain}</td>
                                    <td>
                                        <button
                                            onClick={() => toggleAccess(user.email)}
                                            className={user.access ? "text-green-600" : "text-red-600"}
                                        >
                                            {user.access ? "Access" : "No Access"}
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default InstructorAccess;
