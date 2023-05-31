import React, { useEffect, useState } from 'react'
import styles from './Categories.module.css'

import PortalTablePagination from 'components/Global/Elements/Portal/PortalTablePagination/PortalTablePagination'
import { useDispatch, useSelector } from 'react-redux'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import CategoriesTableHeader from 'components/Global/Elements/Portal/Categories/CategoriesTableHeader/CategoriesTableHeader'
import PortalCategoryTable from 'components/Global/Elements/Portal/Categories/PortalCategoryTable/PortalCategoryTable'
import Cookies from 'js-cookie'
import { saveCategories } from 'store/Login/LoginActions'
function CategoriesPortal() {
    const user = useSelector(state=>state.LoginReducer.user)
    const dispatch = useDispatch()
    const [tableData ,setTableData] =useState([])
    let getData =(data)=>{
        // setIsLoadingData(true)
        console.log('useruseruser',user)
        // axiosConfig.get(`exams?user_id=${user.id}`).then(res=>{
        axiosConfig.get(`category/all-user-categories?user_id=${user?.id}`,{
            headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
        }).then(res=>{
            console.log('res.data.data',res.data)
            // setIsLoadingData(false)
            // setCategories(res.data.data)
            setTableData(res.data.data)
            dispatch(saveCategories(res.data.data))
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
                <h1 className={styles['table__title']}>Categories</h1>
                <CategoriesTableHeader getData={getData}/>
            </div>
            
            <PortalCategoryTable tableData={tableData} getData={getData}/>
            {/* <PortalTablePagination/> */}
        </div>
    </section>
  )
}

export default CategoriesPortal