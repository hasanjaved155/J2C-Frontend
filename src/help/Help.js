import React, { useState } from 'react';
import axios from 'axios';
import HelpAnimation from './HelpAnimation';
import { toast } from 'react-hot-toast';

const Help = () => {
  // Initialize state for the input fields
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    message: ''
  });

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Send data to the backend
      const res = await axios.post('/help/help-desk', formData);
      if (res.data.success) {
        toast.success(res.data.message)
      }
    } catch (error) {
      console.error('Error submitting form:', error);
      // Handle form submission error (e.g., show an error message)
    }
  };

  return (
    <div className="flex items-center my-20 ml-52">
      <div className="border-2 border-sky-800 p-5 shadow-lg bg-gradient-to-tl from-cyan-50 to-sky-100 rounded-t-xl rounded-bl-xl w-[55%]" style={{ height: "24.4rem" }}>
        <h2 className="text-2xl font-semibold mb-4">Need Some Help</h2>
        <p className="text-gray-600 mb-6">Nice to meet you! Enter your query.</p>
        <form className="grid grid-cols-2 grid-rows-3" onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="firstName" className="block text-sm font-medium text-gray-700">
              First Name
            </label>
            <input
              type="text"
              id="firstName"
              name="firstName"
              className="mt-1 p-2 w-11/12 border rounded-md focus:ring focus:ring-blue-200"
              placeholder="FirstName"
              value={formData.firstName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="lastName" className="block text-sm font-medium text-gray-700">
              Last Name
            </label>
            <input
              type="text"
              id="lastName"
              name="lastName"
              className="mt-1 p-2 w-11/12 border rounded-md focus:ring focus:ring-blue-200"
              placeholder="LastName"
              value={formData.lastName}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4 row-span-2">
            <label htmlFor="message" className="block text-sm font-medium text-gray-700">
              Message
            </label>
            <textarea
              id="message"
              name="message"
              className="mt-1 p-2 w-11/12 h-4/5 border rounded-md focus:ring focus:ring-blue-200"
              placeholder="What is your query?"
              value={formData.message}
              onChange={handleInputChange}
            />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="mt-1 p-2 w-11/12 border rounded-md focus:ring focus:ring-blue-200"
              placeholder="Email Address"
              value={formData.email}
              onChange={handleInputChange}
            />
          </div>
          <div className="flex justify-center items-center">
            <button
              type="submit"
              className="bg-blue-500 text-white py-2 px-4 w-11/12 h-1/2 rounded-md hover:bg-blue-600"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
      <div className="absolute top-48 right-36">
        <HelpAnimation />
      </div>
    </div>
  );
};

export default Help;




{/* <div className="border-2 border-sky-800 bg-base-100 rounded-t-xl rounded-bl-xl" style={{ height: "22.1rem" }}>
  <div className="card-body">
    <h2 className="card-title">Welcome to PCS Global Pvt Ltd</h2>
    {/* <img
            className="mt-9"
            src="https://www.pcsglobal.in/assets/images/logo.jpg"
            alt=""
          /> */}
//   <p className="mt-8">HelpLine No. +91 9830376126</p>
//   <div className="card-actions justify-end">
//     <button className="btn btn-primary">Contact Now</button>
//   </div>
// </div>
// </div> */}