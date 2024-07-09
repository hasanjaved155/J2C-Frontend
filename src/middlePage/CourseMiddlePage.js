import React from 'react'
import HeroSection from './HeroSection'

const CourseMiddlePage = () => {
    return (
        <div className='ml-56 max-w-6xl'>
            <div className="text-md breadcrumbs">
                <ul>
                    <li className="hover:text-blue-400">HOME</li>
                    <li className="hover:text-blue-400">Dashboard</li>
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="0.6" stroke="currentColor" class="w-4 h-4 ml-1.5">
                        <path stroke-linecap="round" stroke-linejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </ul>
                {/* <h1 className="text-4xl flex justify-start mb-3 mt-8">xyz</h1> */}
            </div>
            <div>
                <HeroSection />
            </div>

            <div>
                <h1 className='mt-3 text-start'>
                    Course Content
                </h1>
            </div>
        </div>
    )
}

export default CourseMiddlePage
