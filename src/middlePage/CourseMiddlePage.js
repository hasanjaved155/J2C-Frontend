import React, { useRef, useEffect, useState } from "react";
import HeroSection from "./HeroSection";
import toast from "react-hot-toast";
import axios from "axios";
import { Link } from "react-router-dom";

const CourseMiddlePage = ({ item, setSearchTerm }) => {
    const [divWidth, setDivWidth] = useState(null);
    const divRef = useRef(null);
    const [isSticky, setIsSticky] = useState(false);
    const observerRef = useRef(null);
    const accessToken = localStorage.getItem("accessToken");

    const [savedItem, setSavedItem] = useState(item);
    const [description, setDescription] = useState("");

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 470) {
                setIsSticky(true);
            } else {
                setIsSticky(false);
            }
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    const handleBuyCourse = async () => {
        try {
            const response = await axios.post(`/course/purchase/${savedItem?._id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${accessToken}`, // Assuming the user token is stored in a state or context
                },
            });

            if (response?.data?.success) {
                toast.success(response?.data?.message);
            } else {
                toast.error(response?.data?.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    const handleDescription = async () => {
        if (!savedItem || !savedItem.path) {
            // Handle the case where savedItem or savedItem.path is undefined
            return;
        }
        try {
            const res = await axios.get(
                `/description/get-description/${savedItem?.path.slice(1)}`
            );
            if (res?.data?.success) {
                setDescription(res.data.description);
            } else {
                console.error("Request was not successful:", res?.data?.message);
                toast.error("Request was not successful");
            }
        } catch (error) {
            console.error("Error fetching description:", error);
            toast.error("Error fetching description");
        }
    };

    useEffect(() => {
        handleDescription();
    }, [savedItem?.path]);

    useEffect(() => {
        // Retrieve item from localStorage if available
        const storedItem = localStorage.getItem("courseItem");
        if (storedItem) {
            setSavedItem(JSON.parse(storedItem));
        }
    }, []);

    useEffect(() => {
        // Save item to localStorage whenever it changes
        if (item) {
            localStorage.setItem("courseItem", JSON.stringify(item));
            setSavedItem(item);
        }
    }, [item]);

    useEffect(() => {
        const updateWidth = () => {
            if (divRef.current) {
                setDivWidth(divRef.current.offsetWidth);
            }
        };

        const resizeObserver = new ResizeObserver(() => {
            updateWidth();
        });

        if (divRef.current) {
            resizeObserver.observe(divRef.current);
        }

        window.addEventListener("load", updateWidth);
        window.addEventListener("resize", updateWidth);

        return () => {
            window.removeEventListener("load", updateWidth);
            window.removeEventListener("resize", updateWidth);
            if (divRef.current) {
                resizeObserver.unobserve(divRef.current);
            }
        };
    }, [savedItem]);

    if (!savedItem) return null;

    return (
        <>
            <div className="w-full hidden custom-1050:block">
                <div className=" flex gap-20 justify-center px-20  bg-gradient-to-r from-zinc-100 to-zinc-200 py-10 max-h-[25rem] ">
                    <div className="text-md breadcrumbs flex-1" ref={divRef}>
                        <ul>
                            <li className="hover:text-cyan-700">
                                <Link
                                    to="/"
                                    style={{ textDecoration: "none" }}
                                    onClick={() => setSearchTerm("")}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        class="size-6"
                                    >
                                        <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                        <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                                    </svg>
                                </Link>
                            </li>
                            <li className="hover:text-cyan-700">
                                <Link
                                    to="/dashboard"
                                    style={{ textDecoration: "none" }}
                                    onClick={() => setSearchTerm(savedItem?.courseTitle)}
                                >
                                    {savedItem?.courseTitle}
                                </Link>
                            </li>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="0.6"
                                stroke="currentColor"
                                class="w-4 h-4 ml-1.5"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="m19.5 8.25-7.5 7.5-7.5-7.5"
                                />
                            </svg>
                        </ul>
                        <div className="text-4xl mt-6 font-extrabold text-left">
                            {savedItem?.courseName}
                        </div>
                        <h1 className="text-xl text-left flex justify-start mt-8">
                            {savedItem?.courseInfo}
                        </h1>

                        <div className="font-extrabold mt-6 text-black">
                            <div className="flex items-center text-xl mt-2">
                                <div className="flex items-center">
                                    {[1, 2, 3, 4, 5].map((rating) => (
                                        <div key={rating} className="flex items-center">
                                            <input
                                                type="radio"
                                                name="rating"
                                                value={rating}
                                                id={rating.toString()}
                                                className="hidden"
                                            />
                                            <label
                                                htmlFor={rating.toString()}
                                                className={`cursor-pointer text-lg ${savedItem?.finalRating >= rating
                                                    ? "text-yellow-400"
                                                    : "text-gray-400"
                                                    }`}
                                            >
                                                &#9733;
                                            </label>
                                        </div>
                                    ))}
                                    <p className="ml-2 text-sm font-semibold">
                                        {savedItem?.finalRating
                                            ? parseFloat(savedItem.finalRating).toFixed(1)
                                            : "No Rating"}
                                    </p>
                                </div>
                                <div className="flex">
                                    <p className="ml-2 text-sm">
                                        ({savedItem?.reviews?.length} ratings)
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-baseline space-x-2 text-xl mt-2">
                                <h1 className="font-light text-base">created by</h1>
                                <h1 className="text-cyan-700 font-lato">
                                    {savedItem?.authorName}
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="drop-shadow-lg bg-white h-[40.7rem]">
                        <div className="w-88">
                            <img
                                className=" h-48 w-full shadow-gray-400 "
                                src={savedItem?.image}
                                alt="online course"
                            />
                        </div>
                        <div className="p-4">
                            <div className=" flex justify-start items-center rounded-lg mb-2 p-2 gap-2">
                                <h1 className="font-bold text-3xl text-zinc-800">$100</h1>
                                <h4 className=" text-xl text-zinc-500 line-through">$300</h4>
                                <div className="flex justify-end w-1/2 gap-1 items-center">
                                    <div className="text-yellow-500  ">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 16 16"
                                            fill="currentColor"
                                            class="size-6"
                                        >
                                            <path
                                                fill-rule="evenodd"
                                                d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                                                clip-rule="evenodd"
                                            />
                                        </svg>
                                    </div>
                                    <h1 className="text-lg">
                                        {savedItem?.finalRating
                                            ? parseFloat(savedItem.finalRating).toFixed(1)
                                            : "No Rating"}
                                    </h1>
                                </div>
                            </div>

                            <div className="mt-4">
                                <button
                                    type="button"
                                    className="text-white w-full bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-gray-300  font-semibold px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 transition-all duration-200"
                                    onClick={handleBuyCourse}
                                >
                                    Buy this Course
                                </button>
                                <button
                                    type="button"
                                    className="flex gap-1 w-full text-cyan-600 hover:bg-neutral-100 border-cyan-600 border justify-center  items-center outline-none font-semibold px-5 py-2.5 mb-2 transition-all duration-200 "
                                >
                                    Add To Cart
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-6"
                                    >
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* <div className='w-8/12'>
                <h1 className='mt-3 text-xl font-semibold text-start'>
                    Course Content
                </h1>
                <div className='border-4 border-red-400'>

                </div>
            </div> */}
            </div>
            <div className="px-20 hidden custom-1050:block">
                <HeroSection savedItem={savedItem} width={divWidth} />
            </div>

            <div className="w-full flex flex-col items-center custom-1050:hidden ">
                <ul className="flex items-center gap-3 py-4">
                    <li className="hover:text-cyan-700">
                        <Link
                            to="/"
                            style={{ textDecoration: "none" }}
                            onClick={() => setSearchTerm("")}
                        >
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="size-6"
                            >
                                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                        </Link>
                    </li>
                    <li className="hover:text-cyan-700">
                        <Link
                            to="/dashboard"
                            style={{ textDecoration: "none" }}
                            onClick={() => setSearchTerm(savedItem?.courseTitle)}
                        >
                            {savedItem?.courseTitle}
                        </Link>
                    </li>
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="0.6"
                        stroke="currentColor"
                        class="w-4 h-4 ml-1.5"
                    >
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="m19.5 8.25-7.5 7.5-7.5-7.5"
                        />
                    </svg>
                </ul>
                <div className="px-4 sm:px-20 md:px-40 transition-all duration-200 w-full">
                    <img
                        className="w-full h-auto shadow-gray-400"
                        src={savedItem?.image}
                        alt="online course"
                    />
                </div>
                <div className="text-md text-black px-4 sm:px-20 md:px-40 transition-all duration-200">
                    <div className="text-2xl custom-420:text-3xl md:text-4xl mt-6 font-extrabold text-left">
                        {savedItem?.courseName}
                    </div>
                    <h1 className="custom-420:text-lg md:text-xl text-left flex justify-start mt-8">
                        {savedItem?.courseInfo}
                    </h1>

                    <div className="font-extrabold mt-6 text-black">
                        <div className="flex items-center text-xl mt-2">
                            <div className="flex items-center">
                                {[1, 2, 3, 4, 5].map((rating) => (
                                    <div key={rating} className="flex items-center">
                                        <input
                                            type="radio"
                                            name="rating"
                                            value={rating}
                                            id={rating.toString()}
                                            className="hidden"
                                        />
                                        <label
                                            htmlFor={rating.toString()}
                                            className={`cursor-pointer text-lg ${savedItem?.finalRating >= rating
                                                ? "text-yellow-400"
                                                : "text-gray-400"
                                                }`}
                                        >
                                            &#9733;
                                        </label>
                                    </div>
                                ))}
                                <p className="ml-2 text-sm font-semibold">
                                    {savedItem?.finalRating
                                        ? parseFloat(savedItem.finalRating).toFixed(1)
                                        : "No Rating"}
                                </p>
                            </div>
                            <div className="flex">
                                <p className="ml-2 text-sm">
                                    ({savedItem?.reviews?.length} ratings)
                                </p>
                            </div>
                        </div>
                        <div className="flex space-x-2 custom-420:text-lg md:text-xl mt-2">
                            <h1 className="font-light">created by</h1>
                            <h1 className="">{savedItem?.authorName}</h1>
                        </div>
                    </div>
                </div>

                <div className="px-4 sm:px-20 md:px-40 transition-all duration-200 w-full mt-4">
                    <div className=" flex justify-between items-center rounded-lg mb-2 p-2 gap-2">
                        <div className="flex items-center gap-2">
                            <h1 className="font-bold text-3xl text-zinc-800">$100</h1>
                            <h4 className=" text-xl text-zinc-500 line-through">$300</h4>
                        </div>
                        <div className="flex justify-end w-1/2 gap-1 items-center">
                            <div className="text-yellow-500  ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 16 16"
                                    fill="currentColor"
                                    class="size-6"
                                >
                                    <path
                                        fill-rule="evenodd"
                                        d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z"
                                        clip-rule="evenodd"
                                    />
                                </svg>
                            </div>
                            <h1 className="text-lg">
                                {savedItem?.finalRating
                                    ? parseFloat(savedItem.finalRating).toFixed(1)
                                    : "No Rating"}
                            </h1>
                        </div>
                    </div>

                    <div className="mt-1">
                        <button
                            type="button"
                            className="text-white w-full bg-cyan-600 hover:bg-cyan-500 focus:outline-none focus:ring-4 focus:ring-gray-300  font-semibold px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700 transition-all duration-200"
                        //   onClick={handleBuyCourse}
                        >
                            Buy this Course
                        </button>
                        <button
                            type="button"
                            className="flex gap-1 w-full text-cyan-600 hover:bg-neutral-100 border-cyan-600 border justify-center  items-center outline-none font-semibold px-5 py-2.5 mb-2 transition-all duration-200 "
                        >
                            Add To Cart
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="currentColor"
                                class="size-6"
                            >
                                <path
                                    stroke-linecap="round"
                                    stroke-linejoin="round"
                                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z"
                                />
                            </svg>
                        </button>
                    </div>
                </div>

                <div className="px-4 sm:px-20 md:px-40 transition duration-200 block custom-1050:hidden">
                    <HeroSection savedItem={savedItem} width={divWidth} />
                </div>
            </div>

            <div
                className={`transition-all bg-neutral-100/30 backdrop-blur-md px-5 py-2 hidden custom-1050:block ${isSticky ? "fixed top-0 left-0 w-full" : ""
                    } shadow-lg`}

            >
                <div className="text-xl font-bold text-left  text-zinc-800  ">
                    {savedItem?.courseName}
                </div>

                <div className="font-extrabold text-black">
                    <div className="flex items-center text-xl mt-2">
                        <div className="flex items-center">
                            {[1, 2, 3, 4, 5].map((rating) => (
                                <div key={rating} className="flex items-center">
                                    <input
                                        type="radio"
                                        name="rating"
                                        value={rating}
                                        id={rating.toString()}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor={rating.toString()}
                                        className={`cursor-pointer text-lg ${savedItem?.finalRating >= rating
                                            ? "text-yellow-400"
                                            : "text-gray-400"
                                            }`}
                                    >
                                        &#9733;
                                    </label>
                                </div>
                            ))}
                            <p className="ml-2 text-sm font-semibold">
                                {savedItem?.finalRating
                                    ? parseFloat(savedItem.finalRating).toFixed(1)
                                    : "No Rating"}
                            </p>
                        </div>
                        <div className="flex">
                            <p className="ml-2 text-sm">
                                ({savedItem?.reviews?.length} ratings)
                            </p>
                        </div>
                        <div className="flex gap-[4px]  ml-3 items-baseline">
                            <h1 className="font-light text-base">created by</h1>
                            <h1 className="text-zinc-800 text-base font-bold">
                                {savedItem?.authorName}
                            </h1>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default CourseMiddlePage;