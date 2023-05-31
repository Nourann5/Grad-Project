import React, { useState } from 'react'
import styles from './TestResultTable.module.css'


import {ReactComponent as DeleteIcon} from 'assets/icons/delete.svg'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import TestResultTableRow from '../TestResultTableRow/TestResultTableRow'

function TestResultTable({userData}) {
    const [showAddUser, setShowAddUser] = useState(false);

    const handleCloseAddUser = () => {
        setShowAddUser(false)
        setuser([])
        console.log('sdadasasdads')
    };
    const handleShowAddUser = (user) => {
        setShowAddUser(true)
        setuser(user)
        console.log('321321312312')
    };
    let deleteUser =(userId)=>{
        axiosConfig.post('',{id:userId}).then(res=>{
            toast.success('Student deleted successfully')
        }).catch(err=>{
            toast.error(err?.response?.data?.message||'Something went wrong')
        })
    }
    const [user,setuser] =useState([])
  return (
    <>
    <div className='table-responsive'>
        <table className={`${styles['table']} table`}>
            <thead>
                <tr>
                    <th scope="col">#</th>
                    <th scope="col">YourAnswer</th>
                    <th scope="col">Correct Answer</th>
                    <th scope="col" className='text-start'>Status</th>
                    <th scope="col"></th>
                    {/* <th scope="col">Actions</th> */}
                </tr>
            </thead>
            <tbody>
                {
                    userData&&userData.map(user=>(
                        <TestResultTableRow user={user}/>
                    ))
                }
            </tbody>
        </table>
        {/* <AddEditUserModal showAddUser={showAddUser} handleCloseAddUser={handleCloseAddUser} user={user}/> */}
    </div>
    </>
  )
}

export default TestResultTable