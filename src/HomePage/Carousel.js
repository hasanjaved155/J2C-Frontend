import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/solid';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const Carousel = ({ id, setDropdown }) => {
    const [dashboards, setDashboards] = useState([]);
    const [currentIndex, setCurrentIndex] = useState(0);
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
            // const filteredData = res.data.dashboards.filter((dashboard) =>
            //   dashboard.name.toLowerCase().includes(name.toLowerCase())
            // );

            //setAllData(res.data.dashboards);
            setDropdown(res?.data?.dashboards);
        } catch (err) {
            toast.error(`Failed to fetch dashboards: ${err}`);
        }
    };

    // useEffect(() => {
    //     fetchData();
    //     // eslint-disable-next-line
    // }, [name])

    // const searchDashboard = (name) => {

    //     setName(name);


    // };

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

export default Carousel;
