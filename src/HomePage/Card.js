// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { AiOutlineHeart, AiFillHeart } from "react-icons/ai"; // Import icons from react-icons
// import { HiArrowLeft, HiPlus, HiMinus } from "react-icons/hi";

// const Card = () => {
//     const [addCart, setAddCart] = useState(1);
//     const [heart, setHeart] = useState(true);

//     const AddCart = () => {
//         if (addCart < 10) {
//             setAddCart(addCart + 1);
//         }
//     };

//     const DecBag = () => {
//         if (addCart > 1) {
//             setAddCart(addCart - 1);
//         }
//     };

//     const toggleHeart = () => {
//         setHeart(!heart);
//     };

//     return (
//         <div className="min-h-screen flex justify-center items-center">
//             <div className="bg-white rounded-lg shadow-md p-5 max-w-xs">
//                 <div className="flex justify-between items-center">
//                     <HiArrowLeft className="text-gray-500 text-xl" />
//                 </div>
//                 <div className="flex justify-center items-center mt-3">
//                     <img
//                         src="https://imgur.com/ZpVouSq.png"
//                         alt="Espresso"
//                         className="w-36"
//                     />
//                 </div>
//                 <div className="text-center mt-4">
//                     <h5 className="text-lg font-semibold">Espresso</h5>
//                     <h3 className="text-xl font-bold">Central America</h3>
//                     <div className="flex items-center justify-center mt-2">
//                         <div className="flex items-center">
//                             <input type="radio" name="rating" value="5" id="5" className="hidden" />
//                             <label htmlFor="5" className="cursor-pointer text-yellow-400 text-lg">&#9733;</label>
//                             <input type="radio" name="rating" value="4" id="4" className="hidden" />
//                             <label htmlFor="4" className="cursor-pointer text-yellow-400 text-lg">&#9733;</label>
//                             <input type="radio" name="rating" value="3" id="3" className="hidden" />
//                             <label htmlFor="3" className="cursor-pointer text-yellow-400 text-lg">&#9733;</label>
//                             <input type="radio" name="rating" value="2" id="2" className="hidden" />
//                             <label htmlFor="2" className="cursor-pointer text-yellow-400 text-lg">&#9733;</label>
//                             <input type="radio" name="rating" value="1" id="1" className="hidden" />
//                             <label htmlFor="1" className="cursor-pointer text-yellow-400 text-lg">&#9733;</label>
//                         </div>
//                         <p className="ml-2 text-sm font-semibold">4.7</p>
//                         <p className="ml-2 text-sm text-red-500">32 reviews</p>
//                     </div>
//                     <div className="flex justify-around mt-4">
//                         <span className="py-2 px-4 bg-yellow-200 rounded-lg text-xs font-semibold cursor-pointer transition hover:bg-yellow-300">250g</span>
//                         <span className="py-2 px-4 bg-yellow-200 rounded-lg text-xs font-semibold cursor-pointer transition hover:bg-yellow-300">500g</span>
//                         <span className="py-2 px-4 bg-yellow-200 rounded-lg text-xs font-semibold cursor-pointer transition hover:bg-yellow-300">1000g</span>
//                     </div>
//                     <div className="flex justify-between items-center mt-4">
//                         <h3 className="text-xl font-bold">$15.90</h3>
//                         <div className="flex items-center border border-gray-300 rounded-full px-3 py-1">
//                             <HiMinus onClick={DecBag} className="cursor-pointer text-xl" />
//                             <p className="mx-3">{addCart}</p>
//                             <HiPlus onClick={AddCart} className="cursor-pointer text-xl" />
//                         </div>
//                     </div>
//                     <div className="mt-4">
//                         <h5 className="font-bold">Description</h5>
//                         <p className="text-xs mt-1">
//                             Lorem Ipsum is simply dummy text of the printing and typesetting
//                             industry. Lorem Ipsum has been the industry's standard dummy text
//                             ever since the 1500s.
//                         </p>
//                     </div>
//                     <div className="flex justify-between items-center mt-4">
//                         <button
//                             onClick={AddCart}
//                             className="flex-1 bg-gray-800 text-white py-2 rounded-full mr-2 transition hover:bg-gray-600"
//                         >
//                             Add to cart
//                         </button>
//                         <div
//                             onClick={toggleHeart}
//                             className="flex justify-center items-center bg-yellow-400 rounded-full w-10 h-10 cursor-pointer"
//                         >
//                             {heart ? (
//                                 <AiOutlineHeart className="text-red-600 text-2xl" />
//                             ) : (
//                                 <AiFillHeart className="text-red-600 text-2xl" />
//                             )}
//                         </div>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };


// export default Card;

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { useCourse } from '../Contexts/CourseContext';

const Carousel2 = ({ id }) => {
    const [dashboards, setDashboards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
    const { setDropCourse } = useCourse();
    const [name, setName] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        const fetchSubsubcategories = async () => {
            try {
                const { data } = await axios.get(`/category/allsubsubcategories/${id}/subsubcategories`);
                setDashboards(data?.subsubcategories?.slice(0, 6) || []);
                // console.log(data?.subsubcategories);
            } catch (error) {
                console.error('Failed to fetch subsubcategories', error);
            }
        };
        fetchSubsubcategories();
    }, [id]);

    const fetchData = async (name) => {
        try {
            const res = await axios.get(`/course/get-dashboard?search=${name}`);

            setDropCourse(res?.data?.dashboards)

        } catch (err) {
            toast.error(`Failed to fetch dashboards: ${err}`);
        }
    };



    const showDropDashboard = () => {
        navigate("/drop-dashboard");

    };

    const handlePrev = () => {
        setCurrentIndex((prevIndex) => Math.max(prevIndex - 4, 0));
    };

    const handleNext = () => {
        setCurrentIndex((prevIndex) => Math.min(prevIndex + 4, dashboards.length - 4));
    };

    const visibleItems = dashboards.slice(currentIndex, currentIndex + 4);

    return (
        <div className="relative ">
            <div className="absolute ml-14 left-0 top-1/2 transform -translate-y-1/2 z-10">
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
                    <div className="carousel-item m-4 rounded-lg" key={item._id}
                        onClick={() => {
                            showDropDashboard();

                            fetchData(item?.subSubCategoryName);


                        }}>
                        {/* <h1>{item?.subSubCategoryName}</h1> */}
                        <img
                            src={item?.image || "https://img.daisyui.com/images/stock/photo-1559703248-dcaaec9fab78.jpg"}
                            alt=""
                            style={{ width: "300px", height: "140px" }}
                            className='rounded-xl'
                        />
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

export default Carousel2;
