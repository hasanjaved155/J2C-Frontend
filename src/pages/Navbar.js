import React, { useEffect, useState } from "react";

import { ShoppingCartIcon, SearchIcon, MenuIcon } from '@heroicons/react/outline';

import { Link, useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import images from "../images copy/pcs logo.png";

import axios from "axios";
import Dropdown from './../dropdown/Dropdown';
import Dropdown1 from './../dropdown/Dropdown1';

const Navbar = ({ searchTerm, setSearchTerm, setDropdown, cartLength, setCartLength, isInstructor, setInstructor }) => {
    const navigate = useNavigate();
    const [isActive, setIsActive] = useState("");
    const [showDropdown, setShowDropdown] = useState(false);
    const [searchInputVisible, setSearchInputVisible] = useState(false);
    const [selectedDropdown, setSelectedDropdown] = useState(null);
    const [selectedSubDropdown, setSelectedSubDropdown] = useState(null);
    // const [place, setPlace] = useState('Search For Anything')
    const [isOpen, setIsOpen] = useState(false);
    // const [userEmail, setUserEmail] = useState(null);

    const user = JSON.parse(localStorage.getItem('user'));

    // useEffect(() => {
    //     // Simulating the setting of userEmail after login
    //     // Replace with actual logic to get user email
    //     setUserEmail(user?.email);
    // }, []);

    // useEffect(() => {
    //     if (userEmail) {
    //         checkInstructorStatus(userEmail);
    //     }
    // }, [userEmail]);

    // const checkInstructorStatus = async (userEmail) => {
    //     if (!userEmail) {
    //         console.warn('User email is undefined');
    //         return;
    //     }

    //     try {
    //         const res = await axios.get(`/teach/checkInstructor/${userEmail}`);
    //         if (res?.data && res?.data?.success) {
    //             setInstructor(true);
    //         } else {
    //             setInstructor(false);
    //         }
    //     } catch (error) {
    //         toast.error('Fill the form of instructor');
    //     }
    // };

    const getInitials = (name) => {
        if (!name) return '';

        const nameArray = name.split(' ');
        if (nameArray.length === 1) {
            return nameArray[0].slice(0, 1).toUpperCase();
        }

        return nameArray[0].slice(0, 1).toUpperCase() + nameArray[1].slice(0, 1).toUpperCase();
    };

    useEffect(() => {
        // Check if both token and user exist in local storage
        const accessToken = localStorage.getItem('accessToken');
        const refreshToken = localStorage.getItem('refreshToken');
        const user = localStorage.getItem('user');

        if (!(accessToken && refreshToken && user)) {
            localStorage.removeItem("accessToken");
            localStorage.removeItem("refreshToken");
            localStorage.removeItem("user");
            // setCartLength(0);

        }

        // checkInstructorStatus();

    }, []);




    const toggleAvatar = () => {
        setIsOpen(!isOpen); // Toggle the state between true and false
    };



    const navigation = [

        { name: isInstructor ? "Instructor" : 'Be an Instructor', to: '/teach', current: false },


    ];

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }
    const handleCategoryClick = (category) => {
        setIsActive(category);
        // setShowDropdown(false);
    };

    const handlelogout = async () => {

        try {
            const token = localStorage.getItem('accessToken');
            const { data } = await axios.post(
                '/auth/logout',
                {}, // Pass an empty object as the data since we're using headers
                {
                    headers: {
                        'Authorization': `Bearer ${token}`, // Include token in the Authorization header
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true // Include cookies in the request
                }
            );
            if (data?.success) {
                localStorage.removeItem("accessToken");
                localStorage.removeItem("refreshToken");
                localStorage.removeItem("user");
                setCartLength(0);
                setInstructor(false);
                // setInstructor(false)
                toast.success(data?.message);
                navigate("/login");
            }

        } catch (error) {
            toast.error("Token have expired please refresh the token")
            console.log(error.message);
        }


    };

    const handleRefreshToken = async () => {
        try {
            const res = await axios.post('/auth/refresh-token', {}, {
                withCredentials: true // Ensure cookies are sent with the request
            });
            console.log(res.data);
            if (res && res?.data?.success) {
                toast.success(res?.data?.message);
                localStorage.setItem("accessToken", res?.data?.accessToken);
                localStorage.setItem("refreshToken", res?.data?.refreshToken);
            }
        } catch (error) {
            console.log(error.message);
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
        setSearchTerm(''); // Clear search term
        navigate(`${path}`);
    };

    const handleSearch = (event) => {
        event.preventDefault();
        const inputValue = event.target.value || '';

        // setPlace(inputValue.trim());
        // setSearchTerm(inputValue);
        navigate('/dashboard');

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
        <nav className="bg-white border-blue-500 border-y-2 shadow-lg">
            <div className="mx-auto sm:px-6 ">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="flex items-center sm:hidden">
                        <button
                            className="p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none"
                            onClick={toggleMenu}
                        >
                            <MenuIcon className="block h-6 w-6" aria-hidden="true" />
                        </button>
                    </div>
                    <div className="flex items-center w-full justify-between">


                        <div className="flex space-x-4 items-center">
                            <Link to='/' className="flex-shrink-0 items-center"
                                onClick={() => {
                                    setShowDropdown(false);
                                    handlePathChange('/')
                                }}>
                                <img
                                    className="h-24 w-24"
                                    src={images}
                                    alt="Your Company"
                                />
                            </Link>

                            <Dropdown
                                setDropdown={setDropdown}
                                showDropDashboard={showDropDashboard}
                                showDropdown={showDropdown}
                                selectedDropdown={selectedDropdown}
                                selectedSubDropdown={selectedSubDropdown}
                                toggleDropdown={toggleDropdown}
                                toggleSubDropdown={toggleSubDropdown}
                                toggleSubSubDropdown={toggleSubSubDropdown}
                            />
                            <form onSubmit={handleSearch} className="relative h-12 w-[38rem] items-center flex rounded-full  p-1 text-gray-800 border-2 border-blue-500">
                                <SearchIcon className="h-5 mx-2" />
                                <input
                                    type="text"
                                    placeholder="Search For Anything"
                                    className="bg-transparent text-gray-800 text-sm outline-none"
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
                                    className={`px-3 py-2 text-sm md:hidden lg:block font-medium ${item.current ? 'text-gray-900' : 'text-gray-800 hover:text-white hover:bg-gray-700 rounded-md'
                                        }`}
                                    onClick={() => {
                                        handleCategoryClick(item?.name);
                                        setShowDropdown(false);
                                        handlePathChange(item?.to)
                                    }
                                    }
                                >
                                    {item?.name}
                                </Link>
                            ))}
                            <Link

                                to='/help'
                                className={`px-3 py-2 text-sm md:hidden lg:block font-medium ${false ? 'text-gray-900' : 'text-gray-800 hover:text-white hover:bg-gray-700 rounded-md'
                                    }`}
                                onClick={() => {
                                    handleCategoryClick('Help');
                                    setShowDropdown(false);
                                    handlePathChange('/help')
                                }
                                }
                            >
                                Help
                            </Link>


                            <div className="flex items-center justify-end space-x-6 sm:ml-6 sm:space-x-4"
                                onClick={() => setShowDropdown(false)}>

                                <div className="flex items-center"><Link to='/cart'
                                    type="button"
                                    className="p-2 rounded-full  text-gray-900 hover:bg-gray-200 focus:bg-gray-200 focus:text-green-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-green-700"
                                >

                                    <ShoppingCartIcon className="h-6 w-6" aria-hidden="true" />
                                </Link> <span className="bg-red-600 border-red-800 h-6 w-6 ml-[-5px] font-semibold text-white rounded-full">
                                        {cartLength}
                                    </span></div>



                                {!localStorage.getItem("accessToken") ? (
                                    <div className="flex space-x-4">
                                        <Link
                                            to="/login"
                                            className={`px-3 py-2 text-sm hidden  md:block lg:block font-bold border border-black rounded hover:bg-gray-200 text-gray-900 ${isActive === 'signin' ? 'bg-slate-100' : ''}`}
                                            onClick={() => {
                                                handleCategoryClick("signin");
                                                setShowDropdown(false);
                                            }}
                                        >
                                            Sign In
                                        </Link>
                                        <Link
                                            to="/register"
                                            className={`px-3 py-2 text-sm hidden md:block lg:block font-bold bg-black text-white rounded hover:bg-gray-800`}
                                            onClick={() => setShowDropdown(false)}
                                        >
                                            Sign Up
                                        </Link>
                                    </div>
                                ) : (
                                    <div className="flex items-center space-x-6 rtl:space-x-reverse"
                                    >
                                        <div className="dropdown dropdown-end">
                                            <div
                                                tabIndex={0}
                                                role="button"
                                                className="btn btn-ghost btn-circle avatar"
                                                onClick={toggleAvatar}
                                            >
                                                <div className="avatar placeholder">
                                                    <div className="bg-neutral text-neutral-content rounded-full w-10">
                                                        <span className="text-xl">
                                                            {(user?.name && getInitials(user?.name)) ||
                                                                (user?.firstName && user.firstName.slice(0, 1) + user.lastName.slice(0, 1))}
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>

                                            {isOpen && ( // Render the dropdown only if isOpen is true
                                                <ul
                                                    tabIndex={0}
                                                    className="mt-3 z-20 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
                                                >
                                                    <li>
                                                        <a href="/#" className="flex justify-between">
                                                            Name
                                                            <span className="badge">
                                                                {user?.name || `${user?.firstName} ${user?.lastName}`}
                                                            </span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        <a href="/#" className="flex justify-between">
                                                            Role
                                                            <span className="badge">{user?.role}</span>
                                                        </a>
                                                    </li>
                                                    <li>
                                                        {user?.role === 'admin' ? (
                                                            <div
                                                                className="text-gray-600 dark:text-gray-500 hover:text-xl cursor-pointer duration-300"
                                                                onClick={handleAdmin}
                                                            >
                                                                Admin Dashboard
                                                            </div>
                                                        ) : (
                                                            <div
                                                                className="text-gray-600 dark:text-gray-500 hover:text-xl cursor-pointer duration-300"
                                                                onClick={handleUser}
                                                            >
                                                                User Dashboard
                                                            </div>
                                                        )}
                                                    </li>
                                                    <li>
                                                        <div
                                                            className="text-blue-600 dark:text-blue-500 hover:text-xl cursor-pointer duration-300"
                                                            onClick={handlelogout}
                                                        >
                                                            Logout
                                                        </div>
                                                    </li>
                                                    <li>
                                                        <div
                                                            className="text-blue-600 dark:text-blue-500 hover:text-xl cursor-pointer duration-300"
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

            {
                isMenuOpen && (
                    <div className="md:hidden">
                        <div className="space-y-1 px-2 pb-3 pt-2">
                            {!localStorage.getItem('token') && (
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
                            ))}
                        </div>
                    </div>
                )
            }
        </nav>
    )
}

export default Navbar;
