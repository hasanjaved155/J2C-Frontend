import React, { useState } from "react";
import faqData from "../data/HelpPageData";
import HelpAnimation from './HelpAnimation';
const { faqSubscriber, faqInstructor, subscriberTopic, instructorTopic } =
  faqData;



const Help = () => {
  const [activeTab, setActiveTab] = useState("subscriber"); // state to manage active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className="bg-gradient-to-r from-cyan-600 to-sky-400 w-full h-96 flex flex-col items-center md:flex md:flex-row md:justify-center relative">
        <div className="bg-gradient-to-r from-yellow-300 to-yellow-500 h-full w-2/3 shadow-2xl rounded-sm"></div>
        <div className="bg-white p-5 absolute md:left-[10%] top-12 md:top-28 rounded-lg shadow-2xl">
          <h1 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-serif text-left ">
            How May I Help You?
          </h1>
          <form className="flex items-center mt-8 mx-auto w-full">
            <label htmlFor="simple-search" className="sr-only">
              Search
            </label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  className="w-4 h-4 text-gray-500 dark:text-gray-400"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 18 20"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2"
                  />
                </svg>
              </div>
              <input
                type="text"
                id="simple-search"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Search for solutions"
                required
              />
            </div>
            <button
              type="submit"
              className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              <svg
                className="w-4 h-4"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 20 20"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
                />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className="absolute hidden md:bottom-0 md:right-[10%] md:block text-xl text-white">
          <HelpAnimation />
        </div>
      </div>
      <div className="dark:bg-whitesmoke ">
        <div className="flex justify-center">
          <div className="flex justify-center w-[14rem] sm:w-[16rem]  lg:w-[26rem] border-[1px] rounded-md border-black mt-12 items-ceter">
            <div
              onClick={() => handleTabClick("subscriber")}
              className={`text-center text-xl sm:text-2xl lg:text-4xl rounded-l-md py-3 w-1/2 cursor-pointer ${activeTab === "subscriber" ? "bg-blue-700 text-white" : ""
                }`}
            >
              Subscriber
            </div>
            <div
              onClick={() => handleTabClick("instructor")}
              className={`text-center text-xl sm:text-2xl lg:text-4xl rounded-r-md py-3 w-1/2 cursor-pointer ${activeTab === "instructor" ? "bg-blue-700 text-white" : ""
                }`}
            >
              Instructor
            </div>
          </div>
        </div>
        <div className="flex justify-center pt-14">
          <div className="w-10/12 ">
            <h1 className="text-2xl text-left font-semibold pb-7">
              Frequently Ask Questions
            </h1>
            {activeTab === "subscriber" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white bg-gradient-to-r from-sky-900 to-cyan-700 text-center">
                  {faqSubscriber.map((item, index) => (
                    <div
                      key={index}
                      className="text-sm xl:text-base h-16 flex items-center justify-center px-3"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "instructor" && (
              <div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 text-white bg-gradient-to-r from-sky-900 to-cyan-700 text-center">
                  {faqInstructor.map((item, index) => (
                    <div
                      key={index}
                      className="text-sm xl:text-base h-16 flex items-center justify-center px-3"
                    >
                      {item}
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        <div className="flex justify-center pt-14">
          <div className="w-10/12 ">
            <h1 className="text-2xl text-left font-semibold pb-7">
              Select a Topic to Search for Help
            </h1>
            {activeTab === "subscriber" && (
              <div className="pb-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {subscriberTopic.map((item, index) => (
                    <div
                      key={index}
                      className="border-2 h-56 flex flex-col justify-center items-center  py-5"
                    >
                      <div className="flex justify-center h-1/2">
                        <item.SVGcomponent />
                      </div>
                      <div className="p-3 h-1/2 flex flex-col items-center">
                        <h1 className="text-base sm:text-xl font-bold">
                          {item.heading}
                        </h1>
                        <p className="text-sm text-center">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
            {activeTab === "instructor" && (
              <div className="pb-14">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                  {instructorTopic.map((item, index) => (
                    <div className="border-2 h-56 flex flex-col justify-center items-center py-5">
                      <div className="flex justify-center h-1/2">
                        <item.SVGcomponent />
                      </div>
                      <div className="p-3 h-1/2 flex flex-col items-center">
                        <h1 className="text-base sm:text-xl font-bold">
                          {item.heading}
                        </h1>
                        <p className="text-sm text-center">{item.content}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;