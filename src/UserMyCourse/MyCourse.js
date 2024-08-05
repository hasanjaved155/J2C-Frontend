import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const MyCourses = ({ setItem }) => {
    const [courses, setCourses] = useState([]);
    const location = useLocation();
    const accessToken = localStorage.getItem('accessToken');

    const fetchMyCourses = async () => {
        try {
            const response = await axios.get('/course/my-courses', {
                headers: {
                    'Authorization': `Bearer ${accessToken}`,
                },
            });
            const data = await response.data.courses;
            setCourses(data);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        // Check if the page needs to reload
        const shouldReload = sessionStorage.getItem('shouldReloadMyCourses') === 'true';
        if (shouldReload) {
            // Reset the flag
            sessionStorage.setItem('shouldReloadMyCourses', 'false');
            // Reload the page
            window.location.reload();
        } else {
            fetchMyCourses();
        }
    }, [location.key]);

    useEffect(() => {
        return () => {
            // Set the flag to reload the page when navigating away
            sessionStorage.setItem('shouldReloadMyCourses', 'true');
        };
    }, []);

    return (
        <div>
            <h1 className='text-xl p-5 font-semibold'>My Courses</h1>
            <div className="flex flex-col items-center justify-center pb-6">
                <div className='grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4'>
                    {courses.map(item => (
                        <div key={item._id} className="relative">
                            <Link to={item?.path} onClick={() => setItem(item)}>
                                <div className="lg:w-[300px] lg:h-[250px] h-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-2 duration-200 hover:shadow-[#6260607a] hover:shadow-xl">
                                    <img
                                        className="rounded-t-lg"
                                        src={item?.image}
                                        alt=""
                                        style={{ width: "300px", height: "140px" }}
                                    />
                                    <div className="p-5">
                                        <h5 className="mb-2 text-base lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                                            {item?.courseName.slice(0, 28)} <br />
                                            {item?.courseName.slice(28)}
                                        </h5>
                                        <div className="flex items-center justify-around mt-2">
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
                                                            className={`cursor-pointer text-lg ${item?.finalRating >= rating ? 'text-yellow-400' : 'text-gray-400'
                                                                }`}
                                                        >
                                                            &#9733;
                                                        </label>
                                                    </div>
                                                ))}
                                                <p className="ml-2 text-sm font-semibold">
                                                    {item?.finalRating ?? 'No Rating'}
                                                </p>
                                            </div>
                                            <div className='flex'>
                                                <p className="ml-2 text-sm text-red-500">{item?.reviews?.length} reviews</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default MyCourses;
