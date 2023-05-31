import { useEffect, useState } from 'react';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css'
import 'react-toastify/dist/ReactToastify.css';
import "react-datepicker/dist/react-datepicker.css";
import About from "views/About";
import Home from "views/Home/Home";
import NavBar from 'components/Global/Layout/NavBar/NavBar';
import Categories from 'views/Categories/Categories';
import SideBar from 'components/Global/Layout/SideBar/SideBar';
import AllExams from 'views/ExamsPage/ExamsPage';
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
import AnimatedRoutes from 'AnimatedRoutes';


function App() {
  return (
    <BrowserRouter>
      <AnimatedRoutes/>
    </BrowserRouter>
  );
}

export default App;
