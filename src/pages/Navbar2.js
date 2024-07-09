import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import images from "../images copy/pcs logo.png";


const Navbar2 = () => {
    const [isActive, setIsActive] = useState(false);

    const toggleMenu = () => {
        setIsActive(!isActive);
    };

    return (
        <header className="relative w-full mx-auto bg-white rounded shadow-md">
            <Link to="/" className="float-left text-center">
                <img
                    className="h-24 w-24"
                    src={images}
                    alt="Your Company"
                />
            </Link>
            <div className="float-right cursor-pointer text-3xl text-blue-500" onClick={toggleMenu}>
                <i className={`fa ${isActive ? 'fa-times' : 'fa-bars'}`}></i>
            </div>
            <nav className={`${isActive ? 'block' : 'hidden'} md:block`}>
                <ul className="flex flex-col md:flex-row list-none p-0 m-0">
                    <li>
                        <a href="#" className="block my-2 py-2 px-5 no-underline text-gray-800 hover:bg-blue-500 hover:text-white transition duration-500">Home</a>
                    </li>
                    <li>
                        <a href="#" className="block my-2 py-2 px-5 no-underline text-gray-800 hover:bg-blue-500 hover:text-white transition duration-500">About</a>
                    </li>
                    <li>
                        <a href="#" className="block my-2 py-2 px-5 no-underline text-gray-800 hover:bg-blue-500 hover:text-white transition duration-500">Services</a>
                    </li>
                    <li>
                        <a href="#" className="block my-2 py-2 px-5 no-underline text-gray-800 hover:bg-blue-500 hover:text-white transition duration-500">Term</a>
                    </li>
                    <li>
                        <a href="#" className="block my-2 py-2 px-5 no-underline text-gray-800 hover:bg-blue-500 hover:text-white transition duration-500">Portfolio</a>
                    </li>
                    <li>
                        <a href="#" className="block my-2 py-2 px-5 no-underline text-gray-800 hover:bg-blue-500 hover:text-white transition duration-500">Contact</a>
                    </li>
                </ul>
            </nav>
            <div className="clear-both"></div>
        </header>
    );
};

export default Navbar2;
