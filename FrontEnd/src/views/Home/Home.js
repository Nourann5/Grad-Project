import React, { useEffect, useState } from 'react'
import PageBreadCrumb from 'components/Global/Layout/PageBreadCrumb/PageBreadCrumb'
import HomeHeader from 'components/Home/HomeHeader/HomeHeader'
import Courses from 'components/Home/Courses/Courses'
import GetStarted from 'components/Home/GetStarted/GetStarted'
import VideoSection from 'components/Home/VideoSection/VideoSection'
import Footer from 'components/Global/Layout/Footer/Footer'
import FAQs from 'components/Home/FAQs/FAQs'
import WordsFromStudents from 'components/Home/WordsFromStudents/WordsFromStudents'
import { axiosConfig } from 'utils/axiosConfig'
import Teachers from 'components/Home/Teachers/Teachers'
import Cookies from 'js-cookie'

function Home() {
  const [teachers ,setTeachers]=useState([])
  let getTeachers =()=>{
    axiosConfig.get(`user/all-teachers`,{
        headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
    }).then(res=>{
      setTeachers(res.data.data)
    }).catch(err=>{
        
    })
  }
  useEffect(()=>{
    getTeachers()
  },[])
  return (
    <>
      {/* <PageBreadCrumb/> */}
      <HomeHeader/>
      <Teachers teachersData={teachers}/>
      {/* <Courses/> */}

      <GetStarted/>
      <VideoSection/>
      <WordsFromStudents/>
      <FAQs/>
      <Footer/>
    </>
  )
}

export default Home