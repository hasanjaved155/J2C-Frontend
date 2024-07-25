import React, { useState } from 'react';
import HelpAnimation from './HelpAnimation';

const Help = () => {
  const [activeTab, setActiveTab] = useState('subscriber'); // state to manage active tab

  const handleTabClick = (tab) => {
    setActiveTab(tab);
  };

  return (
    <div>
      <div className='bg-gradient-to-r from-cyan-600 to-sky-400 w-full h-96 flex justify-center'>
        <div className='bg-gradient-to-r from-yellow-300 to-yellow-500 h-96 w-2/3 shadow-2xl rounded-sm'></div>
        <div className='bg-white w-1/3 p-5 absolute mr-[45rem] mt-24 rounded-lg shadow-2xl'>
          <h1 className='text-5xl font-serif text-left'>How May I Help You?</h1>
          <form className="flex items-center mt-8 mx-auto w-full">
            <label htmlFor="simple-search" className="sr-only">Search</label>
            <div className="relative w-full">
              <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg className="w-4 h-4 text-gray-500 dark:text-gray-400" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 18 20">
                  <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5v10M3 5a2 2 0 1 0 0-4 2 2 0 0 0 0 4Zm0 10a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm12 0a2 2 0 1 0 0 4 2 2 0 0 0 0-4Zm0 0V6a3 3 0 0 0-3-3H9m1.5-2-2 2 2 2" />
                </svg>
              </div>
              <input type="text" id="simple-search" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full ps-10 p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search for solutions" required />
            </div>
            <button type="submit" className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700 rounded-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
              </svg>
              <span className="sr-only">Search</span>
            </button>
          </form>
        </div>
        <div className="absolute top-36 right-20">
          <HelpAnimation />
        </div>
      </div>
      <div className='dark:bg-whitesmoke'>
        <div className='flex justify-center'>
          <div className='flex justify-center w-[26rem] border-[1px] rounded-md border-black mt-12'>
            <div
              onClick={() => handleTabClick('subscriber')}
              className={`text-4xl rounded-l-md p-3 w-1/2 cursor-pointer ${activeTab === 'subscriber' ? 'bg-blue-700 text-white' : ''}`}
            >
              Subscriber
            </div>
            <div
              onClick={() => handleTabClick('instructor')}
              className={`text-4xl rounded-r-md p-3 w-1/2 cursor-pointer ${activeTab === 'instructor' ? 'bg-blue-700 text-white' : ''}`}
            >
              Instructor
            </div>
          </div>
        </div>
        <div className='flex justify-center pt-14'>
          <div className='w-10/12 '>
            <h1 className='text-2xl text-left font-semibold pb-7'>Frequently Ask Questions</h1>
            {activeTab === 'subscriber' && <div>
              <div className='grid grid-cols-3 text-white bg-gradient-to-r from-sky-900 to-cyan-700'>
                <div className=' h-16 flex items-center justify-center'>Refund Status: Common Questions</div>
                <div className=' h-16 flex items-center justify-center'>Payment Method on J2C</div>
                <div className=' h-16 flex items-center justify-center'>Lifetime Access</div>
                <div className=' h-16 flex items-center justify-center'>How to Find Your Missing Course</div>
                <div className=' h-16 flex items-center justify-center'>How to Download Certificate of Completion on Browser</div>
                <div className=' h-16 flex items-center justify-center'>How to Refund a Course</div>
                <div className=' h-16 flex items-center justify-center'>Downloading Course Resources</div>
                <div className=' h-16 flex items-center justify-center'>Learning With J2C: Frequently Asked Questions</div>
                <div className=' h-16 flex items-center justify-center'>Troubleshooting Payment Failures</div>
              </div>

            </div>}
            {activeTab === 'instructor' && <div>
              <div className='grid grid-cols-3 text-white bg-gradient-to-r from-sky-900 to-cyan-700'>
                <div className=' h-16 flex items-center justify-center'>J2C Course Quality Checklist</div>
                <div className=' h-16 flex items-center justify-center'>How to Become a Premeium Instructor</div>
                <div className=' h-16 flex items-center justify-center'>Promote Your Course With Coupons and Referral Link</div>
                <div className=' h-16 flex items-center justify-center'>Instructor Revenue Share</div>
                <div className=' h-16 flex items-center justify-center'>Instructor Promotional Agreements and J2C Deals</div>
                <div className=' h-16 flex items-center justify-center'>Be an Instructor:Frequently Asked Questions</div>
              </div>
            </div>}
          </div>
        </div>

        <div className='flex justify-center pt-14'>
          <div className='w-10/12 '>
            <h1 className='text-2xl text-left font-semibold pb-7'>Select a Topic to Search for Help</h1>
            {activeTab === 'subscriber' && <div className='pb-14'>
              <div className='grid grid-cols-3 gap-y-10'>
                <div className='border-2 w-96 h-56 flex justify-center items-center'>
                  <div>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Getting started</h1>
                      <p className='text-sm'>Learn how J2C works and how to start learning.</p>
                    </div>
                  </div>
                </div>
                <div className='border-2 w-96 flex justify-center items-center'>
                  <div>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Account/Profile</h1>
                      <p className='text-sm'>Manage Your account settings.</p>
                    </div>
                  </div>
                </div>

                <div className='border-2 w-96 flex justify-center items-center'>
                  <div>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Troubleshooting</h1>
                      <p className='text-sm'>Experiencing a technical issue? check here.</p>
                    </div>
                  </div>
                </div>
                <div className='border-2 w-96 h-56 flex justify-center items-center'>
                  <div>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Learning Experience</h1>
                      <p className='text-sm'>Everything about the J2C learning experience.</p>
                    </div>
                  </div>
                </div>
                <div className='border-2 w-96 flex justify-center items-center'>
                  <div className='mt-5'>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Purchase/Refunds</h1>
                      <p className='text-sm'>Learn about purchasing course,
                        how to send gifts, and refunds.</p>
                    </div>
                  </div>
                </div>
                <div className='border-2 w-96 flex justify-center items-center'>
                  <div>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Mobile</h1>
                      <p className='text-sm'>On the go? Learn about our mobile app.</p>
                    </div>
                  </div>
                </div>
                <div className='border-2 w-96 h-56 flex justify-center items-center'>
                  <div>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Trust & Safety</h1>
                      <p className='text-sm'>Trust & Safety information and reporting.</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>}
            {activeTab === 'instructor' && <div className='pb-14'>
              <div className='grid grid-cols-3 gap-y-10'>
                <div className='border-2 w-96 h-56 flex justify-center items-center'>
                  <div>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Instructor Payments</h1>
                      <p className='text-sm'>Understand the revenue share and how to receive payments.</p>
                    </div>
                  </div>
                </div>
                <div className='border-2 w-96 flex justify-center items-center'>
                  <div>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Selling & Promotion</h1>
                      <p className='text-sm'>Learn about the announcement and promotional tools.</p>
                    </div>
                  </div>
                </div>

                <div className='border-2 w-96 flex justify-center items-center'>
                  <div>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Course Building</h1>
                      <p className='text-sm'>Build your course curriculum and landing page.</p>
                    </div>
                  </div>
                </div>
                <div className='border-2 w-96 h-56 flex justify-center items-center'>
                  <div>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Course Management</h1>
                      <p className='text-sm'>Maintain your course and engage with students.</p>
                    </div>
                  </div>
                </div>
                <div className='border-2 w-96 flex justify-center items-center'>
                  <div>
                    <div className='flex justify-center'>
                      <img className='w-1/4' src={require('../images copy/start-button.png')} alt="" />
                    </div>
                    <div className='p-3'>
                      <h1 className='text-xl font-bold'>Trust & Safety</h1>
                      <p className='text-sm'>Policy and copyright questions and guidance.</p>
                    </div>
                  </div>
                </div>

              </div>
            </div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Help;
