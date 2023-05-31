import TotalValues from 'components/Portal/Overview/TotalValues/TotalValues'
import React, { useState } from 'react'
import user1Src from 'assets/imgs/user1.jpg'
import user2Src from 'assets/imgs/user2.jpg'
import user3Src from 'assets/imgs/user3.jpg'
import user4Src from 'assets/imgs/user4.jpg'
import styles from './Overview.module.css'
import { Col, Row } from 'react-bootstrap'
import WelcomeUser from 'components/Portal/Overview/WelcomeUser/WelcomeUser'
import ReportsInfo from 'components/Portal/Overview/ReportsInfo/ReportsInfo'
import QuickAccess from 'components/Portal/Overview/QuickAccess/QuickAccess'
import { Link } from 'react-router-dom'
import PortalUserTable from 'components/Global/Elements/Portal/User/PortalUserTable/PortalUserTable'
function Overview() {
  const [userData ,setUserData] =useState([
    {
        id:1,
        user_img:user1Src,
        user_name:'Esthera Jackson',
        user_email:'esthera@simmmple.com',
        user_group:'Group 1',
        status:0 
    },
    {
        id:2,
        user_img:user2Src,
        user_name:'Esthera Jackson',
        user_email:'esthera@simmmple.com',
        user_group:'Group 1',
        status:0 
    },
    {
        id:3,
        user_img:user3Src,
        user_name:'Esthera Jackson',
        user_email:'esthera@simmmple.com',
        user_group:'Group 1',
        status:0 
    },
    {
        id:4,
        user_img:user4Src,
        user_name:'Esthera Jackson',
        user_email:'esthera@simmmple.com',
        user_group:' بدع العشا سبت وتلات الساعة 10 الصبح',
        status:0 
    },
    {
        id:5,
        user_img:user2Src,
        user_name:'Esthera Jackson',
        user_email:'esthera@simmmple.com',
        user_group:'Group 1',
        status:0 
    },
   
])
  return (
    <>
        <WelcomeUser/>
        <TotalValues/>
        <QuickAccess/>
        <Row>
          <Col lg='9'>
            <div className={styles['table-cont']}>
            <div className={styles['table__header-wrapper']}>
                <h1 className={styles['table__title']}>Students</h1>
                <Link to='/portal/students' className={styles['table__add-button']}>Show All</Link>
            </div>
              <PortalUserTable userData={userData}/>
            </div>
          </Col>
          <Col>
          
          </Col>
        </Row>
        <ReportsInfo/>

    </>
  )
}

export default Overview