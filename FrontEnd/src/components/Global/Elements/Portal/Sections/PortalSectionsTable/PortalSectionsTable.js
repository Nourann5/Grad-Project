import React, { useState } from 'react'
import styles from './PortalSectionsTable.module.css'
import user1Src from 'assets/imgs/user1.jpg'
import user2Src from 'assets/imgs/user2.jpg'
import user3Src from 'assets/imgs/user3.jpg'
import user4Src from 'assets/imgs/user4.jpg'

import {ReactComponent as EditIcon} from 'assets/icons/editIcon.svg'
import {ReactComponent as DeleteIcon} from 'assets/icons/delete.svg'
import {ReactComponent as FileIcon} from 'assets/icons/fileIcon.svg'
import { Link } from 'react-router-dom'
import AddEditSectionModal from '../AddEditSectionModal/AddEditSectionModal'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import Cookies from 'js-cookie'

function PortalSectionsTable({sectionsData,getData}) {
    const [showAddSection, setShowAddSection] = useState(false);
    const [section,setSection] =useState([])

    const handleCloseAddSection = () => {
        setShowAddSection(false)
        setSection([])
    };
    const handleShowAddSection = (section) => {
        setShowAddSection(true)
        setSection(section)
    };
    let deleteSection =(sectionId)=>{
        axiosConfig.delete(`exams/delete-exam/${sectionId}`,{
            headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
        }).then(res=>{
            toast.success('Section deleted successfully')
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
                    <th scope="col">Section Name</th>
                    {/* <th scope="col">Taken No</th> */}
                    {/* <th scope="col">Available For</th> */}
                    <th scope="col">Questions</th>
                    <th scope="col">Status</th>
                    {/* <th scope="col">Update Status</th> */}
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    sectionsData&&sectionsData.map(section=>(
                        <tr>
                            <th scope="row">{section.item_number}</th>
                            <td>
                                <div className={styles['table__user-img-wrapper']}>
                                    {/* <img src={user.user_img} className={styles['table__user-img']}/> */}
                                    <FileIcon className={styles['table__user-file-icon']}/>
                                    <div>
                                        <p className={styles['table__user-name']}>{section.name}</p>
                                        {/* <p className={styles['table__user-email']}>{section.user_email}</p> */}
                                    </div>
                                </div>
                            </td>
                            {/* <td>
                                <div className={styles['table__user-group']}>{section.user_group}</div>
                            </td> */}
                            {/* <td>
                                <div className={styles['table__user-group']}>All</div>
                            </td> */}
                            <td>
                                <div className={styles['table__user-status-cont']}>
                                    <Link to={`/portal/add-test/${section.id}`} className={`${styles['table__user-add-section-buttons']}`}>Add Questions</Link>
                                </div>
                            </td>
                            <td>
                                {
                                    <>
                                        {/* <p className={`${styles['table__user-status']} ${section?.active ==0?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--new']}`}></span>
                                            <span className={styles['table__user-status-value']}>New</span>
                                        </p> */}
                                        <p className={`${styles['table__user-status']} ${section?.status !=2?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--active']}`}></span>
                                            <span className={styles['table__user-status-value']}>Active</span>
                                        </p>
                                        <p className={`${styles['table__user-status']} ${section?.status ==2?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--blocked']}`}></span>
                                            <span className={styles['table__user-status-value']}>Not Active</span>
                                        </p>
                                    </>
                                }
                            </td>
                            {/* <td>
                                <div className={styles['table__user-status-cont']}>
                                    <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--active']} ${section?.active ==2?'':'d-none'}`}>Active</button>

                                    <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--blocked']} ${section?.active !=2?'':'d-none'}`}>Blocked</button>

                                    <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--not-active']} ${user?.active ==0?'':'d-none'}`}>Not Active Yet</button>
                                </div>
                            </td> */}
                            <td>
                                <div className={styles['table__user-action-cont']}>
                                    <button className={styles['table__user-action-button']} onClick={()=>{handleShowAddSection(section)}}>
                                        <EditIcon className={`${styles['table__user-action-icon']} ${styles['table__user-action-icon--edit']}`}/>
                                    </button>
                                    <button className={styles['table__user-action-button']} onClick={()=>{deleteSection(section.id)}}>
                                        <DeleteIcon className={`${styles['table__user-action-icon']} ${styles['table__user-action-icon--delete']}`}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <AddEditSectionModal showAddSection={showAddSection} handleCloseAddSection={handleCloseAddSection} section={section} getData={getData}/>

    </div>
    </>
  )
}

export default PortalSectionsTable