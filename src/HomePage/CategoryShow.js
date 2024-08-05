import React, { useEffect, useState } from "react";
import axios from "axios";
import DownSVG from "../svg/DownSvg";

const CategoryShow = () => {
    const [windowWidth, setWindowWidth] = useState(window.innerWidth);
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({});
    const [activeCategory, setActiveCategory] = useState(null);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [activeSubcategories, setActiveSubcategories] = useState(null);

    const fetchCategories = async () => {
        try {
            const response = await axios.get("/category/getCategory");
            setCategories(response.data.categories);
        } catch (error) {
            console.error("Error fetching categories:", error);
        }
    };

    const fetchSubcategories = async (categoryId) => {
        if (!subcategories[categoryId]) {
            try {
                const response = await axios.get(`/category/getSubCategory/${categoryId}`);
                setSubcategories(prev => ({
                    ...prev,
                    [categoryId]: response.data.subcategory
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
        setActiveCategory(categoryId);
        fetchSubcategories(categoryId);
    };

    const handleMouseLeave = () => {
        setActiveCategory(null);
    };

    const handleMobileMenuToggle = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    const handleMobileCategoryClick = (categoryId) => {
        if (activeSubcategories === categoryId) {
            setActiveSubcategories(null);
        } else {
            setActiveSubcategories(categoryId);
        }
    };

    return (
        <div>
            <div className="relative" onMouseLeave={handleMouseLeave}>
                <div className="md:hidden flex justify-start items-center px-4 py-3 bg-white shadow-md">
                    <button
                        className="text-gray-800 text-base "
                        onClick={handleMobileMenuToggle}
                    >
                        Categories
                    </button>
                </div>
                <ul
                    className={`hidden md:flex md:justify-evenly w-full bg-white shadow-md ${isMobileMenuOpen ? "block" : "hidden"
                        } md:block`}
                >
                    {categories.slice(0, numberOfElementsToShow).map((category) => (
                        <li
                            key={category?._id}
                            onMouseEnter={() => handleCategoryHover(category?._id)}
                            onClick={() => handleMobileCategoryClick(category?._id)}
                            className={`relative text-gray-800 z-10 flex justify-evenly cursor-pointer py-3 text-xs sm:text-sm ${activeCategory === category._id ? "text-sky-700" : ""
                                } `}
                        >
                            {category?.categoryName}
                        </li>
                    ))}
                </ul>
                {(activeCategory && subcategories[activeCategory] && (
                    <div className="absolute z-10 top-full left-0 w-full bg-opacity-60 text-white bg-blue-600 shadow-lg hidden md:block">
                        <div className="flex justify-evenly">
                            {subcategories[activeCategory].map((subcategory, index) => (
                                <button
                                    key={index}
                                    className=" text-xs sm:text-sm py-4 hover:text-sky-300"
                                >
                                    {subcategory.subCategoryName}
                                </button>
                            ))}
                        </div>
                    </div>
                )) ||
                    (isMobileMenuOpen && (
                        <div className="md:hidden">
                            {categories.map((category) => (
                                <div key={category._id}>
                                    <button
                                        className="w-full flex justify-between items-center text-xs text-left px-4 py-2 text-zinc-800 bg-zinc-100 border-t border-b border-gray-200"
                                        onClick={() => handleMobileCategoryClick(category._id)}
                                    >
                                        {category.categoryName}
                                        <DownSVG />
                                    </button>
                                    {activeSubcategories === category._id && (
                                        <div className="bg-white">
                                            {subcategories[category._id].map((subcategory, index) => (
                                                <button
                                                    key={index}
                                                    className="w-full text-left px-4 py-2 text-xs text-zinc-600 border-b border-zinc-200"
                                                >
                                                    {subcategory.subCategoryName}
                                                </button>
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                    ))}
            </div>
        </div>
    );
};

export default CategoryShow;
