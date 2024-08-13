import axios from "axios";
import React, { useEffect, useState } from "react";

import toast from "react-hot-toast";
import { useCourse } from "../Contexts/CourseContext";

const Dropdown = ({
  showDropDashboard,
  showDropdown,
  selectedDropdown,
  selectedSubDropdown,
  toggleDropdown,
  toggleSubDropdown,
  toggleSubSubDropdown,
}) => {
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);
  const [subsubcategories, setSubSubcategories] = useState([]);
  const { setDropCourse } = useCourse();

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
      setSubcategories(res?.data?.subcategory);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  const handlegetsubsubCategory = async (subcategoryId) => {
    try {
      const res = await axios.get(
        `/category/getSubSubCategory/${subcategoryId}`
      );
      setSubSubcategories(res?.data?.subsubcategory);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const fetchData = async (name) => {
    try {
      const res = await axios.get(`/course/get-dashboard?search=${name}`);
      // setDropdown(res?.data?.dashboards);
      setDropCourse(res?.data?.dashboards);
    } catch (err) {
      toast.error(`Failed to fetch dashboards: ${err}`);
    }
  };

  // useEffect(() => {
  //   fetchData();
  //   // eslint-disable-next-line
  // }, [name]);

  return (
    <div className="flex">
      <div>
        <div className="relative">
          <button
            className="text-gray-900 text-base flex items-center"
            onClick={toggleDropdown}
          // style={{ fontSize: "1.10rem" }}
          >
            <span className="hidden custom-mid:block">Categories</span>
            {/* <svg
              className={`h-4 w-4 ml-1 transition-transform duration-200 transform ${showDropdown ? "rotate-180" : ""
                }`}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg">
              <path
                fillRule="evenodd"
                d="M6.293 7.293a1 1 0 011.414 0L10 9.586l2.293-2.293a1 1 0 111.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                clipRule="evenodd"
              />
            </svg> */}
          </button>

          {showDropdown && (
            <div
              className="absolute bg-white w-[17.6rem] opacity-[92%] h-[30.7rem] mt-[-38px] z-20 origin-top-right rounded-lg shadow-lg md:w-[18rem] md:h-[32rem] md:mt-6"
              style={{
                border: "1px solid gray",
                // backgroundColor: "rgb(58 71 91)",

                marginLeft: "-21px",
              }}
            >
              {/* <div
                className="w-24 ml-14 lg:hidden mt-4 rounded-full bg-black flex items-center "
                onClick={toggleDropdown}
              >
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
              </div> */}
              {/* THIS IS CATEGORY */}
              <div className="py-1">
                <div className="px-10 pt-2 pb-4 space-y-1">
                  {categories?.length > 0 &&
                    categories?.map((categoryItem) => (
                      <div key={categoryItem.categoryName}>
                        <button
                          className="px-4 py-2 text-sm text-nowrap text-black hover:bg-slate-950 rounded-full hover:text-white flex"
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

                        {selectedDropdown === categoryItem?.categoryName && (
                          <div
                            className=" absolute bg-white w-[17.6rem] h-[30.7rem] right-0 top-0 mt-0 ml-10  rounded-lg shadow-lg md:w-[18rem] md:left-[307px] md:h-[32rem]"
                            style={{
                              border: "1px solid gray",
                              // backgroundColor: "rgb(58 71 91)",
                              marginLeft: "-21px",
                              zIndex: "1",
                            }}>
                            {/* <div
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
                            </div> */}
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
                                          className=" bg-white absolute w-[17.6rem]   sm:ml-[-21px] h-[30.7rem] right-0 top-0 mt-0 ml-10 rounded-lg shadow-lg md:w-[18rem] md:left-[307px] md:h-[32rem]"
                                          style={{
                                            border: "1px solid gray",
                                            // backgroundColor: "rgb(58 71 91)",
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
                                                  fetchData(subSubCategory?.subSubCategoryName);
                                                  // searchDashboard(
                                                  //   subSubCategory?.subSubCategoryName
                                                  // );
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
    </div>
  );
};

export default Dropdown;
