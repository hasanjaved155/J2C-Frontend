import React, { useEffect, useState } from 'react'
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { Toaster } from "react-hot-toast";
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
import ProtectedCourse from './Components/ProtectedCourse';
import Checkout from './Cart/Checkout';
import CourseMiddlePage from './middlePage/CourseMiddlePage';
import J2CInstructor from './Instructor/J2CInstructor';
import Home from './pages/Home';
import InstructorCreateCourse from './Instructor/InstructorCreateCourse';
import MyCourse from './UserMyCourse/MyCourse';
import { useTranslation } from 'react-i18next';
import i18n from './Language/i18n';



// axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.baseURL = "https://j2-c-backend.vercel.app/";
axios.defaults.withCredentials = true;


const App = () => {
  const [playlist, setPlaylist] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [isInstructor, setInstructor] = useState(false);
  const [item, setItem] = useState("");
  const [rie, setRie] = useState(0);

  const { t } = useTranslation()

  useEffect(() => {
    document.body.dir = i18n.dir()
  }, [i18n, i18n.language])



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


  return (
    <div className='App'>
      <BrowserRouter>
        <Toaster />
        <Layout

          searchTerm={searchTerm}
          setSearchTerm={setSearchTerm}

        // isInstructor={isInstructor}
        // setInstructor={setInstructor}


        >
          <Routes>
            <Route path='/' element={
              <Home

                // setCartLength={setCartLength}
                // setInstructor={setInstructor}
                setItem={setItem}
              />
            }
            />

            <Route element={<ProtectedCourse />}>
              {playlist?.map((a) => {
                return (
                  <Route
                    path={a.path}
                    element={<CourseDetails
                      listobject={a}
                      setRie={setRie}

                    //  setRie={setRie} 

                    />}
                  />
                );
              })}
            </Route>

            <Route
              path="/drop-dashboard"
              element={<DropDashboard

                setItem={setItem}

              />}
            />
            <Route path='/dashboard' element={<Dashboard searchTerm={searchTerm} setItem={setItem} rie={rie} />} />

            <Route path='/description' element={<CourseMiddlePage
              item={item}
              setSearchTerm={setSearchTerm}

            />} />
            <Route element={<ProtectedAdmin />}>
              <Route path="/admin" element={<AdminDashboard />} />
            </Route>
            <Route path="/cart" element={<CartPage />} />
            <Route path='/checkout' element={<Checkout />} />
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login
            //  setInstructor={setInstructor} 

            />} />
            <Route path='/create' element={<CreateCourse />} />
            <Route path="/help" element={<Help />} />


            <Route path="/teach" element={<J2CInstructor
            // isInstructor={isInstructor}
            // setInstructor={setInstructor}
            />} />

            <Route element={<ProtectedInstructor />}>
              <Route path="/teachins" element={<Instructor
              // isInstructor={isInstructor}
              // setInstructor={setInstructor}

              />} />
              <Route path="/instructor_course" element={<InstructorCreateCourse />} />

            </Route>

            {/* user course */}
            <Route path='/myCourse' element={<MyCourse setItem={setItem} />} />
            <Route path="/thankyou" element={<Thankyou />} />
          </Routes>
        </Layout>
      </BrowserRouter>

    </div>
  )
}

export default App
