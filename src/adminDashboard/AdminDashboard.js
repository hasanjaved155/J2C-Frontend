import React, { useState, Suspense, lazy, useEffect } from "react";
import InstructorAccess from "./InstructorAccess";

const CreateCategory = lazy(() => import("./CreateCategory"));
const CreateSubCategory = lazy(() => import("./CreateSubCategory"));
const CreateSubSubCategory = lazy(() => import("./CreateSubSubCategory"));
const CreateCourse = lazy(() => import("./CreateCourse"));
const HelpDesk = lazy(() => import("./../help/HelpDesk"));
const ShowAllUsers = lazy(() => import("../pages/auth/ShowAllUsers"));

const AdminDashboard = () => {
  const [select, setSelect] = useState("admin");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 2000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="container-fluid m-3 p-2 flex">
      <div className="flex">
        <div className="col-md-3">
          <div className="p-12 bg-gray-100 rounded-lg shadow-md md:w-96 w-80 ml-8">
            <h4 className="text-lg font-semibold text-gray-800 mb-4">
              Admin Panel
            </h4>

            <div
              className="block cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-md mb-3 hover:bg-blue-600"
              onClick={(e) => setSelect("course")}
            >
              <h4>Create Course</h4>
            </div>

            <div
              className="block cursor-pointer py-2 px-4 bg-blue-500 text-white rounded-md mb-3 hover:bg-blue-600"
              onClick={(e) => setSelect("users")}
            >
              <div> All Users</div>
            </div>

            <div
              className="block cursor-pointer py-2 px-4 mb-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={(e) => setSelect("categories")}
            >
              <div> Create Category</div>
            </div>
            <div
              className="block cursor-pointer py-2 px-4 mb-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={(e) => setSelect("subcategories")}
            >
              <div> Create subCategory</div>
            </div>
            <div
              className="block cursor-pointer py-2 px-4 mb-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={(e) => setSelect("subsubcategories")}
            >
              <div> Create SubSubCategory</div>
            </div>

            <div
              className="block cursor-pointer py-2 px-4 mb-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={(e) => setSelect("help")}
            >
              <div>Help-Desk</div>
            </div>
            <div
              className="block cursor-pointer py-2 px-4 mb-3 bg-blue-500 text-white rounded-md hover:bg-blue-600"
              onClick={(e) => setSelect("instructor")}
            >
              <div>Access Instructor</div>
            </div>
          </div>
        </div>
        <div>
          <div className="mx-auto">
            {loading ? (
              <div className="text-2xl ml-20 font-bold">Loading...</div>
            ) : (
              <Suspense fallback={<div className="text-2xl ml-20 font-bold">Loading...</div>}>
                {select === "course" && <CreateCourse />}
                {select === "users" && <ShowAllUsers />}
                {select === "categories" && <CreateCategory />}
                {select === "subcategories" && <CreateSubCategory />}
                {select === "subsubcategories" && <CreateSubSubCategory />}
                {select === "help" && <HelpDesk />}
                {select === "instructor" && <InstructorAccess />}
              </Suspense>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
