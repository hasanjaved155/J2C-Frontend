import axios from 'axios';
import React, { useState } from 'react';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const InstructorForm = () => {
    const [title, setTitle] = useState("");
    const [learn, setLearn] = useState("");
    const [requirements, setRequirements] = useState("");
    const [courseTarget, setCourseTarget] = useState("");
    const [timeCommitment, setTimeCommitment] = useState("");

    const user = JSON.parse(localStorage.getItem('user'));
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Check if all form fields are filled
        if (!title || !learn || !requirements || !courseTarget || !timeCommitment) {
            // Check if the email exists in the database
            try {
                const emailCheckRes = await axios.get(`/teach/checkInstructorEnroll/${user?.email}`);
                if (emailCheckRes?.data?.success) {
                    // Email is present in the database
                    navigate('/instructor_course');
                } else {
                    // Email is not present in the database, ask the user to fill out the form
                    toast.error("Please fill out the form first.");
                }
            } catch (error) {
                toast.error("Please fill out the form first.");
            }
        } else {
            // Proceed with form submission
            try {
                const res = await axios.post('/teach/instructorform', { email: user?.email, title, learn, requirements, courseTarget, timeCommitment });
                if (res && res?.data?.success) {
                    toast.success(res?.data?.message);
                    navigate('/instructor_course');
                    // Update instructor status on successful submission
                } else if (!res?.data?.success) {
                    toast.error(res?.data?.message);
                }
            } catch (error) {
                toast.error(error.message);
            }
        }
    };

    return (
        <div className='p-4'>
            <form className="text-left mx-auto w-[36rem] rounded-3xl p-8 bg-sky-300" onSubmit={handleSubmit}>
                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="title"
                        id="title"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}

                    />
                    <label htmlFor="title" className="peer-focus:font-medium absolute text-base text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">
                        How about a working title?</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="learn"
                        id="learn"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={learn}
                        onChange={(e) => setLearn(e.target.value)}

                    />
                    <label htmlFor="learn" className="peer-focus:font-medium absolute text-base text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What will students learn in your course?</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="requirements"
                        id="requirements"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={requirements}
                        onChange={(e) => setRequirements(e.target.value)}

                    />
                    <label htmlFor="requirements" className="peer-focus:font-medium absolute text-base text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">What are the requirements or prerequisites for taking your course?</label>
                </div>

                <div className="relative z-0 w-full mb-5 group">
                    <input
                        type="text"
                        name="courseTarget"
                        id="courseTarget"
                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                        placeholder=" "
                        value={courseTarget}
                        onChange={(e) => setCourseTarget(e.target.value)}

                    />
                    <label htmlFor="courseTarget" className="peer-focus:font-medium absolute text-base text-black duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Who is this course for?</label>
                </div>

                <div className="form-control w-full mb-5">
                    <select
                        name="timeCommitment"
                        value={timeCommitment}
                        onChange={(e) => setTimeCommitment(e.target.value)}
                        className="block py-2.5 px-0 w-full text-base text-black bg-transparent border-0 border-b-2 border-gray-500 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"

                    >
                        <option value="" disabled>Select time commitment</option>
                        <option value="1-2 hours">1-2 hours</option>
                        <option value="3-5 hours">3-5 hours</option>
                        <option value="6-10 hours">6-10 hours</option>
                        <option value="10+ hours">10+ hours</option>
                    </select>
                </div>

                <div className="flex justify-center">
                    <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Next</button>
                </div>
            </form>
        </div>
    );
};

export default InstructorForm;
