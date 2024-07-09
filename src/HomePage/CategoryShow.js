import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

export const CategoryShow = () => {
    return (
        <div className=" hover:mb-14">
            <SlideTabs />
        </div>
    );
};

const SlideTabs = () => {
    const [position, setPosition] = useState({
        left: 0,
        width: 0,
        opacity: 0,
    });
    const [categories, setCategories] = useState([]);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/category/getCategory");
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    return (
        <div className="relative">
            <ul
                onMouseLeave={() => setPosition({ ...position, opacity: 0 })}
                className="relative mx-auto flex w-full border-b-4 border-b-blue-400 bg-white p-1"
            >
                {categories.map((category) => (
                    <Tab
                        key={category.categoryId}
                        setPosition={setPosition}
                        categoryId={category._id}
                    >
                        {category.categoryName}
                    </Tab>
                ))}
                <Cursor position={position} />
            </ul>
        </div>
    );
};

const Tab = ({ children, setPosition, categoryId }) => {
    const ref = useRef(null);
    const [showSubcategories, setShowSubcategories] = useState(false);
    const [subcategories, setSubcategories] = useState([]);

    const fetchSubcategories = async (categoryId) => {
        try {
            const response = await axios.get(`/category/getSubCategory/${categoryId}`);
            setSubcategories(response.data.subcategory);
        } catch (error) {
            console.error("Error fetching subcategories:", error);
        }
    };

    const handleMouseEnter = () => {
        if (!ref.current) return;

        const { width } = ref.current.getBoundingClientRect();

        setPosition({
            left: ref.current.offsetLeft,
            width,
            opacity: 1,
        });

        fetchSubcategories(categoryId);
        setShowSubcategories(true);
    };

    const handleMouseLeave = () => {
        setShowSubcategories(false);
    };

    return (
        <li
            ref={ref}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            className="relative text-white z-10 block cursor-pointer px-3 py-1.5 text-xs uppercase mix-blend-difference md:px-5 md:py-3 md:text-base"
        >
            {children}
            {showSubcategories && subcategories.length > 0 && (
                <div className="absolute left-0 top-full mt-3 w-auto flex shadow-lg">
                    <div className="flex justify-start">
                        {subcategories.map((subcategory) => (
                            <div
                                key={subcategory._id}
                                className="px-6 text-xs uppercase md:text-base rounded-full hover:bg-white hover:text-black"
                            >
                                {subcategory?.subCategoryName}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </li>
    );
};

const Cursor = ({ position }) => {
    return (
        <motion.li
            animate={position}
            className="absolute z-0 h-7 rounded-full bg-black md:h-12"
        />
    );
};
