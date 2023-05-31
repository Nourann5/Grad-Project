import React, { useEffect, useState } from 'react'
import styles from './Exams.module.css'

import PortalTablePagination from 'components/Global/Elements/Portal/PortalTablePagination/PortalTablePagination'
import PortalExamTable from 'components/Global/Elements/Portal/Exams/PortalExamTable/PortalExamTable'
import ExamTableHeader from 'components/Global/Elements/Portal/Exams/ExamTableHeader/ExamTableHeader'
import { useDispatch, useSelector } from 'react-redux'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'
import { saveCategories } from 'store/Login/LoginActions'
function Exams() {
    const user = useSelector(state=>state.LoginReducer.user)
        const dispatch = useDispatch()
    // const [userData ,setExamData] =useState([
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
    const [examData ,setExamData] =useState([])
    let getData =(data)=>{
        // setIsLoadingData(true)
        console.log('useruseruser',user)
        axiosConfig.get(`exams/all-exams?user_id=${user.id}`,{
            headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
        }).then(res=>{
            console.log('res.data.data',res.data)
            // setIsLoadingData(false)
            // setCategories(res.data.data)
            setExamData(res.data.data)
        }).catch(err=>{
            // setIsLoadingData(false)
            let errors = err.response.data.errors
            Object.keys(errors).forEach(error=>{
            toast.error(errors[error][0])
            })
        })
    }
    let getCategories =(data)=>{
        axiosConfig.get(`category/all-user-categories?user_id=${user?.id}`,{
            headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
        }).then(res=>{
            dispatch(saveCategories(res.data.data))
        }).catch(err=>{
            
        })
    }
    useEffect(()=>{
        // setCategories([])
        getData()
        getCategories()
    },[])

  return (
    <section>
        <div className={styles['table-cont']}>
            {/* <UserTableHeader/> */}
            <div className={styles['table__header-wrapper']}>
                <h1 className={styles['table__title']}>Exams</h1>
                <ExamTableHeader getData={getData}/>
                {/* <Link to='/portal/students' className={styles['table__add-button']}>Show All</Link> */}
            </div>
            
            <PortalExamTable examData={examData} getData={getData}/>
            {/* <PortalTablePagination/> */}
        </div>
    </section>
  )
}

export default Exams