import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const InstructorCreateCourse = () => {
    const [courseName, setCourseName] = useState("");
    const [folderId, setFolderId] = useState("");
    const [image, setImage] = useState({});
    const [path, setPath] = useState("");
    const [courseTitle, setCourseTitle] = useState("");
    const [access, setAccess] = useState(false);
    const [role, setRole] = useState("");
    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleImage = async (e) => {
        const file = e.target.files[0];
        const formData = new FormData();
        formData.append("image", file);

        try {
            const { data } = await axios.post("/course/upload", formData);
            setImage({
                url: data.url,
                public_id: data.public_id,
            });
        } catch (error) {
            console.log(error.message);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post("/course/createCourse", {
                courseName,
                folderId,
                path,
                courseTitle,
                image: image?.url,
                role: [{ rolename: role }],
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/thankyou");
            } else {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const checkInstructorStatus = async () => {
        try {
            const res = await axios.get(`/teach/checkInstructor/${user?.email}`);
            if (res?.data && res?.data?.success) {
                const instructor = res?.data?.instructor;
                setAccess(instructor?.access);
            }
        } catch (error) {
            toast.error('Fill the form of instructor');
        }
    };

    useEffect(() => {
        checkInstructorStatus();
    }, []);

    return (
        access ? (
            <div className="flex justify-center">
                <section>
                    <div>
                        <div className="bg-white rounded-lg shadow-lg md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-900">
                            <div className="p-6 sm:p-8">
                                <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                    Create Course
                                </h1>
                                <form
                                    className="space-y-4 md:space-y-4 grid grid-cols-2 gap-4"
                                    action="#"
                                    onSubmit={handleSubmit}
                                >
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                            Course Name
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter Playlist Name"
                                            value={courseName}
                                            onChange={(e) => setCourseName(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                            Folder I'd
                                        </label>
                                        <input
                                            type="text"
                                            name="name"
                                            id="name"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter FolderId"
                                            value={folderId}
                                            onChange={(e) => setFolderId(e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="mt-[17px]">
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                            Path Name
                                        </label>
                                        <input
                                            type="text"
                                            name="path"
                                            id="path"
                                            className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter Path"
                                            value={path}
                                            onChange={(e) => setPath(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div className="mt-[17px]">
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                            Course Title
                                        </label>
                                        <input
                                            type="text"
                                            name="path"
                                            id="path"
                                            className="bg-gray-50 border  border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Enter Path"
                                            value={courseTitle}
                                            onChange={(e) => setCourseTitle(e.target.value)}
                                            required
                                        />
                                    </div>

                                    <div>
                                        <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                            Image
                                        </label>
                                        <input
                                            type="file"
                                            name="image"
                                            id="image"
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            placeholder="Upload Image"
                                            onChange={handleImage}
                                            required
                                        />
                                        {image?.url && (
                                            <img src={image.url} className="w-28 aspect-square" alt="Uploaded" />
                                        )}
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium text-gray-900 dark:text-white">
                                            Role
                                        </label>
                                        <select
                                            className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                            value={role}
                                            onChange={(e) => setRole(e.target.value)}
                                            required
                                        >
                                            <option value="">Select Role</option>
                                            <option value="Employee">Employee</option>
                                            <option value="Buyer">Buyer</option>
                                        </select>
                                    </div>

                                    <div className="col-span-2 flex justify-between">
                                        <button
                                            type="button"
                                            className="text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            style={{ border: "1px solid black" }}
                                            onClick={() => navigate("/teachins")}
                                        >
                                            Previous
                                        </button>
                                        <button
                                            type="submit"
                                            className="text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                            style={{ border: "1px solid black" }}
                                        >
                                            Submit
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </section>
            </div>
        ) : (
            <div>
                <h1>You don't have access</h1>
            </div>
        )
    );
};

export default InstructorCreateCourse;
