import React, { useRef } from "react";
import { FaQuoteLeft } from "react-icons/fa";
import svg from "../images copy/svg1.svg";
import svg2 from "../images copy/svg2.png";
import svg3 from "../images copy/svg3.png";
import { useNavigate } from "react-router-dom";
import { motion, useInView } from "framer-motion";

const J2CInstructor = () => {
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true });
    const navigate = useNavigate();
    return (
        <div className="bg-zinc-50">
            <div className="bg-white flex justify-center w-full h-full shadow-xl sm:rounded-b-[30%] md:rounded-b-[20%] overflow-hidden">
                <div className="flex flex-col items-center custom-1000:flex-row w-full custom-950:w-auto">
                    {/* <div className="w-full rounded-b-full h-full" /> */}
                    <div className="w-full bg-sky-100 flex flex-col items-center rounded-b-full">
                        <div className="py-10 px-4 custom-950:p-10 flex flex-col items-center">
                            <h1 className="p-2 border-2 font-semibold uppercase rounded-full w-52 border-black ">
                                Become Mentor
                            </h1>
                            <h1 className="p-4 lg:text-7xl md:text-6xl  text-5xl font-bold ">
                                Come Teach With Us
                            </h1>

                            <h1 className="">
                                Become an mentor and changes live-Including your own
                            </h1>
                        </div>

                        <div className="w-full custom-950:mt-24 flex flex-col items-center custom-950:flex-row justify-between ">
                            <div className="pb-4 sm:w-1/5 ml-5 hidden custom-950:block">
                                <div className="pb-4">
                                    <FaQuoteLeft />
                                </div>
                                <h1 className="text-left pb-3 italic ">
                                    <div>Join one of the world's largest</div>
                                    <div>online learning marketplaces</div>
                                </h1>

                                <h1 className="pt-1 text-3xl text-left font-bold">10K+</h1>
                                <h1 className="text-left">mentors</h1>
                            </div>

                            <div className="flex flex-col md:flex-row custom-950:hidden justify-between w-full">
                                <div className="md:ml-5 flex flex-col items-center md:items-start md:w-1/3 ">
                                    <FaQuoteLeft className="mb-3" />
                                    <div className="mb-3 italic ">
                                        <div className="md:text-start text-center ">
                                            Join one of the world's largest online learning
                                            marketplaces
                                        </div>
                                    </div>

                                    <h1 className=" text-3xl text-left font-bold ">10K+</h1>
                                    <h1 className="text-left ">mentors</h1>
                                </div>
                                <h1 className="text-center md:text-right italic mt-5 md:mr-5 flex flex-col items-center md:w-1/3  ">
                                    <div>
                                        {" "}
                                        "J2CInstructor has changed my life.With J2C,I can follow my
                                        passion and become a teacher"
                                    </div>
                                </h1>
                            </div>
                            <div className="relative flex flex-col justify-center items-center w-3/5 mt-40 md:mt-5">
                                <div className="bg-sky-200  h-72 w-[34rem] sm:h-96 sm:w-[44rem] rounded-t-full" />
                                <div className="absolute bottom-0 w-[25rem] sm:w-[30rem]">
                                    <img src={require("../images copy/Instructor.png")} alt="" />
                                </div>
                                <div className="flex  px-2 py-2 bg-zinc-100 bg-opacity-50 hover:bg-opacity-90 transition-all ease-in delay-75 absolute rounded-full bottom-3">
                                    <button
                                        className="px-3 bg-gradient-to-br from-lime-400 to-emerald-400 rounded-full border-2  border-green-900 text-black font-semibold"
                                        onClick={() => navigate("/teachins")}
                                    >
                                        Get Started
                                    </button>
                                </div>
                            </div>

                            <h1 className="text-right hidden custom-950:block italic w-1/5 mr-5">
                                <div> "J2CInstructor has changed my life.</div>
                                <div>With J2C,I can follow my passion and</div>
                                <div>become a teacher"</div>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

            <div className="">
                <div className=" flex flex-col items-center ">
                    <div className="flex flex-col items-center p-12">
                        <h1 className="p-2 border-2 font-semibold uppercase rounded-full w-52 text-black border-gray-400 ">
                            Why Mentor
                        </h1>
                        <h1 className="p-4 text-4xl font-bold ">So Many Reasons To Start</h1>

                        <h1 className="">
                            Start, switch or advance your career with more than 1K+ courses in
                            J2C
                        </h1>
                    </div>

                    <div className="grid grid-col-1 custom-950:grid-cols-3 gap-5 max-w-[1560px] px-10  bg-neutral-200 bg-opacity-50 py-10">
                        <div className="bg-white  rounded-2xl  bg-gradient-to-br drop-shadow shadow-zinc-600 hover:drop-shadow-lg  transition-all duration-300">
                            <div className="row-span-2 flex justify-center h-56">
                                <img className="w-auto " src={svg} alt="" />
                            </div>
                            <div className="py-5">
                                <h1 className="text-xl font-semibold">Teach Your Way</h1>
                                <p className="px-4 italic text-sm">
                                    Publish the course you want,in the way you want,and always
                                    have control of your own content.
                                </p>
                            </div>
                        </div>
                        <div className="rounded-2xl bg-gradient-to-br drop-shadow shadow-zinc-600 hover:drop-shadow-lg bg-white transition-all duration-300">
                            <div className="row-span-2 flex justify-center h-56 ">
                                <img className="w-auto h-full object-cover" src={svg2} alt="" />
                            </div>
                            <div className="py-5">
                                <h1 className="text-xl font-semibold">Inspire Learners</h1>
                                <p className=" px-4 italic text-sm">
                                    Teach what you know and help learners explore their
                                    interests,gain new skills,and advance their careers.
                                </p>
                            </div>
                        </div>
                        {/* from-teal-500 to-teal-700 */}
                        <div className=" rounded-2xl  bg-gradient-to-br drop-shadow shadow-zinc-600 hover:drop-shadow-lg bg-white transition-all duration-300">
                            <div className="row-span-2 flex justify-center h-56">
                                <img className="w-auto" src={svg3} alt="" />
                            </div>
                            <div className="py-5">
                                <h1 className="text-xl font-semibold">Get rewarded</h1>
                                <p className=" px-4 italic text-sm">
                                    Expand your professional networks,build your expertise,and
                                    earn money on each paid enrollment.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className="p-10 w-full">
                        <motion.div
                            ref={ref}
                            initial={{ opacity: 0, y: 50 }}
                            animate={isInView ? { opacity: 1, y: 0 } : {}}
                            transition={{ duration: 0.5 }}
                        >
                            <div className="px-10 py-10 grid grid-cols-1 h-full  sm:grid-cols-2 custom-1000:grid-cols-4 gap-y-10   ">
                                <h1 className=" font-bold sm:text-left flex flex-col items-center">
                                    <div className="text-gray-700 text-6xl">53M</div>
                                    <div className="font-normal text-gray-600">students</div>
                                </h1>
                                {/* <div className="bg-gray-200 w-[2px] self-stretch"></div> */}
                                <h1 className=" font-bold sm:text-left flex flex-col items-center">
                                    <div className="text-gray-700 text-6xl">75+</div>
                                    <div className="font-normal text-gray-600">languages</div>
                                </h1>
                                {/* <div className="bg-gray-200 w-[2px] self-stretch"></div> */}
                                <h1 className=" font-bold sm:text-left flex flex-col items-center">
                                    <div className="text-gray-700 text-6xl">1K</div>
                                    <div className="font-normal text-gray-600 ">enrollments</div>
                                </h1>
                                {/* <div className="bg-gray-200 w-[2px] self-stretch"></div> */}
                                <h1 className="font-bold sm:text-left flex flex-col items-center">
                                    <div className="text-gray-700 text-6xl">100+</div>
                                    <div className="font-normal text-gray-600">courses</div>
                                </h1>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default J2CInstructor;

