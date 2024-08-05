import React, { Fragment } from 'react'
import Navbar from '../pages/Navbar'
import Footer from '../pages/Footer'
import Navbar2 from '../pages/Navbar2'
// import { CategoryShow } from '../HomePage/CategoryShow'
import CategoryShow from './../HomePage/CategoryShow';

const Layout = ({ children, searchTerm, setSearchTerm, cartLength, setCartLength, isInstructor, setInstructor }) => {
    return (
        <Fragment>
            <div className='bg-gradient-to-r from-cyan-600 to-sky-900 text-white w-full h-14 flex justify-center items-center '>
                <h1 className='font-bold'>
                    Future-ready skills on your schedule |
                </h1>
                <h1>
                    Learn from PCS Global Pvt Ltd
                </h1>
            </div>
            <header>
                <Navbar

                    searchTerm={searchTerm}
                    setSearchTerm={setSearchTerm}
                    // cartLength={cartLength}
                    // setCartLength={setCartLength}
                    isInstructor={isInstructor}
                    setInstructor={setInstructor}

                />
                <CategoryShow />
                {/* <Navbar2 /> */}
            </header>

            <main>{children}</main>

            <footer>
                <Footer />
            </footer>

        </Fragment>
    )
}

export default Layout


//const SCOPES = 'https://www.googleapis.com/auth/drive.metadata.readonly';
// const DISCOVERY_DOCS = ['https://www.googleapis.com/discovery/v1/apis/drive/v3/rest'];
