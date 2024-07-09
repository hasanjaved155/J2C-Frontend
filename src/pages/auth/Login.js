import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
// import { getUserConfiguration } from "../store/userSlice";
import { toast } from "react-hot-toast";

const Login = ({ setInstructor }) => {
    // const dispatch = useDispatch();
    const [userEmail, setUserEmail] = useState(null);

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState(null);

    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {

            const res = await axios.post("/auth/login", { email, password });
            if (res && res?.data?.success) {
                toast.success(res?.data?.message);
                localStorage.setItem("accessToken", JSON.stringify(res?.data?.accessToken));
                localStorage.setItem("refreshToken", JSON.stringify(res?.data?.refreshToken));
                localStorage.setItem("user", JSON.stringify(res?.data?.loggedInUser));

                navigate("/");
                setUserEmail(res?.data?.user?.email);
            } else if (!res.data.success) {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };



    useEffect(() => {
        if (userEmail) {
            checkInstructorStatus(userEmail);
        }
    }, [userEmail]);


    const checkInstructorStatus = async (userEmail) => {
        if (!userEmail) {
            console.warn('User email is undefined');
            return;
        }

        try {
            const res = await axios.get(`/teach/checkInstructor/${userEmail}`);
            if (res?.data && res?.data?.success) {
                setInstructor(true);
            } else {
                setInstructor(false);
            }
        } catch (error) {
            toast.error('Fill the form of instructor');
        }
    };

    return (
        <div>
            <section className="mt-4 md:ml-10 mr-1 dark:bg-gray-900 ">
                <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto lg:py-0">
                    {/* <a href="#" className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                        <img className="w-56 h-12 mr-8" src="https://www.pcsglobal.in/assets/images/logo.jpg" alt="logo" />
                    </a> */}
                    <div className="w-full bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-900">
                        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                SignIn
                            </h1>
                            <form
                                className="space-y-4 md:space-y-6"
                                action="#"
                                onSubmit={handleSubmit}>
                                <div className="relative flex items-center">
                                    <input
                                        type="email"
                                        id="email"
                                        required
                                        value={email}
                                        onFocus={() => setFocusedInput('email')}
                                        onBlur={() => setFocusedInput(null)}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className={`px-4 py-2 border-2 w-full rounded-lg outline-none ${focusedInput === 'email' || email ? 'border-sky-600 ' : 'border-gray-400'}`}
                                    />
                                    <label
                                        htmlFor="email"
                                        className={`absolute bg-white text-gray-400 left-4 px-1 transition-all duration-200 ease-in ${focusedInput === 'email' || email ? 'transform -translate-y-6 -translate-x-2 text-sm text-blue-950 rounded' : ''}`}
                                    >
                                        Email Address
                                    </label>
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        type="password"
                                        id="password"
                                        required
                                        value={password}
                                        onFocus={() => setFocusedInput('password')}
                                        onBlur={() => setFocusedInput(null)}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className={`px-4 py-2 border-2 w-full rounded-lg outline-none ${focusedInput === 'password' || password ? 'border-sky-600 ' : 'border-gray-400'}`}
                                    />
                                    <label
                                        htmlFor="password"
                                        className={`absolute bg-white text-gray-400 left-4 px-1 transition-all duration-200 ease-in ${focusedInput === 'password' || password ? 'transform -translate-y-6 -translate-x-2 text-sm text-blue-950' : ''}`}
                                    >
                                        Password
                                    </label>
                                </div>
                                {/* <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Email Address
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        id="email"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        placeholder="Enter the Email Address"
                                        required
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                    />
                                </div>
                                <div>
                                    <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                                        Password
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        id="password"
                                        placeholder="Enter Your Password"
                                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        required
                                    />
                                </div> */}

                                <div className="mr-64 w-full text-left">
                                    <Link
                                        to="/forgot-password"
                                        className="font-medium text-primary-600 hover:text-sky-500 dark:text-primary-500">
                                        Forget Password
                                    </Link>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    style={{ border: "1px solid black" }}>
                                    Sign In
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    don't have an account?{" "}
                                    <Link
                                        to="/register"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        SignUp here
                                    </Link>
                                </p>
                            </form>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Login;
