import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import DownSVG from "../svg/DownSvg";
import { motion, AnimatePresence } from "framer-motion";

const CategoryShow = ({
    isMobileView,
    onSubcategoriesShow,
    onSubcategoriesHide,
}) => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({});
    const [activeCategory, setActiveCategory] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubcategories, setActiveSubcategories] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/category/getCategory");
            const temp = response.data.categories;
            setCategories(response.data.categories);
            temp.map((item) => fetchSubcategories(item._id));
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSubcategories = async (categoryId) => {
        if (!subcategories[categoryId]) {
            try {
                const response = await axios.get(
                    `/category/getSubCategory/${categoryId}`
                );
                setSubcategories((prev) => ({
                    ...prev,
                    [categoryId]: response.data.subcategory,
                }));
            } catch (error) {
                console.error("Error fetching subcategories:", error);
            }
        }
    };

    useEffect(() => {
        fetchCategories();
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
        };

        window.addEventListener("resize", handleResize);

        return () => {
            window.removeEventListener("resize", handleResize);
        };
    }, []);

    const getNumberOfElementsToShow = () => {
        if (windowWidth >= 1100) return 10;
        if (windowWidth >= 1000) return 8;
        if (windowWidth >= 900) return 7;
        if (windowWidth >= 768) return 6;
        return 10;
    };

    const numberOfElementsToShow = getNumberOfElementsToShow();

    const handleCategoryHover = (categoryId) => {
        if (!isMobileView) {
            onSubcategoriesHide();
        }
        setActiveCategory(categoryId);
        // fetchSubcategories(categoryId);
        if (subcategories[categoryId] && subcategories[categoryId].length > 0) {
            if (!isMobileView) {
                onSubcategoriesShow();
            }
        }
    };

    const handleMouseLeave = () => {
        setActiveCategory(null);
        if (!isMobileView) {
            onSubcategoriesHide();
        }
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMobileCategoryClick = (categoryId) => {
        if (activeSubcategories === categoryId) {
            setActiveSubcategories(null);
        } else {
            setActiveSubcategories(categoryId);
            // fetchSubcategories(categoryId);
        }
    };

    return (
        <div className="w-full">
            <div className="relative w-full" onMouseLeave={handleMouseLeave}>
                <div
                    className={`${isMobileView ? "flex" : "hidden"
                        } justify-start items-center duration-300 bg-white w-full`}
                >
                    <button
                        className="text-base flex justify-between w-full items-center sm:px-[33px] px-3 py-2"
                        onClick={handleMobileMenuToggle}
                    >
                        Categories
                        <DownSVG />
                    </button>
                </div>
                <ul
                    className={`hidden  custom-mid:flex md:justify-evenly w-full bg-white shadow-md ${isMobileMenuOpen ? "block" : "hidden"
                        }`}
                >
                    {categories.slice(0, numberOfElementsToShow).map((category) => (
                        <li
                            key={category?._id}
                            onMouseEnter={() => handleCategoryHover(category?._id)}
                            onClick={() => handleMobileCategoryClick(category?._id)}
                            className={`relative  text-gray-800 z-10 flex justify-evenly cursor-pointer py-3 text-xs sm:text-sm ${activeCategory === category._id ? "text-sky-700" : ""
                                }`}
                        >
                            {category?.categoryName}
                        </li>
                    ))}
                </ul>
                {activeCategory && subcategories[activeCategory] && (
                    <div className="absolute top-full left-0 w-full bg-slate-200 shadow-lg hidden md:block">
                        <div className="flex justify-evenly">
                            {subcategories[activeCategory]?.map((subcategory, index) => (
                                <button
                                    key={index}
                                    className="text-xs sm:text-sm py-4 hover:text-sky-700"
                                >
                                    {subcategory.subCategoryName}
                                </button>
                            ))}
                        </div>
                    </div>
                )}
                <motion.div
                    className="md:hidden"
                    initial={{ height: 0 }}
                    animate={{ height: isMobileMenuOpen ? "auto" : 0 }}
                    exit={{ height: 0 }}
                    transition={{ duration: 0.3 }}
                    style={{ overflow: "hidden" }}
                >
                    {categories.map((category) => (
                        <div key={category?._id}>
                            <button
                                className="w-full flex justify-between items-center text-xs text-left sm:px-[33px] px-3 py-2 text-zinc-800 bg-zinc-100 border-t border-b border-gray-200"
                                onClick={() => handleMobileCategoryClick(category?._id)}
                            >
                                {category?.categoryName}
                                <DownSVG />
                            </button>
                            <AnimatePresence initial={false}>
                                {activeSubcategories === category?._id && (
                                    <motion.div
                                        className="md:hidden"
                                        initial={{ height: 0 }}
                                        animate={{
                                            height:
                                                activeSubcategories === category?._id ? "auto" : 0,
                                        }}
                                        exit={{ height: 0 }}
                                        transition={{ duration: 0.3 }}
                                        style={{ overflow: "hidden" }}
                                    >
                                        <div className="bg-white">
                                            {subcategories[category?._id]?.map(
                                                (subcategory, index) => (
                                                    <button
                                                        key={index}
                                                        className="w-full text-left sm:px-[33px] px-3 py-2 text-xs text-zinc-600 border-b border-zinc-200"
                                                    >
                                                        {subcategory.subCategoryName}
                                                    </button>
                                                )
                                            )}
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>
                        </div>
                    ))}
                </motion.div>
            </div>
        </div>
    );
};

export default CategoryShow;