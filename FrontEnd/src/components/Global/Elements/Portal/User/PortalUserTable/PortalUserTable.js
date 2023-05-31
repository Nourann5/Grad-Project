import React, { useState } from 'react'
import styles from './PortalUserTable.module.css'
import {ReactComponent as EditIcon} from 'assets/icons/editIcon.svg'
import {ReactComponent as DeleteIcon} from 'assets/icons/delete.svg'
import AddEditUserModal from '../AddEditUserModal/AddEditUserModal'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'

function PortalUserTable({userData}) {
    const [showAddUser, setShowAddUser] = useState(false);
    const [user,setuser] =useState([])

    const handleCloseAddUser = () => {
        setShowAddUser(false)
        setuser([])
    };
    const handleShowAddUser = (user) => {
        setShowAddUser(true)
        setuser(user)
    };
    let deleteUser =(userId)=>{
        axiosConfig.post('',{id:userId}).then(res=>{
            toast.success('Student deleted successfully')
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
                    <th scope="col">Students</th>
                    <th scope="col">Group</th>
                    <th scope="col">Status</th>
                    <th scope="col">Update Status</th>
                    <th scope="col">Actions</th>
                </tr>
            </thead>
            <tbody>
                {
                    userData&&userData.map(user=>(
                        <tr key={user.id+user.user_name+user.user_email}>
                            <th scope="row">{user.id}</th>
                            <td>
                                <div className={styles['table__user-img-wrapper']}>
                                    <img src={user.user_img} className={styles['table__user-img']}/>
                                    <div>
                                        <p className={styles['table__user-name']}>{user.user_name}</p>
                                        <p className={styles['table__user-email']}>{user.user_email}</p>
                                    </div>
                                </div>
                            </td>
                            <td>
                                <div className={styles['table__user-group']}>{user.user_group}</div>
                            </td>
                            <td>
                                {
                                    <>
                                        <p className={`${styles['table__user-status']} ${user?.status ==0?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--new']}`}></span>
                                            <span className={styles['table__user-status-value']}>New</span>
                                        </p>
                                        <p className={`${styles['table__user-status']} ${user?.status ==1?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--active']}`}></span>
                                            <span className={styles['table__user-status-value']}>Active</span>
                                        </p>
                                        <p className={`${styles['table__user-status']} ${user?.status ==2?'':'d-none'}`}>
                                            <span className={`${styles['table__user-status-color']} ${styles['table__user-status-color--blocked']}`}></span>
                                            <span className={styles['table__user-status-value']}>Blocked</span>
                                        </p>
                                    </>
                                }
                            </td>
                            <td>
                                <div className={styles['table__user-status-cont']}>
                                    <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--active']} ${user?.status !=1?'':'d-none'}`}>Active</button>

                                    <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--blocked']} ${user?.status ==1?'':'d-none'}`}>Blocked</button>

                                    {/* <button className={`${styles['table__user-status-buttons']} 
                                    ${styles['table__user-status-buttons--not-active']} ${user?.status ==0?'':'d-none'}`}>Not Active Yet</button> */}
                                </div>
                            </td>
                            <td>
                                <div className={styles['table__user-action-cont']}>
                                    <button className={styles['table__user-action-button']} onClick={()=>{handleShowAddUser(user)}}>
                                        <EditIcon className={`${styles['table__user-action-icon']} ${styles['table__user-action-icon--edit']}`}/>
                                    </button>
                                    <button className={styles['table__user-action-button']} onClick={()=>{deleteUser(user.id)}}>
                                        <DeleteIcon className={`${styles['table__user-action-icon']} ${styles['table__user-action-icon--delete']}`}/>
                                    </button>
                                </div>
                            </td>
                        </tr>
                    ))
                }
            </tbody>
        </table>
        <AddEditUserModal showAddUser={showAddUser} handleCloseAddUser={handleCloseAddUser} user={user}/>
    </div>
    </>
  )
}

export default PortalUserTable