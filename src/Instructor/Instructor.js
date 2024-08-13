import React, { useEffect, useState } from 'react'
import { countries } from './CountryArray'
import InstructorForm from './InstructorForm';
import toast from 'react-hot-toast';
import axios from 'axios';
import InstructorAnimation from './InstructorAnimation';
import { useRemain } from '../Contexts/RemainingContext';

const Instructor = () => {

    const { isInstructor, setInstructor } = useRemain();

    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [domain, setDomain] = useState("");
    const [country, setCountry] = useState("");
    const [category, setCategory] = useState("");
    const [message, setMessage] = useState("");
    const [inst, setInst] = useState("");

    const user = JSON.parse(localStorage.getItem('user'));
    const checkInstructorStatus = async () => {
        try {
            const res = await axios.get(`/teach/checkInstructor/${user?.email}`);
            if (res?.data && res?.data?.success) {
                const instructor = res.data.instructor;
                setInst(instructor);


                // Check if the instructor has access
                if (instructor?.access === true) {
                    setInstructor(true);
                } else {
                    toast.success("Wait Admin to Give You Further Access")
                    setInstructor(false);
                }
            } else {
                setInstructor(false);
            }
        } catch (error) {
            toast.error('Fill the form of instructor');
        }
    };


    useEffect(() => {
        // checkInstructorStatus();
        setEmail(user?.email)
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/teach/be-instructor', { email, phone, domain, category, country, message });
            if (res && res.data.success) {
                toast.success(res.data.message);
                // setInstructor(true); // Update instructor status on successful submission
            } else if (!res.data.success) {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (

        <div>
            {isInstructor ? (
                <div>
                    <InstructorForm />
                </div>
            ) : (
                <div className='flex p-16 bg-sky-300 justify-evenly'>
                    <div>
                        <div>
                            <h1 className='font-extrabold text-5xl text-left mt-4'>Be an Instructor</h1>
                            <p className='text-left text-white text-3xl pt-4'>Contact Form</p>
                        </div>
                        <div>
                            <InstructorAnimation />
                        </div>
                    </div>
                    <div className='w-[55rem] ml-10 flex justify-evenly  bg-gradient-to-br from-teal-500 to-teal-700 rounded-lg'>
                        <div className='flex items-center'>
                            <p className='text-5xl italic text-zinc-700 w-80 text-left font-light p-4 bg-gray-100 rounded-2xl'>
                                Let's become an Instructor
                            </p>
                        </div>

                        <div className='p-7'>
                            <form className="text-left mx-auto w-96 p-10 bg-white rounded-3xl" onSubmit={handleSubmit}>
                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="email"
                                        name="floating_email"
                                        id="floating_email"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        required
                                        disabled
                                    />
                                    <label htmlFor="floating_email" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Email address</label>
                                </div>

                                <div className="relative z-0 w-full mb-5 group">
                                    <input
                                        type="tel"

                                        name="floating_phone"
                                        id="floating_phone"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        value={phone}
                                        onChange={(e) => setPhone(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="floating_phone" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Phone number</label>
                                </div>

                                <div className="relative z-0 w-full mb-5 group">
                                    <textarea
                                        name="floating_message"
                                        id="floating_message"
                                        className="block py-2.5 px-0 w-full text-sm text-gray-900 bg-transparent border-0 border-b-2 border-gray-300 appearance-none dark:text-white dark:border-gray-600 dark:focus:border-blue-500 focus:outline-none focus:ring-0 focus:border-blue-600 peer"
                                        placeholder=" "
                                        value={message}
                                        onChange={(e) => setMessage(e.target.value)}
                                        required
                                    />
                                    <label htmlFor="floating_message" className="peer-focus:font-medium absolute text-sm text-gray-500 dark:text-gray-400 duration-300 transform -translate-y-6 scale-75 top-3 -z-10 origin-[0] peer-focus:start-0 rtl:peer-focus:translate-x-1/4 peer-focus:text-blue-600 peer-focus:dark:text-blue-500 peer-placeholder-shown:scale-100 peer-placeholder-shown:translate-y-0 peer-focus:scale-75 peer-focus:-translate-y-6">Message</label>
                                </div>

                                <div className="form-control w-full mb-5">
                                    <select
                                        name="category"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                        className="input input-bordered"
                                        required
                                    >
                                        <option value="" disabled>Category</option>
                                        <option value="Development">Development</option>
                                        <option value="Business">Business</option>
                                        <option value="Finance & Accounting">Finance & Accounting</option>
                                        <option value="IT & Software">IT & Software</option>
                                        <option value="Office Productivity">Office Productivity</option>
                                        <option value="Personal Development">Personal Development</option>
                                        <option value="Design">Design</option>
                                        <option value="Marketing">Marketing</option>
                                        <option value="Lifestyle">Lifestyle</option>
                                        <option value="Photography & Video">Photography & Video</option>
                                        <option value="Health & Fitness">Health & Fitness</option>
                                        <option value="Music">Music</option>
                                        <option value="Teaching & Academics">Teaching & Academics</option>
                                    </select>
                                </div>

                                <div className="form-control w-full mb-5">
                                    <select
                                        name="country"
                                        value={country}
                                        onChange={(e) => setCountry(e.target.value)}
                                        className="input input-bordered"
                                        required
                                    >
                                        <option value="">Select Country</option>
                                        {countries.map((country, index) => (
                                            <option key={index} value={country}>{country}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-control w-full mb-5">
                                    <select
                                        name="domain"
                                        value={domain}
                                        onChange={(e) => setDomain(e.target.value)}
                                        className="input input-bordered"
                                        required
                                    >
                                        <option value="">Domain</option>
                                        <option value="EILP MERN STACK DEVELOPER">Mern Stack Developer</option>
                                        <option value="EILP JAVA FULL STACK DEVELOPER">Java Full Stack Developer</option>
                                        <option value="EILP DATA ANALYST">Data Analyst</option>
                                        <option value="EILP SALESFORCE">Salesforce</option>
                                        <option value="EILP PYTHON DEVELOPER">Python Developer</option>
                                    </select>
                                </div>

                                <button type="submit" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Submit</button>
                            </form>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default Instructor
