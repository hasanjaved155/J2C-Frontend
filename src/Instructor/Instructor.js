import axios from 'axios';
import React, { useState, useEffect, useRef } from 'react';
import toast from 'react-hot-toast';
import InstructorForm from './InstructorForm';
import { countries } from './CountryArray'

const Instructor = ({ isInstructor, setInstructor }) => {
    const [email, setEmail] = useState("");
    const [phone, setPhone] = useState("");
    const [domain, setDomain] = useState("");
    const [country, setCountry] = useState('');
    const [message, setMessage] = useState("");
    const [expanded, setExpanded] = useState(false);
    const [formVisible, setFormVisible] = useState(false);
    // const [isInstructor, setIsInstructor] = useState(false); // New state to track if the user is an instructor
    const divRef = useRef(null);

    const user = JSON.parse(localStorage.getItem('user'));
    const checkInstructorStatus = async () => {
        try {
            const res = await axios.get(`/teach/checkInstructor/${user?.email}`);
            if (res?.data && res?.data?.success) {
                setInstructor(true);

            } else {
                setInstructor(false);
            }
        } catch (error) {
            toast.error('Fill the form of instructor');
        }
    };

    useEffect(() => {
        checkInstructorStatus();
        setEmail(user?.email)
    }, [])

    const handleDivClick = () => {
        if (!expanded) {
            setExpanded(true);
            setTimeout(() => {
                setFormVisible(true);
            }, 700);
        }
    };

    const handleCloseClick = () => {
        setExpanded(false);
        setFormVisible(false);
    };

    const handleClickOutside = (event) => {
        if (divRef.current && !divRef.current.contains(event.target)) {
            setExpanded(false);
            setFormVisible(false);
        }
    };

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('/teach/be-instructor', { email, phone, domain, country, message });
            if (res && res.data.success) {
                toast.success(res.data.message);
                setInstructor(true); // Update instructor status on successful submission
            } else if (!res.data.success) {
                toast.error(res.data.message);
            }
        } catch (error) {
            toast.error(error.message);
        }
    };

    return (
        <div className="py-10">
            <div className="flex justify-evenly">
                {!isInstructor && (<div className="lg:text-left">
                    <img src={require('../images copy/samarthnaik.jpg')} className='rounded-lg w-[45rem]' alt="" />
                </div>)}

                <div className="flex items-center">
                    <div
                        ref={divRef}
                        onClick={handleDivClick}
                        className={`flex flex-col p-4 justify-center rounded-xl bg-sky-950 cursor-pointer transition-all delay-100 duration-1000 ${expanded ? 'w-[31rem] h-[31rem]' : 'w-32 h-12 items-center'}`}
                    >
                        {!expanded ? (
                            <span className='text-slate-200 font-extrabold'>{isInstructor ? 'Instructor' : 'Get Started'}</span>
                        ) : (
                            formVisible && (
                                <div>
                                    <div className='flex justify-end w-[31rem]' onClick={handleCloseClick}>
                                        <div className='bg-sky-950 rounded-full border-[6px] p-4 border-white'>
                                            <svg xmlns="http://www.w3.org/2000/svg"
                                                fill="none" viewBox="0 0 24 24"
                                                stroke-width="3" stroke="white" className="size-4">
                                                <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
                                            </svg>
                                        </div>
                                    </div>

                                    {isInstructor ? (
                                        <div>
                                            <InstructorForm />
                                        </div>
                                    ) : (
                                        <div>
                                            <h1 className="text-xl font-bold text-gray-300">Become an Instructor</h1>
                                            <form className="card-body" onSubmit={handleSubmit}>
                                                <div className='grid gap-5'>
                                                    <div className="form-control">
                                                        <input
                                                            type="email"
                                                            placeholder="Email"
                                                            className="input input-bordered"
                                                            name="email"
                                                            value={email}
                                                            onChange={(e) => setEmail(user?.email)}
                                                            disabled
                                                        />
                                                    </div>
                                                    <div className="form-control">
                                                        <input
                                                            type="phone"
                                                            placeholder="Phone No"
                                                            className="input input-bordered"
                                                            name="phone"
                                                            value={phone}
                                                            onChange={(e) => setPhone(e.target.value)}
                                                            required
                                                        />
                                                    </div>
                                                    <div className="form-control">
                                                        <select
                                                            name="country"
                                                            value={country}
                                                            onChange={(e) => setCountry(e.target.value)}
                                                            className="input input-bordered"
                                                        >
                                                            <option value="">Select Country</option>
                                                            {countries.map((country, index) => (
                                                                <option key={index} value={country}>{country}</option>
                                                            ))}
                                                        </select>
                                                    </div>
                                                    <div className="form-control">
                                                        <select
                                                            name="domain"
                                                            value={domain}
                                                            onChange={(e) => setDomain(e.target.value)}
                                                            className="input input-bordered"
                                                        >
                                                            <option value="">Domain</option>
                                                            <option value="EILP MERN STACK DEVELOPER">Mern Stack Developer</option>
                                                            <option value="EILP JAVA FULL STACK DEVELOPER">Java Full Stack Developer</option>
                                                            <option value="EILP DATA ANALYST">Data Analyst</option>
                                                            <option value="EILP SALESFORCE">Salesforce</option>
                                                            <option value="EILP PYTHON DEVELOPER">Business Analyst</option>
                                                        </select>
                                                    </div>
                                                    <div className="form-control">
                                                        <textarea
                                                            placeholder="Write a message"
                                                            className="input input-bordered"
                                                            name="message"
                                                            value={message}
                                                            onChange={(e) => setMessage(e.target.value)}
                                                        />
                                                    </div>
                                                </div>
                                                <div className="form-control mb-8 mt-6">
                                                    <button className="btn btn-primary">Contact</button>
                                                </div>
                                            </form>
                                        </div>
                                    )}
                                </div>
                            )
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Instructor;
