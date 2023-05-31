import React, { useState } from 'react'
import styles from './SideBar.module.css'
import imgSrc from 'assets/imgs/profile.png'

import {ReactComponent as InvoLogo} from 'assets/icons/InvoLogo.svg'
import {ReactComponent as LogOutIcon} from 'assets/icons/logOutSideBar.svg'
import { NavLink } from 'react-router-dom'
function SideBar({isSideBarVisible,toggleSideNavBar}) {
 const [isLogged ,setIsLogged] =useState(false)
  return (
    <nav className={`${styles["side-navbar"]} ${isSideBarVisible && styles['side-navbar--open']}`}>
        <div className={styles["side-navbar__content"]}>
            <div className={styles["side-navbar__profile-cont"]}>
                {
                    isLogged ?
                        <>
                            <a href="#">
                                <img src={imgSrc} className={styles["side-navbar__profile-img"]} alt="profile picture"/>
                            </a>
                            <p className={styles["side-navbar__profile-name"]}>Mustafa Ibrahim</p>
                        </>
                        :
                        <NavLink to='/'><InvoLogo className={styles['side-navbar__logo']}/></NavLink>
                }
            </div>
            <ul className={styles["side-navbar__nav-list"]}>
                <li className={`${styles["side-navbar__nav-item"]} ${styles['active']}`}>
                    <a href="#" className={styles["side-navbar__nav-link"]}>Home</a>
                </li>
                <li className={styles["side-navbar__nav-item"]}>
                    <a href="#" className={styles["side-navbar__nav-link"]}>Courses</a>
                </li>
                <li className={styles["side-navbar__nav-item"]}>
                    <a href="#" className={styles["side-navbar__nav-link"]}>Exams</a>
                </li>
                <li className={styles["side-navbar__nav-item"]}>
                    <a href="#" className={styles["side-navbar__nav-link"]}>Pricing</a>
                </li>
                <li className={styles["side-navbar__nav-item"]}>
                    <a href="#" className={styles["side-navbar__nav-link"]}>Faq</a>
                </li>
            </ul>

            <ul className="side-navbar__nav-list">
                <li className={styles["side-navbar__nav-item"]}>
                    <a href="#" className={styles["side-navbar__nav-link"]}>Contact us</a>
                </li>
                <li className={styles["side-navbar__nav-item"]}>
                    <a href="#" className={styles["side-navbar__nav-link"]}>About us</a>
                </li>
                <li className={styles["side-navbar__nav-item"]}>
                    <a href="#" className={styles["side-navbar__nav-link"]}>Terms & Conditions</a>
                </li>
                <li className={styles["side-navbar__nav-item"]}>
                    <a href="#" className={styles["side-navbar__nav-link"]}>Privacy Policy</a>
                </li>
            </ul>
            {isLogged&& <div className={styles["side-navbar__logOut-cont"]}>
                <button className={styles["side-navbar__logOut"]}>
                    <LogOutIcon className={styles["side-navbar__logOut-icon"]}/>
                    Log Out
                </button>
            </div>}
        </div>
        <div className={styles["side-navbar__overlayer"]} onClick={()=>{toggleSideNavBar('close')}}></div>
    </nav>
  )
}

export default SideBar