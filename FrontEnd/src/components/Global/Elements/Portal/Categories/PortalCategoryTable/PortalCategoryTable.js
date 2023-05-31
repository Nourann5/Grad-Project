import React, { useState } from 'react'
import styles from './PortalCategoryTable.module.css'

import {ReactComponent as EditIcon} from 'assets/icons/editIcon.svg'
import {ReactComponent as DeleteIcon} from 'assets/icons/delete.svg'
import {ReactComponent as FileIcon} from 'assets/icons/fileIcon.svg'
import { Link, useParams } from 'react-router-dom'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import AddEditExamModal from '../../Exams/AddEditExamModal/AddEditExamModal'
import AddEditCategoryModal from '../AddEditCategoryModal/AddEditCategoryModal'
import Cookies from 'js-cookie'

function PortalCategoryTable({tableData, getData}) {
    const params = useParams()
    const [showAddCategory, setShowAddCategory] = useState(false);
    const [category,setCategory] =useState([])

    const handleCloseAddCategory = () => {
        setShowAddCategory(false)
        setCategory([])
    };
    const handleShowAddCategory = (category) => {
        setShowAddCategory(true)
        setCategory(category)
    };
    let deleteExam =(categoryId)=>{
        axiosConfig.delete(`category/delete-category/${categoryId}`,{
            headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
        }).then(res=>{
            toast.success('Category deleted successfully')
            getData()
        }).catch(err=>{
            toast.error(err?.response?.data?.message||'Something went wrong')
        })
    }
  return (
    <>
    <div className='table-responsive'>
        <table className={`${styles['table']} table`}>
            <thead>
                <tr>
                    <th scope="col">Id</th>
                    <th scope="col">Image</th>
                    <th scope="col">Title</th>
                    <th scope="col">Parent Category</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Update Status</th> */}
                    <th scope="col">Actions</th>
                    {/* <th scope="col">Created At</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    tableData&&tableData.map(exam=>(
                        <tr>
                            <th scope="row">{exam?.item_number}</th>
                            <td>
                                <div className={styles['table__user-img-wrapper']}>
                                    <img src={exam?.image} className={styles['table__user-img']}/>
                                    {/* <img src={exam?.image} className={styles['table__user-file-icon']}/> */}
                                    
                                </div>
                            </td>
                            <td>
                                <div className={styles['table__user-group']}>{exam?.title}</div>
                            </td>
                            <td>
                                <div className={styles['table__user-group']}>{exam?.parent_category_title}</div>
                            </td>
                            <td>
                                {
                                    <>
                                        {/* <p className={`${styles['table__user-status']} ${exam?.status ==0?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--new']}`}></span>
                                            <span className={styles['table__user-status-value']}>New</span>
                                        </p> */}
                                        <p className={`${styles['table__user-status']} ${exam?.status !=2?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--active']}`}></span>
                                            <span className={styles['table__user-status-value']}>Active</span>
                                        </p>
                                        <p className={`${styles['table__user-status']} ${exam?.status ==2?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--blocked']}`}></span>
                                            <span className={styles['table__user-status-value']}>Not Active</span>
                                        </p>
                                    </>
                                }
                            </td>
                            {/* <td>
                                <div className={styles['table__user-status-cont']}>
                                    <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--active']} ${exam?.status ==2?'':'d-none'}`}>Active</button>

                                    <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--blocked']} ${exam?.status !=2?'':'d-none'}`}>Not Active</button>

                                    <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--not-active']} ${exam?.status ==0?'':'d-none'}`}>Not Active Yet</button>
                                </div>
                            </td> */}
                            <td>
                                <div className={styles['table__user-action-cont']}>
                                    <button className={styles['table__user-action-button']} onClick={()=>{handleShowAddCategory(exam)}}>
                                        <EditIcon className={`${styles['table__user-action-icon']} ${styles['table__user-action-icon--edit']}`}/>
                                    </button>
                                    
                                    <button className={styles['table__user-action-button']}  onClick={()=>{deleteExam(exam.id)}}>
                                        <DeleteIcon className={`${styles['table__user-action-icon']} ${styles['table__user-action-icon--delete']}`}/>
                                    </button>
                                </div>
                            </td>
                            {/* <td>
                                <div className={styles['table__user-group']}>{exam.created_at}</div>
                            </td> */}
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <AddEditCategoryModal showAddCategory={showAddCategory} handleCloseAddCategory={handleCloseAddCategory} category={category} getData={getData}/>
    </div>
    </>
  )
}

export default PortalCategoryTable