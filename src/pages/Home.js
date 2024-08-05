import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
// import image from "../images copy/alok_sir.jpg";

import Carousel from "../HomePage/Carousel";
import axios from "axios";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import './DummyHome.css'
// import "swiper/css/effect-coverflow";
// import "swiper/css/pagination";
import images from "../images copy/pcs logo.png";
// import { EffectCoverflow, Pagination } from 'swiper/modules';


import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation'
import { slidesData } from './../HomePage/SliderVariables';
import { styled } from 'styled-components';
import { CategoryShow } from "../HomePage/CategoryShow";
import { useCart } from "../Contexts/CartContext";
const Home = ({ setInstructor, setItem }) => {
    const { setCartLength } = useCart();

    const [categories, setCategories] = useState([]);
    const user = JSON.parse(localStorage.getItem('user'));

    const categoryData = async () => {
        try {
            const res = await axios.get("/category/getCategory");
            setCategories(res?.data?.categories);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        categoryData();
    }, []);

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

    const fetchCartDetails = async () => {
        try {
            const res = await axios.get(`/cart/get-cart/${user._id}`);
            setCartLength(res?.data?.cart?.length)
        } catch (err) {
            console.error(`Failed to fetch cart details: ${err}`);
        }
    };

    useEffect(() => {

        fetchCartDetails();
        checkInstructorStatus();

    }, []);


    return (
        <div className="bg-white text-white">

            <div className="flex">
                {/* Sidebar */}
                {/* <div className="w-48 bg-gray-800 h-screen p-4">
                    <div className="text-2xl font-bold mb-6"><img
                        className="h-24 w-24"
                        src={images}
                        alt="Your Company"
                    /></div>
                    <nav>
                        <ul>

                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-400 hover:text-white">
                                    <span className="material-icons mr-2">Category</span>
                                </a>
                            </li>

                            <div className="mb-4 text-gray-400">Features</div>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-400 hover:text-white">
                                    <img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1440" alt="Minecraft" className="w-6 h-6 mr-2" /> Instructor
                                </a>
                            </li>
                            <li className="mb-4">
                                <a href="#" className="flex items-center text-gray-400 hover:text-white">
                                    <img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1440" alt="Red Dead Redemption 2" className="w-6 h-6 mr-2" /> Help
                                </a>
                            </li>

                        </ul>
                    </nav>

                </div> */}
                {/* Main content */}
                <div className="w-full">
                    {/* <div className="flex justify-between items-center mb-6">
                        <input type="text" placeholder="Search For Courses" className="bg-gray-700 text-white p-2 rounded-lg w-2/3" />
                        <div className="flex items-center space-x-4">
                            <img src="https://imageio.forbes.com/specials-images/imageserve/5d35eacaf1176b0008974b54/2020-Chevrolet-Corvette-Stingray/0x0.jpg?format=jpg&crop=4560,2565,x790,y784,safe&width=1440" alt="Profile" className="w-10 h-10 rounded-full" />
                            <div>
                                <div className="font-bold">{user?.name}</div>
                                <a href="#" className="text-blue-400">View profile</a>
                            </div>
                        </div>
                    </div> */}

                    {/* <div className="flex justify-center items-center min-h-screen bg-gray-900">
                        <Swiper
                            effect="coverflow"
                            grabCursor={true}
                            centeredSlides={true}
                            slidesPerView="auto"
                            coverflowEffect={{
                                rotate: 20,
                                stretch: 0,
                                depth: 350,
                                modifier: 1,
                                slideShadows: true,
                            }}
                            pagination={{ clickable: true }}
                            // keyboard={{ enabled: true, onlyInViewport: true }}
                            modules={[EffectCoverflow, Pagination]}
                            className="swiper-container"
                        >
                            <SwiperSlide className="swiper-slide">
                                <div className="picture">
                                    <img
                                        src={image}
                                        alt=""
                                    />
                                </div>
                                <div className="detail">
                                    <h3>Alok Halder</h3>
                                    <span>Founder</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide">
                                <div className="picture">
                                    <img
                                        src="https://images.unsplash.com/photo-1511485977113-f34c92461ad9?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=49899e285952107fdfd9415b8d3bf74a&auto=format&fit=crop&w=634&q=80"
                                        alt=""
                                    />
                                </div>
                                <div className="detail">
                                    <h3>Kelly Woods</h3>
                                    <span>Web Designer</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide">
                                <div className="picture">
                                    <img
                                        src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-0.3.5&s=739aef35459daa8aaeaa55363d492bc1&auto=format&fit=crop&w=673&q=80"
                                        alt=""
                                    />
                                </div>
                                <div className="detail">
                                    <h3>Roger Rice</h3>
                                    <span>Web Designer</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide">
                                <div className="picture">
                                    <img
                                        src="https://images.unsplash.com/photo-1502768040783-423da5fd5fa0?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=0c6416353c255d2746a68c8a83943bdf&auto=format&fit=crop&w=634&q=80"
                                        alt=""
                                    />
                                </div>
                                <div className="detail">
                                    <h3>Jessica Garcia</h3>
                                    <span>Web Designer</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide">
                                <div className="picture">
                                    <img
                                        src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=9a138cf8acd85036bd292d7f10074e79&auto=format&fit=crop&w=634&q=80"
                                        alt=""
                                    />
                                </div>
                                <div className="detail">
                                    <h3>Sean Adams</h3>
                                    <span>Web Designer</span>
                                </div>
                            </SwiperSlide>
                            <SwiperSlide className="swiper-slide">
                                <div className="picture">
                                    <img
                                        src="https://images.unsplash.com/photo-1500080209535-717dd4ebaa6b?ixlib=rb-0.3.5&ixid=eyJhcHBfaWQiOjEyMDd9&s=ddee81e2e574e8190b07139ddb0f1938&auto=format&fit=crop&w=687&q=80"
                                        alt=""
                                    />
                                </div>
                                <div className="detail">
                                    <h3>Crystal Davidson</h3>
                                    <span>Web Designer</span>
                                </div>
                            </SwiperSlide>
                            <div className="swiper-pagination"></div>
                        </Swiper>
                    </div> */}

                    {/* <CategoryShow /> */}

                    <NavigationButton>
                        <div className="flex justify-center items-center">
                            <Swiper
                                spaceBetween={30}
                                effect="coverflow"
                                grabCursor={true}
                                centeredSlides={true}
                                slidesPerView={1}
                                coverflowEffect={{
                                    rotate: 20,
                                    stretch: 0,
                                    depth: 350,
                                    modifier: 1,
                                }}
                                pagination={{ clickable: true }}
                                navigation={true}
                                modules={[Pagination, Navigation]}
                                style={{ width: '100%' }}
                            >
                                {slidesData.map((slide, index) => (
                                    <SwiperSlide
                                        className="w-full bg-center bg-cover overflow-hidden"
                                        key={index}
                                    // style={{
                                    //     background:
                                    //         'linear-gradient(180deg, rgba(0, 3, 124, 1) 0%, rgba(151, 218, 255, 1) 61%, rgba(255, 255, 255, 1) 95%)',
                                    // }}
                                    >
                                        <div className="flex justify-end rounded-b-xl">
                                            <div className="picture overflow-hidden rounded-b-2xl">
                                                <img
                                                    src={slide?.image}
                                                    alt=""
                                                    style={{ display: 'block' }}
                                                    className="object-fit aspect-video w-[100rem] h-[30rem]"
                                                />
                                            </div>
                                        </div>
                                        <div className="detail font-semibold text-center" style={{ padding: '25px 20px' }}>
                                            <h3 style={{ margin: '0', fontSize: '20px', color: 'black' }}>{slide?.name}</h3>
                                            <span style={{ display: 'block', fontSize: '16px', color: '#f44336' }}>
                                                {slide?.title}
                                            </span>
                                        </div>
                                    </SwiperSlide>
                                ))}
                            </Swiper>
                        </div>
                    </NavigationButton>
                </div>
            </div>
            <div>
                <div>
                    {categories?.slice(0, 1).map((item) => (
                        <div key={item?._id}>
                            <div>
                                <h1 className="font-bold text-xl text-black">{item?.categoryName}</h1>
                            </div>
                            <div>
                                <Carousel
                                    id={item?._id}
                                    setItem={setItem}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>

    )
}

export default Home


const NavigationButton = styled.div`
  .swiper-button-prev,
  .swiper-button-next {
    color: white;
    font-weight: bold;
  }
`;
