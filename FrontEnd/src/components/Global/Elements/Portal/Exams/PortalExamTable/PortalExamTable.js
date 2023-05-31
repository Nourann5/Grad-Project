import React, { useState } from 'react'
import styles from './PortalExamTable.module.css'
import user1Src from 'assets/imgs/user1.jpg'
import user2Src from 'assets/imgs/user2.jpg'
import user3Src from 'assets/imgs/user3.jpg'
import user4Src from 'assets/imgs/user4.jpg'

import {ReactComponent as EditIcon} from 'assets/icons/editIcon.svg'
import {ReactComponent as DeleteIcon} from 'assets/icons/delete.svg'
import {ReactComponent as FileIcon} from 'assets/icons/fileIcon.svg'
import { Link, useParams } from 'react-router-dom'
import AddEditExamModal from '../AddEditExamModal/AddEditExamModal'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

function PortalExamTable({examData, getData}) {
    const params = useParams()
    const [showAddExam, setShowAddExam] = useState(false);
    const [exam,setExam] =useState([])

    const handleCloseAddExam = () => {
        setShowAddExam(false)
        setExam([])
    };
    const handleShowAddExam = (exam) => {
        setShowAddExam(true)
        setExam(exam)
    };
    let deleteExam =(examId)=>{
        axiosConfig.delete(`exams/delete-exam/${examId}`,{
            headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
        }).then(res=>{
            toast.success('Exam deleted successfully')
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
                    <th scope="col">Exam Name</th>
                    <th scope="col">Year - Month</th>
                    <th scope="col">Have Sections</th>
                    {/* <th scope="col">Available For</th> */}
                    <th scope="col">Sections</th>
                    <th scope="col">Status</th>
                    <th scope="col">Update Status</th>
                    <th scope="col">Actions</th>
                    {/* <th scope="col">Created At</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    examData&&examData.map(exam=>(
                        <tr>
                            <th scope="row">{exam?.item_number}</th>
                            <td>
                                <div className={styles['table__user-img-wrapper']}>
                                    {/* <img src={exam.user_img} className={styles['table__user-img']}/> */}
                                    <FileIcon className={styles['table__user-file-icon']}/>
                                    <div>
                                        <p className={styles['table__user-name']}>{exam.name}</p>
                                        <p className={styles['table__user-email']}>{exam.email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className={styles['table__user-group']}>{exam.year} - {exam.month}</div>
                            </td>
                            <td>
                                <div className={styles['table__user-group']}>
                                    {
                                        exam.has_sections==1?'Have Section'
                                        :'Does\'nt Have Sections'
                                    }
                                </div>
                            </td>
                            {/* <td>
                                <div className={styles['table__user-group']}>All</div>
                            </td> */}
                            <td>
                                {
                                    exam.has_sections==1&&
                                    <div className={styles['table__user-status-cont']}>
                                        <Link to={`/portal/exams/${exam.id}`} className={`${styles['table__user-add-section-buttons']}`}>Add Sections</Link>
                                    </div>
                                }
                                {
                                    exam.has_sections==2&&
                                    <div className={styles['table__user-status-cont']}>
                                        <Link to={`/portal/add-test/${exam.id}`} className={`${styles['table__user-add-section-buttons']}`}>Add Questions</Link>
                                    </div>
                                }
                            </td>
                            <td>
                                {
                                    <>
                                        {/* <p className={`${styles['table__user-status']} ${exam?.status ==1?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--new']}`}></span>
                                            <span className={styles['table__user-status-value']}>New</span>
                                        </p> */}
                                        <p className={`${styles['table__user-status']} ${exam?.status !=2?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--active']}`}></span>
                                            <span className={styles['table__user-status-value']}>Active</span>
                                        </p>
                                        <p className={`${styles['table__user-status']} ${exam?.status ==2?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--blocked']}`}></span>
                                            <span className={styles['table__user-status-value']}>Blocked</span>
                                        </p>
                                    </>
                                }
                            </td>
                            <td>
                                <div className={styles['table__user-status-cont']}>
                                    <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--active']} ${exam?.status ==2?'':'d-none'}`}>Active</button>

                                    <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--blocked']} ${exam?.status !=2?'':'d-none'}`}>Blocked</button>

                                    {/* <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--not-active']} ${exam?.status ==0?'':'d-none'}`}>Not Active Yet</button> */}
                                </div>
                            </td>
                            <td>
                                <div className={styles['table__user-action-cont']}>
                                    <button className={styles['table__user-action-button']} onClick={()=>{handleShowAddExam(exam)}}>
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
        <AddEditExamModal showAddExam={showAddExam} handleCloseAddExam={handleCloseAddExam} exam={exam} getData={getData}/>
    </div>
    </>
  )
}

export default PortalExamTable