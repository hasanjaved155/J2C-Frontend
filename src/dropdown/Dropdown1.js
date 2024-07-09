import { Fragment, useEffect, useState } from 'react'
// import { Menu, Transition } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/outline'
import axios from "axios";
import toast from "react-hot-toast";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const Dropdown1 = ({
    setDropdown,
    showDropDashboard,
    showDropdown,
    selectedDropdown,
    selectedSubDropdown,
    toggleDropdown,
    toggleSubDropdown,
    toggleSubSubDropdown,
}) => {
    const [name, setName] = useState("");

    const [categories, setCategories] = useState([]);
    const [subcategories, setSubcategories] = useState([]);
    const [subsubcategories, setSubSubcategories] = useState([]);

    const categoryData = async () => {
        try {
            const res = await axios.get("/category/getCategory");
            setCategories(res.data.categories);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    useEffect(() => {
        categoryData();
    }, []);

    const handlegetsubCategory = async (categoryId) => {
        try {
            const res = await axios.get(`/category/getSubCategory/${categoryId}`);
            setSubcategories(res.data.subcategory);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };
    const handlegetsubsubCategory = async (subcategoryId) => {
        try {
            const res = await axios.get(
                `/category/getSubSubCategory/${subcategoryId}`
            );
            setSubSubcategories(res.data.subsubcategory);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const fetchData = async () => {
        try {
            const res = await axios.get(`/course/get-dashboard?search=${name}`);
            // const filteredData = res.data.dashboards.filter((dashboard) =>
            //   dashboard.name.toLowerCase().includes(name.toLowerCase())
            // );

            //setAllData(res.data.dashboards);
            setDropdown(res.data.dashboards);
        } catch (err) {
            toast.error(`Failed to fetch dashboards: ${err}`);
        }
    };

    useEffect(() => {
        fetchData();
        // eslint-disable-next-line
    }, [name]);

    const searchDashboard = (name) => {
        //const newSearchQuery = name;
        setName(name);

        // const filteredData = allData?.filter((data) =>
        //   data.name.toLowerCase().includes(name.toLowerCase())
        // );
        // //console.log(filteredData);

        // dispatch(getAllData(filteredData));
        //setDropdown(filteredData.dashboards);
    };
    return (
        <div className="relative inline-block text-left">
            <div>
                <button
                    onClick={toggleDropdown}
                    className={`px-3 py-2 text-sm flex font-medium ${false ? 'text-gray-900' : 'text-gray-800 hover:text-white hover:bg-gray-700 block rounded-md px-3 py-2 text-base font-medium'
                        }`}
                >
                    Category
                    <ChevronDownIcon className="-mr-1 h-5 w-5 text-gray-400" aria-hidden="true" />
                </button>
            </div>
            <div className="relative">
                {showDropdown && (
                    <div
                        className="text-white absolute ml-[-87px] lg:ml-[-21px] w-[17.6rem] md:opacity-[92%] h-[30.7rem] mt-[-38px] z-10 origin-top-right rounded-lg shadow-lg md:w-[18rem] md:h-[32rem] md:mt-[28px]"
                        style={{
                            border: "1px solid gray",
                            backgroundColor: "rgb(58 71 91)",

                            // marginLeft: "-50px",
                        }}>
                        <div
                            className="w-24 ml-14 lg:hidden mt-4 rounded-full bg-black flex items-center "
                            onClick={toggleDropdown}>
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                                class="w-6 h-6 mr-2">
                                <path
                                    fill-rule="evenodd"
                                    d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                                    clip-rule="evenodd"
                                />
                            </svg>
                            <h3>Back</h3>
                        </div>
                        {/* THIS IS CATEGORY */}
                        <div className="py-1">
                            <div className="px-10 pt-2 pb-4 space-y-1">
                                {categories?.length > 0 &&
                                    categories?.map((categoryItem) => (
                                        <div key={categoryItem.categoryName}>
                                            <button
                                                className="px-4 py-2 text-sm text-nowrap text-white hover:bg-slate-950 rounded-full hover:text-white flex"
                                                onClick={() => {
                                                    toggleSubDropdown(categoryItem?.categoryName);
                                                    handlegetsubCategory(categoryItem?._id);
                                                }}>
                                                <span>{categoryItem?.categoryName}</span>

                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    fill="none"
                                                    viewBox="0 0 24 24"
                                                    stroke-width="1.5"
                                                    stroke="currentColor"
                                                    className={`h-4 w-4 ml-1 mt-[3px] transition-transform duration-200 transform ${selectedDropdown === categoryItem.categoryName
                                                        ? "rotate-0"
                                                        : "rotate-180"
                                                        }`}>
                                                    <path
                                                        stroke-linecap="round"
                                                        stroke-linejoin="round"
                                                        d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                                    />
                                                </svg>
                                            </button>

                                            {selectedDropdown === categoryItem.categoryName && (
                                                <div
                                                    className="text-white absolute w-[17.6rem]   h-[30.7rem] right-0 top-0 mt-0 ml-10  rounded-lg shadow-lg md:w-[18rem] md:left-[307px] md:h-[32rem]"
                                                    style={{
                                                        border: "1px solid gray",
                                                        backgroundColor: "rgb(58 71 91)",
                                                        marginLeft: "-21px",
                                                        zIndex: "1",
                                                    }}>
                                                    <div
                                                        className="w-24 ml-14 mt-4 rounded-full lg:hidden bg-black flex items-center "
                                                        onClick={toggleSubDropdown}>
                                                        <svg
                                                            xmlns="http://www.w3.org/2000/svg"
                                                            viewBox="0 0 24 24"
                                                            fill="currentColor"
                                                            class="w-6 h-6 mr-2">
                                                            <path
                                                                fill-rule="evenodd"
                                                                d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                                                                clip-rule="evenodd"
                                                            />
                                                        </svg>
                                                        <h3>Back</h3>
                                                    </div>
                                                    {/* THIS IS SUB CATEGORY */}
                                                    <div className="py-1">
                                                        <div className="px-10 pt-2 pb-4 space-y-1">
                                                            {subcategories?.map((subCategory) => (
                                                                <div
                                                                    key={
                                                                        subCategory?.subCategoryName ||
                                                                        subCategory
                                                                    }>
                                                                    <button
                                                                        className="px-4 py-2 text-sm text-nowrap hover:bg-slate-950 rounded-full hover:text-white flex"
                                                                        onClick={() => {
                                                                            typeof subCategory === "object"
                                                                                ? toggleSubSubDropdown(
                                                                                    subCategory.subCategoryName
                                                                                )
                                                                                : toggleSubSubDropdown(subCategory);
                                                                            handlegetsubsubCategory(
                                                                                subCategory?._id
                                                                            );
                                                                        }}>
                                                                        <span>
                                                                            {/* {typeof subCategory === "object"
                                          ? subCategory.subCategoryName
                                          : subCategory} */}
                                                                            {subCategory?.subCategoryName}
                                                                        </span>

                                                                        <svg
                                                                            xmlns="http://www.w3.org/2000/svg"
                                                                            fill="none"
                                                                            viewBox="0 0 24 24"
                                                                            stroke-width="1.5"
                                                                            stroke="currentColor"
                                                                            className={`h-4 w-4 ml-1 mt-[3px] transition-transform duration-200 transform ${selectedSubDropdown ===
                                                                                subCategory.subCategoryName
                                                                                ? "rotate-0"
                                                                                : "rotate-180"
                                                                                }`}>
                                                                            <path
                                                                                stroke-linecap="round"
                                                                                stroke-linejoin="round"
                                                                                d="m5.25 4.5 7.5 7.5-7.5 7.5m6-15 7.5 7.5-7.5 7.5"
                                                                            />
                                                                        </svg>
                                                                    </button>
                                                                    {typeof subCategory === "object" &&
                                                                        selectedSubDropdown ===
                                                                        subCategory.subCategoryName && (
                                                                            <div
                                                                                className="text-white absolute w-[17.6rem]   sm:ml-[-21px] h-[30.7rem] right-0 top-0 mt-0 ml-10 rounded-lg shadow-lg md:w-[18rem] md:left-[307px] md:h-[32rem]"
                                                                                style={{
                                                                                    border: "1px solid gray",
                                                                                    backgroundColor: "rgb(58 71 91)",
                                                                                    marginLeft: "-21px",
                                                                                    zIndex: "1",
                                                                                }}>
                                                                                <div
                                                                                    className="w-24 ml-14 mt-4 rounded-full lg:hidden bg-black flex items-center "
                                                                                    onClick={toggleSubSubDropdown}>
                                                                                    <svg
                                                                                        xmlns="http://www.w3.org/2000/svg"
                                                                                        viewBox="0 0 24 24"
                                                                                        fill="currentColor"
                                                                                        class="w-6 h-6 mr-2">
                                                                                        <path
                                                                                            fill-rule="evenodd"
                                                                                            d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-4.28 9.22a.75.75 0 0 0 0 1.06l3 3a.75.75 0 1 0 1.06-1.06l-1.72-1.72h5.69a.75.75 0 0 0 0-1.5h-5.69l1.72-1.72a.75.75 0 0 0-1.06-1.06l-3 3Z"
                                                                                            clip-rule="evenodd"
                                                                                        />
                                                                                    </svg>
                                                                                    <h3>Back</h3>
                                                                                </div>
                                                                                {/* THIS IS SUB SUB CATEGORY */}
                                                                                <div className="text-xl mt-2 mr-10">
                                                                                    Popular Topics
                                                                                </div>
                                                                                {subsubcategories?.map(
                                                                                    (subSubCategory) => (
                                                                                        <button
                                                                                            key={
                                                                                                subSubCategory?.subSubCategoryName
                                                                                            }
                                                                                            className="px-14 py-2 text-sm text-nowrap hover:bg-slate-950 rounded-full hover:text-white flex"
                                                                                            onClick={() => {
                                                                                                showDropDashboard();
                                                                                                searchDashboard(
                                                                                                    subSubCategory.subSubCategoryName
                                                                                                );
                                                                                            }}>
                                                                                            <span>
                                                                                                {/* {typeof subSubCategory ===
                                                  "object"
                                                    ? subSubCategory.subSubCategoryName
                                                    : subSubCategory} */}
                                                                                                {
                                                                                                    subSubCategory.subSubCategoryName
                                                                                                }
                                                                                            </span>
                                                                                        </button>
                                                                                    )
                                                                                )}
                                                                            </div>
                                                                        )}
                                                                </div>
                                                            ))}
                                                        </div>
                                                    </div>
                                                </div>
                                            )}
                                        </div>
                                    ))}
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    )
}

export default Dropdown1
