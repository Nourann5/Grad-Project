import React, { useEffect, useState } from 'react'
import styles from './Sections.module.css'

import { useParams } from 'react-router-dom'
import PortalTablePagination from 'components/Global/Elements/Portal/PortalTablePagination/PortalTablePagination'
import PortalSectionsTable from 'components/Global/Elements/Portal/Sections/PortalSectionsTable/PortalSectionsTable'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import SectionTableHeader from 'components/Global/Elements/Portal/Sections/SectionTableHeader/SectionTableHeader'
import Cookies from 'js-cookie'
function Sections() {
    // const [userData ,setUserData] =useState([
    //     {
    //         id:1,
    //         user_img:user1Src,
    //         user_name:'Esthera Jackson',
    //         user_email:'esthera@simmmple.com',
    //         user_group:'Group 1',
    //         status:0 
    //     },
    //     {
    //         id:2,
    //         user_img:user2Src,
    //         user_name:'Esthera Jackson',
    //         user_email:'esthera@simmmple.com',
    //         user_group:'Group 1',
    //         status:0 
    //     },
    //     {
    //         id:3,
    //         user_img:user3Src,
    //         user_name:'Esthera Jackson',
    //         user_email:'esthera@simmmple.com',
    //         user_group:'Group 1',
    //         status:0 
    //     },
    //     {
    //         id:4,
    //         user_img:user4Src,
    //         user_name:'Esthera Jackson',
    //         user_email:'esthera@simmmple.com',
    //         user_group:'Group 1',
    //         status:0 
    //     },
    //     {
    //         id:5,
    //         user_img:user2Src,
    //         user_name:'Esthera Jackson',
    //         user_email:'esthera@simmmple.com',
    //         user_group:'Group 1',
    //         status:0 
    //     },
    //     {
    //         id:6,
    //         user_img:user4Src,
    //         user_name:'Esthera Jackson',
    //         user_email:'esthera@simmmple.com',
    //         user_group:'Group 1',
    //         status:0 
    //     },
    //     {
    //         id:7,
    //         user_img:user2Src,
    //         user_name:'Esthera Jackson',
    //         user_email:'esthera@simmmple.com',
    //         user_group:'Group 1',
    //         status:0 
    //     },
    //     {
    //         id:8,
    //         user_img:user1Src,
    //         user_name:'Esthera Jackson',
    //         user_email:'esthera@simmmple.com',
    //         user_group:'Group 1',
    //         status:0 
    //     },
    // ])
    const params = useParams()
    const [sectionsData ,setSectionsData] =useState([])
    let getData =(data)=>{
        // setIsLoadingData(true)
        // console.log('useruseruser',user)
        axiosConfig.get(`exams/all-exam-sections/${params.id}`,{
            headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
        }).then(res=>{
            console.log('res.data.data',res.data)
            // setIsLoadingData(false)
            // setCategories(res.data.data)
            setSectionsData(res.data.data)
        }).catch(err=>{
            // setIsLoadingData(false)
            let errors = err.response.data.errors
            Object.keys(errors).forEach(error=>{
            toast.error(errors[error][0])
            })
        })
    }
    useEffect(()=>{
        console.log('rerender')
        // setCategories([])
        getData()
    },[])
  
  return (
    <section>
        <div className={styles['table-cont']}>
            <div className={styles['table__header-wrapper']}>
                <h1 className={styles['table__title']}>Sections</h1>
                <SectionTableHeader getData={getData}/>
                {/* <Link to='/portal/students' className={styles['table__add-button']}>Show All</Link> */}
            </div>
            
            <PortalSectionsTable sectionsData={sectionsData} getData={getData}/>
            {/* <PortalTablePagination/> */}
        </div>
    </section>
  )
}

export default Sections