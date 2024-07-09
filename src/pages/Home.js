import React, { useEffect, useState } from "react";
// import { Link } from "react-router-dom";
import image from "../images copy/alok_sir.jpg";
import Projects from "../Projects/Projects";
import Carousel from "../HomePage/Carousel";
import axios from "axios";


const Home = ({ setDropdown, setCartLength, setInstructor }) => {
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
                setInstructor(true);

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
        <div>
            <div
                style={{
                    left: "0",
                    right: "0",
                    margin: "auto",

                    position: "relative",
                    alignItems: "center",

                    //border: "2px solid black",
                }}></div>

            <div
                style={{
                    display: "flex",
                    padding: "47px",
                    background:
                        "linear-gradient(180deg, rgba(0, 3, 124, 1) 0%, rgba(151, 218, 255, 1) 61%, rgba(255, 255, 255, 1) 95%)",
                }}>
                <div className="mr-[30px]">
                    <img
                        src={image}
                        alt=""
                        style={{
                            backgroundRepeat: "no-repeat",
                            backgroundSize: "contain",
                            borderRadius: "20px",
                            objectFit: "cover",
                            width: "auto",
                            height: "22rem",
                        }}
                    />
                </div>
                {/* <div
                    className=" rounded-3xl  bg-gray-100"
                    style={{
                        position: "relative",
                        left: "0",
                        right: "0",
                        alignItems: "center",
                        padding: "8px",
                        width: "50%",
                        margin: "auto",
                    }}>
                    <div style={{ padding: "0px 20px 0px 20px" }}>
                        <h2 className="text-[2.4vw] font-bold mb-2 ">
                            WELCOME TO PCS GLOBAL PVT LTD
                        </h2>
                        <h3 className="text-[1vw] italic">"The House I have built where every unplaced fresher , who are suffering multiple problem with career can get a peaceful shelter to rebuild a massive career"</h3>
                        <h3 className="text-[1.5vw]">
                            - Alok Halder ( Founder )
                        </h3>
                        <div className="flex justify-center">
                            <a className="flex items-center  justify-center  hover:bg-blue-100 w-[70%] rounded-3xl" href="https://www.youtube.com/@PCSGlobalPrivateLimited" target="_blank">
                                <img className="w-20" src={require('../images copy/vecteezy_youtube-logo-png-youtube-icon-transparent_18930572.png')} alt="" />
                                <h3 className="text-gray-800  hover:text-blue-600" >Visit our youtube channel</h3>
                            </a>
                        </div>
                    </div>
                </div> */}


            </div>

            {/* <Projects /> */}
            <div>
                <div>
                    {categories?.slice(0, 3).map((item) => (
                        <div key={item?._id}>
                            <div>
                                <h1 className="font-bold text-xl">{item?.categoryName}</h1>
                            </div>
                            <div>
                                <Carousel
                                    id={item?._id}
                                    setDropdown={setDropdown}
                                />
                            </div>
                        </div>
                    ))}
                </div>
            </div>

        </div>
    );
};

export default Home;
