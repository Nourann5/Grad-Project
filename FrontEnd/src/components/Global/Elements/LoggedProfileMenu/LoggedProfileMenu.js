import React from 'react'
import { Dropdown } from 'react-bootstrap'
import { Link, useNavigate } from 'react-router-dom'
import styles from './LoggedProfileMenu.module.css'
import imgSrc from 'assets/imgs/profile.png'

import {ReactComponent as ProfileMenuIcon} from 'assets/icons/profileMenuIcon.svg'
import {ReactComponent as ActivationMenuIcon} from 'assets/icons/activationMenuIcon.svg'
import {ReactComponent as AcademyMenuIcon} from 'assets/icons/academyMenuIcon.svg'
import {ReactComponent as CalenderMenuIcon} from 'assets/icons/calenderMenuIcon.svg'
import {ReactComponent as TodolistMenuIcon} from 'assets/icons/todolistMenuIcon.svg'
import {ReactComponent as ProgressMenuIcon} from 'assets/icons/progressMenuIcon.svg'
import {ReactComponent as LogOtMenuIcon} from 'assets/icons/logOtMenuIcon.svg'
import { useDispatch } from 'react-redux'
import { logOut } from 'store/Login/LoginActions'
import Cookies from 'js-cookie'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
function LoggedProfileMenu() {
    const dispatch = useDispatch()
    const navigate = useNavigate()
  
    let logOutFunction =()=>{
        axiosConfig.post('logout',{},{
            headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
        }).then(res=>{
            toast.success('Logged Out Successfully')
            dispatch(logOut(res.data))
            Cookies.remove('token')
            Cookies.remove('permissions')
            navigate('/')
        }).catch(err=>{
            toast.error(err?.response?.data?.message||'Something went wrong')
        })
    } 
  return (

    <Dropdown className={styles['portal__top-navbar-profile-dropdown']}>
        <Dropdown.Toggle className={styles['portal__top-navbar-profile-dropdown-button']} id="dropdown-basic">
            <img src={imgSrc} alt='profile' className={styles['portal__top-navbar-profile-dropdown-img']}/>
        </Dropdown.Toggle>

        <Dropdown.Menu className={styles['portal__top-navbar-profile-dropdown-menu']}>
            <Dropdown.Item as={Link} to="/portal" className={styles["dropdown-item"]} >
                <ProfileMenuIcon className={styles['navbar__account-icon']}/>
                UPDATE PROFILE
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal"  className={styles["dropdown-item"]}>
                <ActivationMenuIcon className={styles['navbar__account-icon']}/>
                ACTIVATION
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal" className={styles["dropdown-item"]}>
                <AcademyMenuIcon className={styles['navbar__account-icon']}/>
                ACADEMIES
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal" className={styles["dropdown-item"]}>
                <ProgressMenuIcon className={styles['navbar__account-icon']}/>
                MY PROGRESS
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal" className={styles["dropdown-item"]}>
                <CalenderMenuIcon className={styles['navbar__account-icon']}/>
                CALENDAR
            </Dropdown.Item>
            <Dropdown.Item as={Link} to="/portal" className={styles["dropdown-item"]}>
                <TodolistMenuIcon className={styles['navbar__account-icon']}/>
                TO DO LIST
            </Dropdown.Item>
            <Dropdown.Divider />
            <Dropdown.Item onClick={logOutFunction} className={styles["dropdown-item"]}>
                <LogOtMenuIcon className={styles['navbar__account-icon']}/>
                LOG OUT
            </Dropdown.Item>
        </Dropdown.Menu>
    </Dropdown>

  )
}

export default LoggedProfileMenu