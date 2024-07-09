import React, { useEffect, useState } from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import ListName from './Components/ListName';
import Home from './pages/Home';
import Layout from './Layout/Layout';
import axios from 'axios';
import Register from './pages/auth/Register';
import Login from './pages/auth/Login';
import CreateCourse from './adminDashboard/CreateCourse';
import CourseDetails from './Components/CourseDetails';
import Dashboard from './adminDashboard/Dashboard';
import ProtectedAdmin from './protectedAdmin/ProtectedAdmin';
import AdminDashboard from './adminDashboard/AdminDashboard';
import DropDashboard from './dropdown/DropDashboard';
import CartPage from './Cart/CartPage';
import Help from './help/Help';
import ProtectedInstructor from './Instructor/ProtectedInstructor';
import Instructor from './Instructor/Instructor';
import Thankyou from './Instructor/Thankyou';
import DummyHome from './pages/DummyHome';
import CourseDescription from './adminDashboard/CourseDescription';
import ProtectedCourse from './Components/ProtectedCourse';
import Checkout from './Cart/Checkout';
import CourseMiddlePage from './middlePage/CourseMiddlePage';
// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://j2c-backend.onrender.com";
axios.defaults.withCredentials = true;


const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [displaydown, setDropdown] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [cartLength, setCartLength] = useState(0);
  const [isInstructor, setInstructor] = useState(false);
  const [item, setItem] = useState("");
  const [rie, setRie] = useState(0);

  const user = JSON.parse(localStorage.getItem('user'));

  const fetchPlaylist = async () => {
    try {
      const res = await axios.get("/course/allCourse");
      setPlaylist(res?.data?.playlist);
    } catch (err) {
      console.error(`Failed to fetch dashboards: ${err}`);
    }
  };

  useEffect(() => {
    fetchPlaylist();
  }, []);

  const fetchCartDetails = async () => {
    try {
      const res = await axios.get(`/cart/get-cart/${user._id}`);
      setCartLength(res?.data?.cart?.length)
    } catch (err) {
      console.error(`Failed to fetch cart details: ${err}`);
    }
  };

  useEffect(() => {

    fetchCartDetails();

  }, []);
  return (
    <div className='App'>
      <BrowserRouter>
        <Toaster />
        <Layout
          setDropdown={setDropdown}
          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}
          cartLength={cartLength}
          setCartLength={setCartLength}
          isInstructor={isInstructor}
          setInstructor={setInstructor}

        >
          <Routes>
            <Route path='/' element={
              <DummyHome
                setDropdown={setDropdown}
                setCartLength={setCartLength}
                setInstructor={setInstructor}
              />
            }
            />

            <Route element={<ProtectedCourse />}>
              {playlist?.map((a) => {
                return (
                  <Route
                    path={a.path}
                    element={<CourseDetails listobject={a} setRie={setRie}
                    //  setRie={setRie} 

                    />}
                  />
                );
              })}
            </Route>

            <Route
              path="/drop-dashboard"
              element={<DropDashboard
                displaydown={displaydown}
                cartLength={cartLength}
                setCartLength={setCartLength}
                setItem={setItem}

              />}
            />
            <Route path='/dashboard' element={<Dashboard searchTerm={searchTerm} setItem={setItem} rie={rie} />} />
            {/* <Route path="/description" element={<CourseDescription item={item} setSearchTerm={setSearchTerm} />} /> */}
            <Route path='/description' element={<CourseMiddlePage />} />
            <Route element={<ProtectedAdmin />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route path="/cart" element={<CartPage setCartLength={setCartLength} />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login setInstructor={setInstructor} />} />
            <Route path='/create' element={<CreateCourse />} />
            <Route path="/help" element={<Help />} />

            <Route element={<ProtectedInstructor />}>
              <Route path="/teach" element={<Instructor
                isInstructor={isInstructor}
                setInstructor={setInstructor} />} />
            </Route>
            <Route path="/thankyou" element={<Thankyou />} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </div>
  )
}

export default App
