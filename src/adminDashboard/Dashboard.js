import axios from "axios";
import React, { Fragment, useState, useEffect } from "react";
import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router-dom";
// import TotalCount from "../components/TotalCount";

const Dashboard = ({ searchTerm, setItem }) => {
  const [dashboards, setDashboards] = useState([]);
  const navigate = useNavigate();
  const [path, setLink] = useState('');



  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          searchTerm
            ? `/course/get-dashboard?search=${searchTerm}`
            : "/course/get-dashboard"
        );
        setDashboards(res.data.dashboards);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, [searchTerm]);

  const renderStars = (count) => {
    const roundedCount = Math.ceil(count); // Round up to the nearest integer
    const stars = [];

    if (roundedCount === 0) {
      // If count is 0, show 5 empty stars
      for (let i = 0; i < 5; i++) {
        stars.push(<span key={i}>&#9734;</span>);
      }
    } else {
      // Show stars according to the rounded count
      for (let i = 0; i < 5; i++) {
        if (i < roundedCount) {
          stars.push(<span key={i} className="text-yellow-400 ">&#9733;</span>);
        } else {
          stars.push(<span key={i}>&#9734;</span>);
        }
      }
    }

    return stars;
  };



  // useEffect(() => {
  //   const fetchReview = async () => {
  //     try {
  //       const res = await axios.get(`/dashboard/reviews?${path}`);
  //       setRie(res.data.averageRating);
  //     } catch (error) {
  //       console.error("Error fetching data:", error);
  //     }
  //   };
  //   fetchReview();
  // }, [path]); // Update the effect to depend on the link state

  // const handleClick = (item) => {
  //   if (
  //     !user?.employeeId &&
  //     item?.role &&
  //     item?.role[0]?.rolename === "Employee"
  //   ) {
  //     navigate("/enroll");
  //   }
  // };

  // const handleLinkClick = (itemLink) => {
  //   setLink(itemLink);
  // };


  return (
    <Fragment>
      <div className="flex flex-col items-center justify-center">

        <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4 mt-4">
          {dashboards?.length > 0 &&
            dashboards?.map((item) => (
              <div key={item._id} className="relative ">
                <Link to='/description'
                  onClick={() => setItem(item)}
                >
                  <div className="lg:w-[300px] lg:h-[250px] h-[300px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:-translate-y-2 duration-200 hover:shadow-[#6260607a] hover:shadow-xl">
                    <img
                      className="rounded-t-lg "
                      src={item?.image}
                      alt=""
                      style={{ width: "300px", height: "140px" }}
                    />
                    <div className="p-5">
                      <h5 className="mb-2 text-base lg:text-lg font-bold tracking-tight text-gray-900 dark:text-white">
                        {item?.courseName.slice(0, 28)} <br />
                        {item?.courseName.slice(28)}
                      </h5>
                      <div className="lg:flex justify-evenly items-center">
                        {/* <h4 className="text-2xl">{renderStars(item?.finalRating)}</h4> */}
                        {/* <h4>{<TotalCount listId={item?.listId} />}</h4> */}
                      </div>
                    </div>
                  </div>
                </Link>
              </div>
            ))}
        </div>

      </div>
    </Fragment>
  );
};

export default Dashboard;
