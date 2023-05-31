import PortalTablePagination from 'components/Global/Elements/Portal/PortalTablePagination/PortalTablePagination'
import React, { useState } from 'react'
import styles from './Users.module.css'
import user1Src from 'assets/imgs/user1.jpg'
import user2Src from 'assets/imgs/user2.jpg'
import user3Src from 'assets/imgs/user3.jpg'
import user4Src from 'assets/imgs/user4.jpg'
import UserTableHeader from 'components/Global/Elements/Portal/User/UserTableHeader/UserTableHeader'
import { Link } from 'react-router-dom'
import PortalUserTable from 'components/Global/Elements/Portal/User/PortalUserTable/PortalUserTable'

function Users() {
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
            user_group:'Group 1',
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
        {
            id:6,
            user_img:user4Src,
            user_name:'Esthera Jackson',
            user_email:'esthera@simmmple.com',
            user_group:'Group 1',
            status:0 
        },
        {
            id:7,
            user_img:user2Src,
            user_name:'Esthera Jackson',
            user_email:'esthera@simmmple.com',
            user_group:'Group 1',
            status:0 
        },
        {
            id:8,
            user_img:user1Src,
            user_name:'Esthera Jackson',
            user_email:'esthera@simmmple.com',
            user_group:'Group 1',
            status:0 
        },
    ])

  
  return (
    <section>
        <div className={styles['table-cont']}>
            <div className={styles['table__header-wrapper']}>
                <h1 className={styles['table__title']}>Students</h1>
                <UserTableHeader/>
                {/* <AddUserModal/> */}
            </div>
            <PortalUserTable userData={userData}/>
            {/* <PortalExamTable userData={userData}/> */}
            {/* <PortalTablePagination/> */}
        </div>
    </section>
  )
}

export default Users