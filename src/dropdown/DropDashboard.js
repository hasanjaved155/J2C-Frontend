import React, { Fragment, useState } from "react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import axios from "axios";
import { useCourse } from "../Contexts/CourseContext";
import { useCart } from "../Contexts/CartContext";

const DropDashboard = ({ setItem }) => {
  const { cartLength, setCartLength } = useCart();
  const [hoveredItem, setHoveredItem] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));
  const { dropCourse } = useCourse();

  const handleMouseEnter = (item) => {
    setHoveredItem(item);
  };

  const handleMouseLeave = () => {
    setHoveredItem(null);
  };

  const handleAddToCart = async (item) => {

    try {
      const res = await axios.post(`/cart/create-cart/${user._id}`, { name: item?.courseName, link: item?.path, image: item?.image });
      if (res && res.data.success) {
        toast.success(res.data.message);
        setCartLength(cartLength + 1)

      } else if (!res.data.success) {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Please login to add");
    }


  };

  const handleLike = (item) => {
    // Implement your logic to handle like
    console.log("Liked:", item);
  };

  const handleClick = (item) => {
    if (
      !user?.employeeId &&
      item?.role &&
      item?.role[0]?.rolename === "Employee"
    ) {
      toast.error(
        "You don't have permission to view this.Please Contact Help Desk."
      );
    }
  };

  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center">
        {dropCourse?.length > 0 ? (
          <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
            {dropCourse.map((item) => (
              <div
                key={item?.id}
                className="relative"
                onMouseEnter={() => handleMouseEnter(item)}
                onMouseLeave={handleMouseLeave}>
                <Link
                  //  to={item?.path}
                  to='/description'
                  onClick={() => setItem(item)}
                >
                  <div className="max-w-sm bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-2 duration-200 hover:shadow-[#6260607a] hover:shadow-xl">
                    <img
                      className="rounded-t-lg"
                      src={item?.image}
                      alt=""
                      style={{ width: "300px", height: "140px" }}
                    />
                    <div className="p-5">
                      <h5 className="mb-2 text-xl font-bold tracking-tight text-gray-900 dark:text-white">
                        {item?.courseName.slice(0, 28)} <br />
                        {item?.courseName.slice(28)}
                      </h5>
                      <h5>
                        {item?.finalRating}
                      </h5>
                    </div>
                  </div>
                </Link>
                {hoveredItem === item && (
                  <div className="absolute top-0 left-full ml-4">
                    <div
                      className="absolute -top-0 left-0 bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 z-10"
                      style={{ width: "280px", height: "400px" }}>
                      {/* Content of your hover card */}
                      <div className="p-5">
                        <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                          {item.name} (formerly {item.name}) and build awesome,
                          reactive web apps with the successor of {item.name}.js
                        </h5>
                        <p>
                          Develop modern, complex, responsive and scalable web
                          applications with {item.name}
                        </p>
                        <button
                          onClick={() => handleAddToCart(item)}
                          className="bg-blue-500 absolute bottom-0 w-48 -ml-28 mb-4 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded mt-4">
                          Add to Cart
                        </button>
                        <button
                          onClick={() => handleLike(item)}
                          className="text-red-500 absolute bottom-0 mb-4 ml-20 duration-500 hover:text-red-700">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-12 w-12"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor">
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth="2"
                              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
                            />
                          </svg>
                        </button>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center mt-8">
            <h2 className="text-2xl font-bold">Courses are under construction</h2>
          </div>
        )}
      </div>
    </Fragment>

  );
};

export default DropDashboard;
