import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faLanguage } from '@fortawesome/free-solid-svg-icons';
// import Logo from '../assets/logo.svg'
import Image1 from '../images copy/1.svg'
import Image2 from '../images copy/2.svg'
import Image3 from '../images copy/3.svg'
import Image4 from '../images copy/4.svg'

const Footer = () => {
    return (
        <div className='text-white mt-auto flex flex-col bg-gradient-to-r from-cyan-600 to-sky-900 py-8 px-3 md:px-8 lg:px-12 w-full'>
            <div className='lg:flex justify-between gap-6'>
                <div className=' text-2xl font-semibold text-wrap lg:w-1/2 mb-5'>Top companies choose <span className='text-sky-950'>J2C Business</span> to build in-demand career skills.</div>
                <div className='flex font-semibold items-baseline flex-wrap lg:w-1/2 lg:justify-around justify-between'>
                    <img src={Image1} alt="Logo" className='max-h-20' />
                    <img src={Image2} alt="Logo" className='max-h-20' />
                    <img src={Image3} alt="Logo" className='max-h-20' />
                    <img src={Image4} alt="Logo" className='max-h-20 ' />
                </div>
            </div>
            <div className='h-[1px] bg-zinc-700 my-6'></div>
            <div className='sm:flex justify-between flex-wrap'>
                <button className='order-1 sm:order-2 border px-6 py-2 h-min flex gap-2 items-center hover:bg-zinc-700 transition-all mb-6 '>
                    <FontAwesomeIcon icon={faLanguage} />
                    English
                </button>
                <div className='space-y-2 flex flex-col sm:space-y-0 sm:flex-row sm:space-x-20 sm:order-1 order-2 mb-5'>
                    <div className='flex flex-col space-y-2'>
                        <a href="#" className='hover:underline'>Business</a>
                        <a href="#" className='hover:underline whitespace-nowrap'>About us</a>
                        <a href="#" className='hover:underline whitespace-nowrap'>Contact us</a>
                        <a href="#" className='hover:underline whitespace-nowrap'>Get the app</a>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <a href="#" className='hover:underline'>Careers</a>
                        <a href="#" className='hover:underline'>Blog</a>
                        <a href="#" className='hover:underline whitespace-nowrap'>Help and Support</a>
                        <a href="#" className='hover:underline whitespace-nowrap'>About us</a>
                    </div>
                    <div className='flex flex-col space-y-2'>
                        <a href="#" className='hover:underline'>Terms</a>
                        <a href="#" className='hover:underline whitespace-nowrap'>Privacy Policy</a>
                        <a href="#" className='hover:underline'>Cookies</a>
                        <a href="#" className='hover:underline'>Sitemap</a>
                    </div>
                </div>

            </div>
            <div className='flex flex-col space-y-2 sm:flex sm:flex-row items-baseline justify-between mt-10 '>
                {/* <img src={Logo} alt="Logo" className='max-h-9' /> */}
                <h1 className='font-bold text-2xl'>J2C</h1>
                <h1 className='text-sm'>© 2024 J2C Business, Inc.</h1>
            </div>

        </div>
    )
}

export default Footer