import React from 'react'
import { FaQuoteLeft } from "react-icons/fa";
import svg from '../images copy/svg1.svg'
import svg2 from '../images copy/svg2.png'
import svg3 from '../images copy/svg3.png'
import { useNavigate } from 'react-router-dom';

const J2CInstructor = () => {
    const navigate = useNavigate();
    return (
        <div className='grid bg-sky-50 grid-rows-2'>
            <div className='bg-white flex justify-center h-full shadow-xl rounded-b-[20%]'>
                <div className='flex'>
                    <div className='w-full rounded-b-full bg-sky-50 h-full' />
                    <div className='w-full -ml-[100%]'>
                        <div className='p-10 flex flex-col items-center'>
                            <h1 className='p-2 border-2 font-semibold uppercase rounded-full w-52 border-black '>
                                Become Mentor
                            </h1>
                            <h1 className='p-4 text-7xl font-bold'>Come Teach With Us</h1>

                            <h1 className=''>Become an mentor and changes live-Including your own</h1>
                        </div>
                        <div className='ml-14 mt-24 flex justify-center'>
                            <div className='pb-4'>
                                <div className='pb-4'>
                                    <FaQuoteLeft />
                                </div>
                                <h1 className="text-left pb-3 italic">
                                    <div>Join one of the world's largest</div>
                                    <div>online learning marketplaces</div>
                                </h1>

                                <h1 className='pt-1 text-3xl text-left font-bold'>
                                    10K+
                                </h1>
                                <h1 className='text-left'>Mentors</h1>
                            </div>
                            <div className='relative flex justify-center'>
                                <div className='bg-blue-400 h-96 w-[44rem] rounded-t-full' />
                                <div className='absolute bottom-0 w-2/3'>
                                    <img src={require('../images copy/Instructor.png')} alt="" />
                                </div>
                                <div className='bg-zinc-100 bg-opacity-50 hover:bg-opacity-90 transition-all ease-in delay-75 absolute rounded-full bottom-3 w-1/4 h-11'>
                                    <button className='bg-gradient-to-br from-lime-400 to-emerald-400 mt-1.5 rounded-full border-2 h-8 w-11/12 border-green-900 text-black font-semibold'
                                        onClick={() => navigate("/teachins")}>
                                        Get Started
                                    </button>
                                </div>
                            </div>
                            <div>
                                <div>
                                    <h1 className='text-right italic'>
                                        <div> "J2CInstructor has changed my life.</div>
                                        <div>With J2C,I can follow my passion and</div>
                                        <div>become a teacher"</div>
                                    </h1>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <div>
                <div className=' flex flex-col items-center'>
                    <div className='flex flex-col items-center p-12'>
                        <h1 className='p-2 border-2 font-semibold uppercase rounded-full w-52 text-black border-gray-400 '>
                            Why Mentor
                        </h1>
                        <h1 className='p-4 text-4xl font-bold'>So Many Reasons To Start</h1>

                        <h1 className=''>Start,Switch,or advance your career with more than 1K+ courses in J2C</h1>
                    </div>

                    <div className='flex text-black font-bold justify-evenly w-2/3'>
                        <div className='rounded-2xl w-80 h-80 grid grid-rows-3 bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg hover:shadow-2xl'>
                            <div className='row-span-2 flex justify-center'>
                                <img className='w-7/12' src={svg} alt="" />
                            </div>
                            <div className='row-span-1 text-white'>
                                <h1 className='text-xl font-semibold'>Tech Your Way</h1>
                                <p className='p-2 px-4 italic text-sm'>
                                    Publish the course you want,in the way you want,and always have control of your own content.
                                </p>
                            </div>
                        </div>
                        <div className='rounded-2xl w-80 h-80 grid grid-rows-3 bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg hover:shadow-2xl'>
                            <div className='row-span-2 flex justify-center'>
                                <img className='w-auto h-56' src={svg2} alt="" />
                            </div>
                            <div className='row-span-1 text-white'>
                                <h1 className='text-xl font-semibold'>Inspire Learners</h1>
                                <p className='p-2 px-4 italic text-sm'>
                                    Teach what you know and help learners explore their interests,gain new skills,and advance their careers.
                                </p>
                            </div>
                        </div>
                        <div className='rounded-2xl w-80 h-80 grid grid-rows-3 bg-gradient-to-br from-teal-500 to-teal-700 shadow-lg hover:shadow-2xl'>
                            <div className='row-span-2 flex justify-center'>
                                <img className='w-auto h-60' src={svg3} alt="" />
                            </div>
                            <div className='row-span-1 text-white'>
                                <h1 className='text-xl font-semibold'>Get rewarded</h1>
                                <p className='p-2 px-4 italic text-sm'>
                                    Expand your professional networks,build your expertise,and earn money on each paid enrollment.
                                </p>
                            </div>
                        </div>
                    </div>
                    <div className='p-10 w-[64%] rounded-full'>
                        <div className='shadow-2xl flex bg-gradient-to-br from-teal-500 to-teal-700 justify-evenly items-center rounded-full h-24'>
                            <h1 className='text-white font-bold text-left'>
                                <div className='text-2xl'>53M</div>
                                <div>Students</div>
                            </h1>
                            <h1 className='text-white font-bold text-left'>
                                <div className='text-2xl'>75+</div>
                                <div>Languages</div>
                            </h1>
                            <h1 className='text-white font-bold text-left'>
                                <div className='text-2xl'>1K</div>
                                <div>Enrollments</div>
                            </h1>
                            <h1 className='text-white font-bold text-left'>
                                <div className='text-2xl'>100+</div>
                                <div>Courses</div>
                            </h1>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default J2CInstructor
