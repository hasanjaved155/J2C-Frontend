import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    ShoppingCartIcon,
    SearchIcon,
    MenuIcon,
} from "@heroicons/react/outline";

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import images from "../images copy/J2C-logo.jpg";

import axios from "axios";
import Dropdown from "./../dropdown/Dropdown";
import Dropdown1 from "./../dropdown/Dropdown1";
import { useUser } from "../Contexts/UserContext";
import { useCart } from "../Contexts/CartContext";
import CategoryShow from "../HomePage/CategoryShow";
import { useRemain } from "../Contexts/RemainingContext";
import i18n from '../Language/i18n';
import LanguageSelector from "../Language/LanguageSelector";
import TranslateComponent from "../Translate/TranslateComponent";

const Navbar = ({ searchTerm, setSearchTerm }) => {
    const { isInstructor, setInstructor } = useRemain();
    const { setCart, setCartLength, cartLength } = useCart();
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchInputVisible, setSearchInputVisible] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState(null);
    const [selectedSubDropdown, setSelectedSubDropdown] = useState(null);
    const { role } = useUser();
    // const [place, setPlace] = useState('Search For Anything')
    const [isOpen, setIsOpen] = useState(false);
    // const [userEmail, setUserEmail] = useState(null);

    const user = JSON.parse(localStorage.getItem("user"));

    const [showSubcategories, setShowSubcategories] = useState(false);


    useEffect(() => {
        const savedLanguage = localStorage.getItem('language') || 'en';
        i18n.changeLanguage(savedLanguage);
    }, []);

    // const role = JSON.parse(localStorage.getItem('role'));

    // const fetchUserRole = async () => {
    //     const token = localStorage.getItem('accessToken');

    //     try {
    //         const res = await axios.get('/auth/user-role', {
    //             headers: {
    //                 'Authorization': `Bearer ${token}`
    //             }
    //         });
    //         setRole(res?.data?.role);
    //     } catch (error) {
    //         console.error('Error fetching user role:', error);
    //     }
    // };

    // useEffect(() => {
    //     fetchUserRole();
    // })





    const checkInstructorStatus = async () => {
        try {
            const res = await axios.get(`/teach/checkInstructor/${user?.email}`);
            if (res?.data && res?.data?.success) {
                const instructor = res.data.instructor;
                // Check if the instructor has access
                if (instructor?.access === true) {
                    setInstructor(true);
                } else {
                    setInstructor(false);
                }
            } else {
                setInstructor(false);
            }
        } catch (error) {
            // toast.error('Fill the form of instructor');
        }
    };

    const getInitials = (name) => {
        if (!name) return "";

        const nameArray = name.split(" ");
        if (nameArray.length === 1) {
            return nameArray[0].slice(0, 1).toUpperCase();
        }

        return (
            nameArray[0].slice(0, 1).toUpperCase() +
            nameArray[1].slice(0, 1).toUpperCase()
        );
    };

    useEffect(() => {
        // Check if both token and user exist in local storage
        const accessToken = localStorage.getItem("accessToken");
        const refreshToken = localStorage.getItem("refreshToken");
        const user = localStorage.getItem("user");

        if (!(accessToken && refreshToken && user)) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            setCart([]);
            // setCartLength(0);
        }

        // checkInstructorStatus();
    }, []);

    const toggleAvatar = () => {
        setIsOpen(!isOpen); // Toggle the state between true and false
    };

    const navigation = [
        {
            name: isInstructor ? "Instructor" : "Be an Instructor",
            to: isInstructor ? "/teachins" : "/teach",
            current: false,
        },
    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(" ");
    }
    const handleCategoryClick = (category) => {
        setIsActive(category);
        // setShowDropdown(false);
    };

    const handlelogout = async () => {
        try {
            const token = localStorage.getItem("accessToken");
            const { data } = await axios.post(
                "/auth/logout",
                {}, // Pass an empty object as the data since we're using headers
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // Include token in the Authorization header
                        "Content-Type": "application/json",
                    },
                    withCredentials: true, // Include cookies in the request
                }
            );
            if (data?.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                localStorage.removeItem("role");
                setCartLength(0);
                setCart([]);
                setInstructor(false);
                // setInstructor(false)
                toast.success(data?.message);
                navigate("/login");
            }
        } catch (error) {
            toast.error("Token have expired please refresh the token");
            console.log(error.message);
        }
    };

    const handleRefreshToken = async () => {
        try {
            const res = await axios.post(
                "/auth/refresh-token",
                {},
                {
                    withCredentials: true, // Ensure cookies are sent with the request
                }
            );
            console.log(res.data);
            if (res && res?.data?.success) {
                toast.success(res?.data?.message);
                localStorage.setItem("accessToken", res?.data?.accessToken);
                localStorage.setItem("refreshToken", res?.data?.refreshToken);
            }
        } catch (error) {
            console.log(error.message);
            setCartLength(0);
            setInstructor(false);
            navigate("/login");
            toast.error("refresh token expired need to login again");
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
        }
    };

    // const checkTokenExpiration = () => {
    //     const accessToken = localStorage.getItem('accessToken');
    //     const refreshToken = localStorage.getItem('refreshToken');

    //     if (!accessToken || !refreshToken) {
    //         handlelogout();
    //         return;
    //     }

    //     try {
    //         const accessTokenDecoded = JSON.parse(atob(accessToken.split('.')[1]));
    //         const refreshTokenDecoded = JSON.parse(atob(refreshToken.split('.')[1]));

    //         const currentTime = Math.floor(Date.now() / 1000);

    //         if (accessTokenDecoded.exp < currentTime) {
    //             if (refreshTokenDecoded.exp < currentTime) {
    //                 handlelogout();
    //             } else {
    //                 handleRefreshToken();
    //             }
    //         }
    //     } catch (error) {
    //         console.error('Failed to decode token:', error);
    //         handlelogout();
    //     }
    // };

    // useEffect(() => {
    //     checkTokenExpiration();
    // }, []);

    const handlePathChange = (path) => {
        // setPlace("Search For Anything");
        setSearchTerm(""); // Clear search term
        navigate(`${path}`);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const inputValue = event.target.value || "";

        // setPlace(inputValue.trim());
        // setSearchTerm(inputValue);
        navigate("/dashboard");

        // if (inputValue.trim() === '') {
        //     setPlace("Search For Anything");
        // }
    };

    const handleAdmin = () => {
        navigate("/admin");
        setIsOpen(!isOpen);
        // window.location.reload();
    };

    const handleUser = () => {
        navigate("/user");
        setIsOpen(!isOpen);
        // window.location.reload();
    };

    const showDropDashboard = () => {
        navigate("/drop-dashboard");
        setShowDropdown(false);
    };

    const toggleDropdown = () => {
        setShowDropdown(!showDropdown);
        // handlePathChange("/");

        setSelectedDropdown(null);
        setSelectedSubDropdown(null); // Reset selected sub-dropdown when main dropdown is toggled
        // setSelectedSubSubDropdown(null); // Reset selected sub-sub-dropdown when main dropdown is toggled
    };

    const toggleSubDropdown = (dropdown) => {
        if (selectedDropdown === dropdown) {
            setSelectedDropdown(null); // Close sub-dropdown if already open
        } else {
            setSelectedDropdown(dropdown); // Show sub-dropdown for the selected item
        }
        setSelectedSubDropdown(null); // Reset selected sub-dropdown when main dropdown is toggled
        // setSelectedSubSubDropdown(null); // Reset selected sub-sub-dropdown when main dropdown is toggled
    };

    const toggleSubSubDropdown = (subDropdown) => {
        if (selectedSubDropdown === subDropdown) {
            setSelectedSubDropdown(null); // Close sub-sub-dropdown if already open
        } else {
            setSelectedSubDropdown(subDropdown); // Show sub-sub-dropdown for the selected item
        }
        // setSelectedSubSubDropdown(null); // Reset selected sub-sub-dropdown when main dropdown is toggled
    };

    const [isMenuOpen, setIsMenuOpen] = useState(false);

    const toggleMenu = () => {
        setIsMenuOpen(!isMenuOpen);
    };

    const toggleSearchInputVisibility = () => {
        setSearchInputVisible(!searchInputVisible);
    };

    return (
        <nav className="bg-white ">
            <div className="mx-auto sm:px-6 ">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex items-center w-full justify-between">
                        <div className="flex gap-6 items-center justify-between">
                            <button
                                className="block custom-mid:hidden p-2 text-gray-400  hover:text-gray-600 focus:outline-none"
                                onClick={toggleMenu}
                            >
                                <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                            </button>



                            <Link
                                to="/"
                                className="flex-shrink-0 items-center  hidden custom-mid:block"
                                onClick={() => {
                                    setShowDropdown(false);
                                    handlePathChange("/");
                                }}
                            >
                                <img className="h-12" src={images} alt="Your Company" />
                            </Link>

                            <Dropdown
                                showDropDashboard={showDropDashboard}
                                showDropdown={showDropdown}
                                selectedDropdown={selectedDropdown}
                                selectedSubDropdown={selectedSubDropdown}
                                toggleDropdown={toggleDropdown}
                                toggleSubDropdown={toggleSubDropdown}
                                toggleSubSubDropdown={toggleSubSubDropdown}
                            />
                            <form
                                onSubmit={handleSearch}
                                className="relative bg-gray-50 flex-grow h-12 hidden lg:w-[24rem] items-center custom-mid:flex rounded-full p-1 text-gray-800 border border-gray-600 "
                            >
                                <SearchIcon className="h-5 mx-2" />
                                <input
                                    type="text"
                                    placeholder="Search For Anything"
                                    className="bg-transparent text-gray-800 text-sm outline-none flex-grow"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={() => setShowDropdown(false)}
                                    onSubmit={handleSearch}
                                />
                            </form>




                        </div>

                        <div className="block custom-mid:hidden">

                            <form
                                onSubmit={handleSearch}
                                className=" bg-gray-50 h-10 w-60 flex items-center rounded-full p-1 text-gray-800 border border-gray-600 "
                            >
                                <SearchIcon className="h-5 mx-2" />
                                <input
                                    type="text"
                                    placeholder="Search For Anything"
                                    className="bg-transparent text-gray-800 text-sm outline-none flex-grow"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    onClick={() => setShowDropdown(false)}
                                    onSubmit={handleSearch}
                                />
                            </form>
                        </div>

                        <div className="flex items-center">
                            {navigation.map((item) => (
                                <Link
                                    key={item?.name}
                                    to={item?.to}
                                    className={` px-3 py-2 text-sm hidden lg:block font-medium ${item.current
                                        ? "text-gray-900"
                                        : "text-gray-800 hover:text-cyan-700 rounded-md"
                                        } whitespace-nowrap`}
                                    onClick={() => {
                                        handleCategoryClick(item?.name);
                                        setShowDropdown(false);
                                        handlePathChange(item?.to);
                                    }}
                                >
                                    {item?.name}
                                </Link>
                            ))}
                            <Link
                                to="/help"
                                className={`px-3 py-2 text-sm hidden lg:block font-medium ${false
                                    ? "text-gray-900"
                                    : "text-gray-800 hover:text-cyan-700 rounded-md"
                                    }`}
                                onClick={() => {
                                    handleCategoryClick("Help");
                                    setShowDropdown(false);
                                    handlePathChange("/help");
                                }}
                            >
                                Help
                            </Link>

                            <div
                                className="flex items-center justify-end space-x-1 sm:ml-6 sm:space-x-4"
                                onClick={() => setShowDropdown(false)}
                            >

                                <div className="hidden  custom-mid:block">
                                    <div className="flex items-center">
                                        <Link
                                            to="/cart"
                                            type="button"
                                            className="p-2 rounded-full  text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:text-green-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700"
                                        >
                                            <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                        </Link>
                                        <span className="bg-red-600 border-red-800 h-5 w-5 ml-[-10px] font-semibold text-white rounded-full flex items-center justify-center">
                                            {cartLength}
                                        </span>
                                    </div>
                                </div>
                                {!localStorage.getItem("accessToken") ? (
                                    <div className="flex space-x-4">
                                        <Link
                                            to="/login"
                                            className={`px-3 py-2 text-sm hidden  custom-mid:block  font-bold border border-black rounded hover:bg-gray-200 text-gray-900 ${isActive === "signin" ? "bg-slate-100" : ""
                                                } whitespace-nowrap`}
                                            onClick={() => {
                                                handleCategoryClick("signin");
                                                setShowDropdown(false);
                                            }}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/register"
                                            className={`px-3 py-2 text-sm hidden custom-mid:block  font-bold bg-black text-white rounded hover:bg-gray-800 whitespace-nowrap`}
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                ) : (
                                    <div className=" items-center space-x-6 rtl:space-x-reverse flex">
                                        <div className="dropdown dropdown-end">
                                            <div
                                                tabIndex={0}
                                                role="button"
                                                className="btn btn-ghost btn-circle avatar"
                                                onClick={toggleAvatar}
                                            >
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-8 sm:w-10">
                                                        <span className="text-lg sm:xl">
                                                            {(user?.name && getInitials(user?.name)) ||
                                                                (user?.firstName &&
                                                                    user.firstName.slice(0, 1) +
                                                                    user.lastName.slice(0, 1))}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {isOpen && ( // Render the dropdown only if isOpen is true
                                                <ul
                                                    tabIndex={0}
                                                    className="mt-3 mr-2 z-30 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                                                >
                                                    <li>
                                                        <a href="/#" className="flex justify-between">
                                                            Name
                                                            <span className="badge">
                                                                {user?.name ||
                                                                    `${user?.firstName} ${user?.lastName}`}
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/#" className="flex justify-between">
                                                            Role
                                                            <span className="badge">{role}</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        {role === "admin" ? (
                                                            <div
                                                                className="text-gray-600 dark:text-gray-500 cursor-pointer duration-300"
                                                                onClick={handleAdmin}
                                                            >
                                                                Admin Dashboard
                                                            </div>
                                                        ) : (
                                                            <>
                                                                <Link
                                                                    to="/myCourse"
                                                                    className="text-gray-600 dark:text-gray-500 cursor-pointer duration-300"
                                                                    onClick={() => setIsOpen(!isOpen)}
                                                                >
                                                                    My Course
                                                                </Link>
                                                                <Link
                                                                    to="/cart"
                                                                    className="text-gray-600 dark:text-gray-500 cursor-pointer duration-300"
                                                                    onClick={() => setIsOpen(!isOpen)}
                                                                >
                                                                    <div className="flex gap-24">
                                                                        <h1 className="w-4/5">My cart</h1>
                                                                        <span>{cartLength}</span>
                                                                    </div>
                                                                </Link>
                                                                <div
                                                                    className="text-gray-600 dark:text-gray-500 cursor-pointer duration-300"
                                                                    onClick={handleUser}
                                                                >
                                                                    User Dashboard
                                                                </div>
                                                            </>
                                                        )}
                                                    </li>
                                                    <li>
                                                        <div
                                                            className="text-blue-600 dark:text-blue-500 cursor-pointer duration-300"
                                                            onClick={handlelogout}
                                                        >
                                                            Logout
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div
                                                            className="text-blue-600 dark:text-blue-500 cursor-pointer duration-300"
                                                            onClick={handleRefreshToken}
                                                        >
                                                            Refresh Token
                                                        </div>
                                                    </li>


                                                </ul>

                                            )}
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <AnimatePresence initial={false}>
                {isMenuOpen && (
                    <div className="custom-mid:hidden shadow-lg">
                        <div className="space-y-1 flex flex-col items-start">
                            <div className="ml-20">
                                <Link
                                    to="/"
                                    className="flex-shrink-0 items-center block custom-mid:hidden"
                                    onClick={() => {
                                        setShowDropdown(false);
                                        handlePathChange("/");
                                    }}
                                >
                                    <img className="h-10" src={images} alt="Your Company" />
                                </Link>
                            </div>
                            {!localStorage.getItem("accessToken") ? (
                                <div className=" flex flex-col items-start w-full ">
                                    <motion.div
                                        className="md:hidden w-full flex flex-col"
                                        initial={{ height: 0 }}
                                        animate={{ height: isMenuOpen ? "auto" : 0 }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <Link
                                            to="/login"
                                            className={` sm:px-[33px] px-3 py-2 text-start text-cyan-600 dark:text-cyan-500 w-full cursor-pointer hover:bg-gray-100`}
                                            onClick={() => {
                                                handleCategoryClick("signin");
                                                setShowDropdown(false);
                                            }}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/register"
                                            className={` sm:px-[33px] border-b border-gray-300 px-3 py-2 text-start text-cyan-600 dark:text-cyan-500 w-full cursor-pointer hover:bg-gray-100`}
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Sign Up
                                        </Link>
                                        <div>
                                            <div className="flex items-center">
                                                <Link
                                                    to="/cart"
                                                    type="button"
                                                    className="p-2 rounded-full  text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:text-green-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700"
                                                >
                                                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                                </Link>
                                                <span className="bg-red-600 border-red-800 h-5 w-5 ml-[-10px] font-semibold text-white rounded-full flex items-center justify-center">
                                                    {cartLength}
                                                </span>
                                            </div>
                                        </div>
                                        <CategoryShow isMobileView={true} />
                                    </motion.div>
                                </div>
                            ) : (
                                <div className="  flex flex-col items-start w-full">
                                    <motion.div
                                        className="md:hidden w-full"
                                        initial={{ height: 0 }}
                                        animate={{ height: isMenuOpen ? "auto" : 0 }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div
                                            className="sm:px-[33px] text-sm px-3 py-2 text-start text-cyan-600 dark:text-cyan-500 w-full cursor-pointer  hover:bg-gray-100"
                                            onClick={handlelogout}
                                        >
                                            Logout
                                        </div>

                                        <div
                                            className="sm:px-[33px] text-sm border-b border-gray-300 px-3 py-2 text-start text-cyan-600 dark:text-cyan-500 w-full cursor-pointer hover:bg-gray-100"
                                            onClick={handleRefreshToken}
                                        >
                                            Refresh Token
                                        </div>

                                        <div>
                                            <div className="flex items-center">
                                                <Link
                                                    to="/cart"
                                                    type="button"
                                                    className="p-2 rounded-full  text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:text-green-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700"
                                                >
                                                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                                </Link>
                                                <span className="bg-red-600 border-red-800 h-5 w-5 ml-[-10px] font-semibold text-white rounded-full flex items-center justify-center">
                                                    {cartLength}
                                                </span>
                                            </div>
                                        </div>
                                        <CategoryShow isMobileView={true} />
                                    </motion.div>
                                </div>
                            )}
                            {/* {!localStorage.getItem('token') && (
                                <div className="flex justify-around">
                                    <Link
                                        to="/authSignin"
                                        className={`border border-black h-10 rounded flex items-center justify-center text-sm font-bold w-20 hover:bg-[#f5f5f5] text-gray-900 ${isActive === 'signin' ? 'bg-slate-100' : ''
                                            }`}
                                        onClick={() => {
                                            handleCategoryClick('signin');
                                            setShowDropdown(false);
                                        }}
                                    >
                                        Sign In
                                    </Link>
                                    <Link
                                        to="/authSignup"
                                        className="border bg-black text-white rounded flex items-center justify-center border-black h-10 text-sm font-bold w-20"
                                        onClick={() => setShowDropdown(false)}
                                    >
                                        Sign Up
                                    </Link>
                                </div>
                            )}
                            <div onClick={() => handleCategoryClick('dropdown')}>
                                <Dropdown1
                                    setDropdown={setDropdown}
                                    showDropDashboard={showDropDashboard}
                                    showDropdown={showDropdown}
                                    selectedDropdown={selectedDropdown}
                                    selectedSubDropdown={selectedSubDropdown}
                                    toggleDropdown={toggleDropdown}
                                    toggleSubDropdown={toggleSubDropdown}
                                    toggleSubSubDropdown={toggleSubSubDropdown}
                                />
                            </div>
                            <Link to='/dashboard' className={`px-3 py-2 text-sm font-medium ${false ? 'text-gray-900' : 'text-gray-800 hover:text-white hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-medium'
                                }`}
                                onClick={() => setShowDropdown(false)}
                            >All Course</Link>
                            {navigation.map((item) => (
                                <Link
                                    key={item.name}
                                    to={item.to}
                                    className={`px-3 py-2 text-sm font-medium ${item.current ? 'text-gray-900' : 'text-gray-800 hover:text-white hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-medium'
                                        }`}
                                    onClick={() => {
                                        handleCategoryClick(item.name);
                                        setShowDropdown(false)
                                    }}
                                >
                                    {item.name}
                                </Link>
                            ))} */}
                        </div>
                    </div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;