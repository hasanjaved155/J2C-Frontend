import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/solid";
import toast from "react-hot-toast";
import { AiFillHeart, AiOutlineHeart, AiOutlinePlus } from "react-icons/ai";
import { Link } from "react-router-dom";
import { useCart } from "../Contexts/CartContext";

const NewCarousal = ({ id, setItem }) => {
    const CustomPrevArrow = ({ onClick }) => (
        <button
            className="absolute bg-opacity-80 z-10 -left-6 top-1/2 transform -translate-y-1/2 border-2 border-zinc-300 bg-zinc-100 p-2 rounded-full shadow-md"
            onClick={onClick}
            aria-label="Previous Slide"
        >
            <ChevronLeftIcon className="w-6 h-6 text-black" />
        </button>
    );

    const CustomNextArrow = ({ onClick }) => (
        <button
            className="absolute bg-opacity-80 z-10 -right-6 top-1/2 transform border-2 border-zinc-300 -translate-y-1/2 bg-zinc-100 p-2 rounded-full shadow-md"
            onClick={onClick}
            aria-label="Next Slide"
        >
            <ChevronRightIcon className="w-6 h-6 text-black" />
        </button>
    );

    const settings = {
        accessibility: true,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 2,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        responsive: [
            {
                breakpoint: 1350,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 2,
                    initialSlide: 2,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: true,
                },
            },
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 2,
                    infinite: false,
                    dots: true,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    initialSlide: 2,
                },
            },
        ],
    };

    const [dashboards, setDashboards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const [favorites, setFavorites] = useState({});
    const [courses, setCourses] = useState([]);
    const { cartLength, setCartLength } = useCart();
    const user = JSON.parse(localStorage.getItem("user"));

    const handleAddToCart = async (item) => {
        try {
            const res = await axios.post(`/cart/create-cart/${user._id}`, {
                name: item?.courseName,
                link: item?.path,
                image: item?.image,
            });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setCartLength(cartLength + 1);
            } else if (!res.data.success) {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error("Please login to add");
        }
    };

    const fetchSubsubcategoriesAndCourses = async () => {
        try {
            const { data } = await axios.get(
                `/category/allsubsubcategories/${id}/subsubcategories`
            );
            const subsubcategories = data?.subsubcategories?.slice(0, 6) || [];
            setDashboards(subsubcategories);

            // Fetch courses for each subsubcategory
            const courseRequests = subsubcategories.map((subsub) =>
                axios.get(`/course/get-dashboard?search=${subsub.subSubCategoryName}`)
            );
            const courseResponses = await Promise.all(courseRequests);
            const fetchedCourses = courseResponses.flatMap(
                (response) => response.data.dashboards || []
            );
            setCourses(fetchedCourses);
        } catch (error) {
            console.error("Failed to fetch data", error);
            toast.error("Failed to fetch data");
        }
    };

    useEffect(() => {
        fetchSubsubcategoriesAndCourses();
    }, [id]);

    //   const visibleItems = courses.slice(currentIndex, currentIndex + 8);

    const toggleHeart = (itemId) => {
        setFavorites((prevFavorites) => ({
            ...prevFavorites,
            [itemId]: !prevFavorites[itemId],
        }));
    };
    return (
        <Slider {...settings}>
            {courses.map((item) => (
                <div key={item._id} className="px-2">
                    <div className="rounded-t-lg  text-black shadow-md">
                        <div className="text-center">
                            <Link
                                to="/description"
                                className="left-0 right-0 top-0 bottom-0"
                                onClick={() => setItem(item)}
                            >
                                <div className="h-40">
                                    <img
                                        src={item?.image || "https://imgur.com/ZpVouSq.png"}
                                        alt={item?.name || "Course"}
                                        className="rounded-t-lg object-cover h-full w-full"
                                    />
                                </div>
                                <div className="px-3 truncate">
                                    <h5 className="text-base pt-2 font-semibold text-start">
                                        {item?.courseName || "Espresso"}
                                    </h5>

                                    <div className="flex items-center justify-between mt-2">
                                        <div className="flex items-center justify-start gap-1">
                                            <p className=" text-sm font-bold text-zinc-800">
                                                {item?.finalRating.toFixed(1) ?? "No Rating"}
                                            </p>
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
                                                            className={`cursor-pointer text-lg ${item?.finalRating >= rating
                                                                ? "text-yellow-400"
                                                                : "text-gray-400"
                                                                }`}
                                                        >
                                                            &#9733;
                                                        </label>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>
                                        <div className="flex">
                                            <p className="ml-2 text-sm text-zinc-500">
                                                {item?.reviews?.length} reviews
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                            <div className="flex justify-between items-center mt-2">
                                <button
                                    className="w-full flex justify-start px-3 gap-1 items-center text-black py-2 transition hover:text-cyan-700"
                                    onClick={() => handleAddToCart(item)}
                                >
                                    <AiOutlinePlus className="font-bold" />
                                    Add to cart
                                </button>
                                <div
                                    onClick={() => toggleHeart(item._id)}
                                    className="flex justify-center items-center w-10 h-10 cursor-pointer"
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
                </div>
            ))}
        </Slider>

    );
};

export default NewCarousal;