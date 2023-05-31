import React,{ useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes, useLocation } from 'react-router-dom';
import About from "views/About";
import Home from "views/Home/Home";
import NavBar from 'components/Global/Layout/NavBar/NavBar';
import Categories from 'views/Categories/Categories';
import SideBar from 'components/Global/Layout/SideBar/SideBar';
import ExamsPage from 'views/ExamsPage/ExamsPage';
import AllTests from 'views/AllTests';
import Login from 'views/Login/Login';
import Forget from 'views/Forget/Forget';
// import RegisterSecond from 'views/Register/RegisterSecond';
import Tests from 'views/Tests/Tests';
import AddTest from 'views/PortalPages/AddTest/AddTest';
import PreviewAddTest from 'views/PortalPages/PreviewAddTest/PreviewAddTest';
import Portal from 'views/Portal/Portal';
import Overview from 'views/PortalPages/Overview/Overview';
import Exams from 'views/PortalPages/Exams/Exams';
import Users from 'views/PortalPages/Users/Users';
import Sections from 'views/PortalPages/Sections/Sections';
import { ToastContainer } from 'react-toastify';
import TestResult from 'views/TestResult/TestResult';
import Authed from 'utils/Authed';
import NotAuthed from 'utils/NotAuthed';
import Register from 'views/Register/Register';
import CategoriesPortal from 'views/PortalPages/Categories/Categories';
function AnimatedRoutes() {
    const [isSideBarVisible , setIsSideBarVisible] =useState(false)
    const location = useLocation()
    let toggleSideNavBar =(type)=>[
        setIsSideBarVisible(type==='open')
        ]
        const [isMainNavBarWillApear,setIsMainNavBarWillApear] =useState(false)
        const pagesWithoutNavbar = ['register','register-second','login','forget','test','add-test','preview-add-test','portal']
    
        useEffect(()=>{
            setIsMainNavBarWillApear(! location.pathname.split('/').some(path=>pagesWithoutNavbar.includes(path)) )
        },[location])
  return (
    <>
         {
            isMainNavBarWillApear &&
            <>
            <NavBar toggleSideNavBar={()=>{toggleSideNavBar('open')}}/>
            <SideBar isSideBarVisible={isSideBarVisible}  toggleSideNavBar={()=>{toggleSideNavBar('close')}}/>
            </>
        }
            <div className="App">
            <ToastContainer />
            <Routes>
                <Route path='/' element={<Home/>}></Route>
                <Route path='/about' element={<About/>}></Route>
                <Route path='/categories' element={<Categories/>}></Route>
                <Route path='/categories/:id' element={<Categories/>}></Route>
                <Route path='/exams/:id' element={<ExamsPage/>}></Route>
                <Route path='/all-tests' element={<AllTests/>}></Route>
                <Route path='/login' element={<NotAuthed><Login/></NotAuthed>}></Route>
                <Route path='/register' element={<NotAuthed><Register/></NotAuthed>}></Route>
                {/* <Route path='/register-second' element={<NotAuthed><RegisterSecond/></NotAuthed>}></Route> */}
                <Route path='/forget' element={<NotAuthed><Forget/></NotAuthed>}></Route>
                <Route path='/test/:id' element={<Tests/>}></Route>
                <Route path='/test-result' element={<TestResult/>}></Route>
                <Route path='/portal' element={<Portal/>}>
                    <Route path='' element={<Overview/>}/>
                    <Route path='students' element={<Users/>}/>
                    <Route path='exams' element={<Exams/>}/>
                    <Route path='exams/:id' element={<Sections/>}/>
                    <Route path='categories' element={<CategoriesPortal/>}/>
                    <Route path='add-test/:id' element={<AddTest/>}></Route>
                    <Route path='preview-add-test' element={<PreviewAddTest/>}></Route>
                </Route>
            </Routes>
            </div>
    </>
  )
}

export default AnimatedRoutes