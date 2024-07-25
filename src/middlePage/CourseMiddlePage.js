import React, { useEffect, useState } from 'react'
import HeroSection from './HeroSection'
import toast from 'react-hot-toast';
import axios from 'axios';
import { Link } from 'react-router-dom';

const CourseMiddlePage = ({ item, setSearchTerm, setSelectedVideo }) => {
    const [savedItem, setSavedItem] = useState(item);
    const [description, setDescription] = useState('');

    const handleDescription = async () => {
        if (!savedItem || !savedItem.path) {
            // Handle the case where savedItem or savedItem.path is undefined
            return;
        }
        try {
            const res = await axios.get(`/description/get-description/${savedItem?.path.slice(1)}`);
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
        const storedItem = localStorage.getItem('courseItem');
        if (storedItem) {
            setSavedItem(JSON.parse(storedItem));
        }
    }, []);

    useEffect(() => {
        // Save item to localStorage whenever it changes
        if (item) {
            localStorage.setItem('courseItem', JSON.stringify(item));
            setSavedItem(item);
        }
    }, [item]);



    if (!savedItem) return null; // Or display a loading message


    return (
        <div className='ml-56 max-w-6xl'>
            <div className="text-md breadcrumbs py-5">
                <ul>
                    <li className="hover:text-blue-400">
                        <Link to='/'
                            style={{ textDecoration: "none" }}
                            onClick={() => setSearchTerm("")}>
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" class="size-6">
                                <path d="M11.47 3.841a.75.75 0 0 1 1.06 0l8.69 8.69a.75.75 0 1 0 1.06-1.061l-8.689-8.69a2.25 2.25 0 0 0-3.182 0l-8.69 8.69a.75.75 0 1 0 1.061 1.06l8.69-8.689Z" />
                                <path d="m12 5.432 8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 0 1-.75-.75v-4.5a.75.75 0 0 0-.75-.75h-3a.75.75 0 0 0-.75.75V21a.75.75 0 0 1-.75.75H5.625a1.875 1.875 0 0 1-1.875-1.875v-6.198a2.29 2.29 0 0 0 .091-.086L12 5.432Z" />
                            </svg>
                        </Link>
                    </li>
                    <li className="hover:text-blue-400">
                        <Link to='/dashboard'
                            style={{ textDecoration: "none" }}
                            onClick={() => setSearchTerm(savedItem?.courseTitle)}>
                            {savedItem?.courseTitle}
                        </Link>

                    </li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.6" stroke="currentColor" class="w-4 h-4 ml-1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </ul>
                {/* <h1 className="text-4xl flex justify-start mb-3 mt-8">xyz</h1> */}
            </div>
            <div>
                <HeroSection savedItem={savedItem} setSelectedVideo={setSelectedVideo} />
            </div>

            {/* <div className='w-8/12'>
                <h1 className='mt-3 text-xl font-semibold text-start'>
                    Course Content
                </h1>
                <div className='border-4 border-red-400'>

                </div>
            </div> */}
        </div>
    )
}

export default CourseMiddlePage
