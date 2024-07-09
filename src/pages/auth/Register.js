import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const Register = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [focusedInput, setFocusedInput] = useState(null);

    const navigate = useNavigate();

    // form function
    const handleSubmit = async (e) => {
        e.preventDefault();
        if (password !== confirmPassword) {
            return toast.error("password is not match with confirm password");
        }
        try {
            const res = await axios.post("/auth/register", {
                name,
                email,
                password,
                confirmPassword,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                navigate("/login");
            } else if (!res.data.success) {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="md:ml-[450px] md:w-[1000px] w-[70rem]">
            <section className="mt-4 mr-96 dark:bg-gray-900 ">
                <div className="flex flex-col items-center justify-center px-4 py-4  lg:py-0">
                    <div className="w-full h-[30rem] bg-white rounded-lg shadow-2xl md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-900">
                        <div className="p-6 space-y-4 md:space-y-4 sm:p-8">
                            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                                SignUp
                            </h1>
                            <form
                                className="space-y-4 md:space-y-2"
                                action="#"
                                onSubmit={handleSubmit}>

                                <div className="relative flex items-center py-3">
                                    <input
                                        type="text"
                                        id="name"
                                        required
                                        value={name}
                                        onFocus={() => setFocusedInput('name')}
                                        onBlur={() => setFocusedInput(null)}
                                        onChange={(e) => setName(e.target.value)}
                                        className={`px-4 py-2 border-2 w-full rounded-lg outline-none ${focusedInput === 'name' || name ? 'border-sky-600 ' : 'border-gray-400'}`}
                                    />
                                    <label
                                        htmlFor="name"
                                        className={`absolute bg-white text-gray-400 left-4 px-1 transition-all duration-200 ease-in ${focusedInput === 'name' || name ? 'transform -translate-y-6 -translate-x-2 text-sm text-blue-950' : ''}`}
                                    >
                                        Username
                                    </label>
                                </div>
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
                                        className={`absolute bg-white text-gray-400 left-4 px-1 transition-all duration-200 ease-in ${focusedInput === 'email' || email ? 'transform -translate-y-6 -translate-x-2 text-sm text-blue-950' : ''}`}
                                    >
                                        Email Address
                                    </label>
                                </div>
                                <div className="relative flex items-center py-3">
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
                                        New Password
                                    </label>
                                </div>
                                <div className="relative flex items-center">
                                    <input
                                        type="password"
                                        id="confirm-password"
                                        required
                                        value={confirmPassword}
                                        onFocus={() => setFocusedInput('confirmPassword')}
                                        onBlur={() => setFocusedInput(null)}
                                        onChange={(e) => setConfirmPassword(e.target.value)}
                                        className={`px-4 py-2 border-2 w-full rounded-lg outline-none ${focusedInput === 'confirmPassword' || confirmPassword ? 'border-sky-600 ' : 'border-gray-400'}`}
                                    />
                                    <label
                                        htmlFor="confirm-password"
                                        className={`absolute bg-white text-gray-400 left-4 px-1 transition-all duration-200 ease-in ${focusedInput === 'confirmPassword' || confirmPassword ? 'transform -translate-y-6 -translate-x-2 text-sm text-blue-950' : ''}`}
                                    >
                                        Confirm Password
                                    </label>
                                </div>

                                <button
                                    type="submit"
                                    className="w-full text-black bg-primary-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                                    style={{ border: "1px solid black" }}>
                                    Sign Up
                                </button>
                                <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                    Already have an account?{" "}
                                    <Link
                                        to="/login"
                                        className="font-medium text-primary-600 hover:underline dark:text-primary-500">
                                        SignIn here
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

export default Register;
