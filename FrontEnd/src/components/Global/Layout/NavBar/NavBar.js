import React, { useState } from 'react'
import { Container, Dropdown, Nav, Navbar, NavDropdown } from 'react-bootstrap'
import styles from './NavBar.module.css'
import imgSrc from 'assets/imgs/profile.png'
import {ReactComponent as InvoLogo} from 'assets/icons/InvoLogo.svg'
import {ReactComponent as SearchIcon} from 'assets/icons/search.svg'
import {ReactComponent as MenuIcon} from 'assets/icons/menu.svg'

import {ReactComponent as ProfileMenuIcon} from 'assets/icons/profileMenuIcon.svg'
import {ReactComponent as ActivationMenuIcon} from 'assets/icons/activationMenuIcon.svg'
import {ReactComponent as AcademyMenuIcon} from 'assets/icons/academyMenuIcon.svg'
import {ReactComponent as CalenderMenuIcon} from 'assets/icons/calenderMenuIcon.svg'
import {ReactComponent as TodolistMenuIcon} from 'assets/icons/todolistMenuIcon.svg'
import {ReactComponent as ProgressMenuIcon} from 'assets/icons/progressMenuIcon.svg'
import {ReactComponent as LogOtMenuIcon} from 'assets/icons/logOtMenuIcon.svg'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'
import LoggedProfileMenu from 'components/Global/Elements/LoggedProfileMenu/LoggedProfileMenu'
function NavBar({toggleSideNavBar}) {
    const [isSearchVisible , setIsSearchVisible] =useState(false)
    const userDetails = useSelector(state=>state.LoginReducer)
    let toggleSearch = ()=>{
        setIsSearchVisible(prevState=> !prevState)
    }
    console.log(userDetails)

  return (
    <Navbar expand="lg" className={styles['navbar']}>
      <Container fluid='lg'>
        <NavLink to='/'><InvoLogo className={styles['navbar__logo']}/></NavLink>
        <button className={`${styles['navbar__menu-btn']}  d-flex d-lg-none`} onClick={toggleSideNavBar}>
            <MenuIcon/>
        </button>

        <Navbar.Collapse>
            <ul className={`${styles['navbar-nav']} navbar-nav mx-auto`}>
                <li className={`${styles["navbar__menu-items"]} ${styles["active"]} nav-item ms-lg-auto`}>
                    <a className='nav-link' href="#slider">Home</a>
                </li>
                <li className={`${styles["navbar__menu-items"]} nav-item`}>
                    <a className='nav-link' href="#courses">Courses</a>
                </li>
                <li className={`${styles["navbar__menu-items"]} nav-item`}>
                    <a className='nav-link' href="#exams">Exams</a>
                </li>
                <li className={`${styles["navbar__menu-items"]} nav-item`}>
                    <a className='nav-link' href="#pricing">Pricing</a>
                </li>
                <li className={`${styles["navbar__menu-items"]} nav-item me-lg-auto`}>
                    <a className='nav-link' href="#faq">FAQ</a>
                </li>
                <form className={`${styles["navbar__search-form"]} ${isSearchVisible&& styles['active']}`}>
                    <input className="form-control" type="search" placeholder="Search by Name , Id , etc"/>
                </form>
            </ul> 

            <button className={`${styles['navbar__search-btn']} btn me-auto`} onClick={toggleSearch}>
                <SearchIcon className={styles["navbar__search-icon"]}/>
            </button>

                {
                    userDetails.isLogged?
                    <div className="navbar__account-cont">
                        <div className="navbar__account-menu-cont">
                            <LoggedProfileMenu/>
                        </div>
                    </div>
                    :
                    <Link to='/login' className={styles['navbar__register-btn']}>
                        Login
                    </Link>
                }

        </Navbar.Collapse>

      </Container>
    </Navbar>
  )
}

export default NavBar