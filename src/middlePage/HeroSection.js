import { motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import CoursePlaylist from "./CoursePlaylist";
import axios from "axios";
import toast from "react-hot-toast";

const HeroSection = ({ savedItem }) => {

    const accessToken = localStorage.getItem('accessToken');

    const handleBuyCourse = async () => {
        try {
            const response = await axios.post(`/course/purchase/${savedItem?._id}`, {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${accessToken}`, // Assuming the user token is stored in a state or context
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

    return (
        <section className="w-full text-start grid grid-cols-12 md:grid-cols-12 gap-8 max-w-6xl mx-auto">
            <div className="col-span-8 flex flex-col">
                <span className="block mb-8 text-xl md:text-xl text-black font-extrabold uppercase">
                    {savedItem?.courseName}
                </span>
                <div className="border-2 rounded-lg p-7 border-black">
                    <h3 className="text-xl md:text-xl font-bold">
                        What will you Learn
                    </h3>
                    <p className="text-base md:text-lg text-slate-700 my-4 md:my-6">
                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nam nobis in
                        error repellat voluptatibus ad.
                    </p>
                </div>
                <div className='mt-4 mb-4'>
                    <h1 className='mt-3 text-xl font-semibold text-start'>
                        Course Content
                    </h1>
                    <CoursePlaylist
                        path={savedItem?.path}
                        folderId={savedItem?.folderId}
                    />
                </div>
            </div>
            <div className="shadow-xl bg-slate-100 rounded-xl col-span-4 overflow-hidden h-[40.7rem] mt-14">
                <div>
                    <img
                        className="rounded-xl h-48 w-full shadow-gray-400 shadow-xl"
                        src={savedItem?.image} alt="online course" />
                </div>
                <div className="p-4">
                    <div className="bg-green-600 flex justify-evenly rounded-lg mb-2 p-2 items-center">
                        <h1 className="font-bold text-xl text-white">$ 100</h1>
                        <h4 className="font-light text-sm text-gray-300 line-through">$ 300</h4>
                        <div className="flex justify-end w-1/2 gap-1 items-center">
                            <div className="text-yellow-400">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" fill="currentColor" class="size-4">
                                    <path fill-rule="evenodd" d="M8 1.75a.75.75 0 0 1 .692.462l1.41 3.393 3.664.293a.75.75 0 0 1 .428 1.317l-2.791 2.39.853 3.575a.75.75 0 0 1-1.12.814L7.998 12.08l-3.135 1.915a.75.75 0 0 1-1.12-.814l.852-3.574-2.79-2.39a.75.75 0 0 1 .427-1.318l3.663-.293 1.41-3.393A.75.75 0 0 1 8 1.75Z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <h1 className="text-white">{savedItem?.finalRating.toString().slice(0, 3)}</h1>
                        </div>
                    </div>
                    <div className="flex justify-end mt-4">
                        <button type="button" className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                            onClick={handleBuyCourse}>
                            Buy This Course
                        </button>
                        <button type="button" className="flex gap-1 text-blue-500  hover:text-black outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2  after:">
                            Add To Cart
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="size-6">
                                <path stroke-linecap="round" stroke-linejoin="round" d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 0 0-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 0 0-16.536-1.84M7.5 14.25 5.106 5.272M6 20.25a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Zm12.75 0a.75.75 0 1 1-1.5 0 .75.75 0 0 1 1.5 0Z" />
                            </svg>
                        </button>
                    </div>
                </div>
            </div>
        </section>
    );
};




export default HeroSection;