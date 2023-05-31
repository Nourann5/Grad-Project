import React, { useState } from 'react'
import AddEditUserModal from '../AddEditUserModal/AddEditUserModal';
import {ReactComponent as AddIcon} from 'assets/icons/addIcon.svg'
import styles from './UserTableHeader.module.css'
function UserTableHeader() {
    const [showAddUser, setShowAddUser] = useState(false);

    const handleCloseAddUser = () => setShowAddUser(false);
    const handleShowAddUser = () => setShowAddUser(true);
  return (
    // <div className={styles['table__header-wrapper']}>
    <>
        {/* <h1 className={styles['table__title']}>Students</h1> */}
        <button className={styles['table__add-button']} onClick={handleShowAddUser}>
            <AddIcon className={styles['table__add-icon']}/>Add Student
        </button>
        <AddEditUserModal showAddUser={showAddUser} handleCloseAddUser={handleCloseAddUser}/>
    </>
    // </div>
  )
}

export default UserTableHeader