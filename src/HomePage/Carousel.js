import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import toast from 'react-hot-toast';
import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import icons from react-icons
import { Link } from 'react-router-dom';
import { useCart } from '../Contexts/CartContext';

const Carousel = ({ id, setItem }) => {
    const [dashboards, setDashboards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favorites, setFavorites] = useState({});
    const [courses, setCourses] = useState([]);
    const { cartLength, setCartLength } = useCart();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleAddToCart = async (item) => {

        try {
            const res = await axios.post(`/cart/create-cart/${user._id}`, { name: item?.courseName, link: item?.path, image: item?.image });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setCartLength(cartLength + 1)

            } else if (!res.data.success) {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Please login to add");
        }


    };

    const fetchSubsubcategoriesAndCourses = async () => {
        try {
            const { data } = await axios.get(`/category/allsubsubcategories/${id}/subsubcategories`);
            const subsubcategories = data?.subsubcategories?.slice(0, 6) || [];
            setDashboards(subsubcategories);

            // Fetch courses for each subsubcategory
            const courseRequests = subsubcategories.map(subsub =>
                axios.get(`/course/get-dashboard?search=${subsub.subSubCategoryName}`)
            );
            const courseResponses = await Promise.all(courseRequests);
            const fetchedCourses = courseResponses.flatMap(response => response.data.dashboards || []);
            setCourses(fetchedCourses);
        } catch (error) {
            console.error('Failed to fetch data', error);
            toast.error('Failed to fetch data');
        }
    };

    useEffect(() => {

        fetchSubsubcategoriesAndCourses();
    }, [id]);

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 4, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 4, dashboards.length - 4));
    };

    const visibleItems = courses.slice(currentIndex, currentIndex + 4);

    const toggleHeart = (itemId) => {
        setFavorites(prevFavorites => ({
            ...prevFavorites,
            [itemId]: !prevFavorites[itemId]
        }));
    };

    return (
        <div className="relative">
            <div className="absolute left-0 top-1/2 transform -translate-y-1/2 z-10 ml-14">
                <button
                    onClick={handlePrev}
                    className="bg-black text-white rounded-full p-2 shadow"
                    disabled={currentIndex === 0}
                >
                    <ChevronLeftIcon className="h-6 w-6" />
                </button>
            </div>
            <div className="carousel carousel-center rounded-box">
                {visibleItems.map((item) => (
                    <div className="carousel-item m-4 rounded-lg bg-white text-black shadow-md p-4 max-w-xs" key={item._id}>
                        <div className="text-center">
                            <Link to='/description' className="left-0 right-0 top-0 bottom-0"
                                onClick={() => setItem(item)}>
                                <img
                                    src={item?.image || "https://imgur.com/ZpVouSq.png"}
                                    alt={item?.name || 'Course'}
                                    className="rounded-lg"
                                    style={{ width: "300px", height: "100px" }}
                                />

                                <h5 className="text-lg pt-2 font-semibold">{item?.courseName || 'Espresso'}</h5>

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
                            </Link>
                            {/* <div className="mt-4 text-black">
                                <h5 className="font-bold">Description</h5>
                                <p className="text-xs mt-1">
                                    Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
                                </p>
                            </div> */}
                            <div className="flex justify-between items-center mt-4">
                                <button className="flex-1 bg-gray-800 text-white py-2 rounded-full mr-2 transition hover:bg-gray-600"
                                    onClick={() => handleAddToCart(item)}>
                                    Add to cart
                                </button>
                                <div
                                    onClick={() => toggleHeart(item._id)}
                                    className="flex justify-center items-center bg-yellow-400 rounded-full w-10 h-10 cursor-pointer"
                                >
                                    {favorites[item._id] ? (
                                        <AiFillHeart className="text-red-600 text-2xl" />
                                    ) : (
                                        <AiOutlineHeart className="text-red-600 text-2xl" />
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
            <div className="absolute right-0 mr-14 top-1/2 transform -translate-y-1/2 z-10">
                <button
                    onClick={handleNext}
                    className="bg-black text-white rounded-full p-2 shadow"
                    disabled={currentIndex >= dashboards.length - 4}
                >
                    <ChevronRightIcon className="h-6 w-6" />
                </button>
            </div>
        </div>
    );
};

export default Carousel;
