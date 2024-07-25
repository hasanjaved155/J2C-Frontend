import React, { useEffect, useState } from "react";
import axios from "axios";

const CategoryShow = () => {
    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState({});
    const [activeCategory, setActiveCategory] = useState(null);

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

    const handleCategoryHover = (categoryId) => {
        setActiveCategory(categoryId);
        fetchSubcategories(categoryId);
    };

    const handleCategoryLeave = () => {
        setActiveCategory(null);
    };

    return (
        <div className="">
            <div className="relative">
                <ul className="relative mx-auto flex w-full border-b-4 border-b-blue-400 bg-white p-1">
                    {categories.map((category) => (
                        <li
                            key={category?._id}
                            onMouseEnter={() => handleCategoryHover(category?._id)}
                            onMouseLeave={handleCategoryLeave}
                            className="relative text-black z-10 block cursor-pointer uppercase px-7 py-3 text-sm font-semibold hover:bg-slate-700 rounded-xl hover:text-white"
                        >
                            {category?.categoryName}
                            {activeCategory === category?._id && subcategories[category?._id] && (
                                <div className="absolute top-full mt-3 w-auto flex shadow-lg bg-sky-300 rounded-lg">
                                    <div className="flex justify-start">
                                        {subcategories[category?._id].map((subcategory) => (
                                            <div
                                                key={subcategory?._id}
                                                className="px-6 text-xs uppercase md:text-base rounded-full text-black"
                                            >
                                                {subcategory?.subCategoryName}
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default CategoryShow;
