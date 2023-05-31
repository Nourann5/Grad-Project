import React, { useEffect, useRef } from 'react'
import styles from './PortalSideNavBar.module.css'
import { Link } from 'react-router-dom'
import { Accordion, Button, Card } from 'react-bootstrap'
import {ReactComponent as OverviewIcon} from 'assets/icons/overview.svg'
import {ReactComponent as CoursePlanPortalIcon} from 'assets/icons/coursePlanPortal.svg'
import {ReactComponent as ExamsPortalIcon} from 'assets/icons/examsPortal.svg'
import {ReactComponent as GroupsPortalIcon} from 'assets/icons/groupsPortal.svg'
import {ReactComponent as MaterialsPortalIcon} from 'assets/icons/materialsPortal.svg'
import {ReactComponent as MembersPortalIcon} from 'assets/icons/membersPortal.svg'
import {ReactComponent as ReportsPortalIcon} from 'assets/icons/reportsPortal.svg'
import {ReactComponent as TodolistPortalIcon} from 'assets/icons/todolistPortal.svg'
import {ReactComponent as ChatPortalIcon} from 'assets/icons/chatPortal.svg'
import {ReactComponent as SettingsPortalIcon} from 'assets/icons/settingsPortal.svg'

function PortalSideNavBar({isSideMenuOpen}) {
  const accordionRef =useRef(null)
  useEffect(()=>{
    let accordionCollapse = document.querySelectorAll('.accordion-button:not(.collapsed)')
    if(!isSideMenuOpen){
      accordionCollapse.forEach(accordionItem=>{
        accordionItem.click()
      })
    }
  },[isSideMenuOpen])
  useEffect(()=>{
    console.log('rerender')
  },[window.location.pathname])
  return (
    <div className={`${styles['portal__side-navbar-content-wrapper']} ${isSideMenuOpen?'':styles['portal__side-navbar-content-wrapper--closed']}`}>
      <Accordion ref={accordionRef}>
            <Accordion.Item eventKey="0" className={styles['portal__accordion-item']}>
                <Accordion.Header className={`${styles['portal__side-navbar-item-wrapper']} ${window.location.pathname=='/portal' ?styles['portal__side-navbar-item-wrapper--active']:''}`}>
                  <Link to='/portal' className={styles['portal__side-nav-link']}>
                    <div className={styles['portal__accordion-header-content']}>
                      <div className={styles['portal__accordion-header-item-cont']}>
                        <OverviewIcon className={`${styles['portal__side-navbar-item-icon']} ${styles['portal__side-navbar-item-icon--stroke']}`}/>
                        <span className={styles['portal__accordion-header']}>Overview</span>
                      </div>
                    </div>
                  </Link>
                  {/* <div className={styles['portal__side-nav-link-toltip']}>Overview</div> */}
                </Accordion.Header>
            </Accordion.Item>

            {/* Groups */}
            {/* <Accordion.Item eventKey="1" className={styles['portal__accordion-item']}>
                <Accordion.Header  className={`${styles['portal__side-navbar-item-wrapper']} ${window.location.pathname=='/portal/groups' ?styles['portal__side-navbar-item-wrapper--active']:''}`}>
                  <Link to='/' className={styles['portal__side-nav-link']}>
                    <div className={styles['portal__accordion-header-content']}>
                      <div className={styles['portal__accordion-header-item-cont']}>
                      <GroupsPortalIcon className={styles['portal__side-navbar-item-icon']}/>
                        <span className={styles['portal__accordion-header']}>Groups</span>
                      </div>
                    </div>
                  </Link>
                </Accordion.Header>
            </Accordion.Item> */}

            {/* Course Plan */}
            {/* <Accordion.Item eventKey="2" className={styles['portal__accordion-item']}>
                <Accordion.Header  className={`${styles['portal__side-navbar-item-wrapper']} ${window.location.pathname=='/portal/coursePlan' ?styles['portal__side-navbar-item-wrapper--active']:''}`}>
                  <div className={styles['portal__accordion-header-content']}>
                    <div className={styles['portal__accordion-header-item-cont']}>
                        <CoursePlanPortalIcon className={styles['portal__side-navbar-item-icon']}/>
                        <span className={styles['portal__accordion-header']}>Course Plan</span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className={styles['portal__accordion-body']}>
                  <ul className={styles['portal__accordion-list']}>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                  </ul>
                </Accordion.Body>
            </Accordion.Item> */}

            {/* Categories */}
            <Accordion.Item eventKey="10" className={styles['portal__accordion-item']}>
                <Accordion.Header  className={`${styles['portal__side-navbar-item-wrapper']} ${window.location.pathname=='/portal/categories' ?styles['portal__side-navbar-item-wrapper--active']:''}`}>
                  <Link to='/portal/categories' className={styles['portal__side-nav-link']}>
                    <div className={styles['portal__accordion-header-content']}>
                      <div className={styles['portal__accordion-header-item-cont']}>
                          <ExamsPortalIcon className={styles['portal__side-navbar-item-icon']}/>
                          <span className={styles['portal__accordion-header']}>Categories</span>
                      </div>
                    </div>
                  </Link>
                </Accordion.Header>
                {/* <Accordion.Body className={styles['portal__accordion-body']}>
                  <ul className={styles['portal__accordion-list']}>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/portal/exams' className={styles['portal__side-navbar-side-link']}>All Categories</Link>
                    </li>
                  </ul>
                </Accordion.Body> */}
            </Accordion.Item>

            {/* Exams */}
            <Accordion.Item eventKey="3" className={styles['portal__accordion-item']}>
                <Accordion.Header  className={`${styles['portal__side-navbar-item-wrapper']} ${window.location.pathname=='/portal/exams' ?styles['portal__side-navbar-item-wrapper--active']:''}`}>
                  <Link to='/portal/exams' className={styles['portal__side-nav-link']}>
                    <div className={styles['portal__accordion-header-content']}>
                      <div className={styles['portal__accordion-header-item-cont']}>
                          <ExamsPortalIcon className={styles['portal__side-navbar-item-icon']}/>
                          <span className={styles['portal__accordion-header']}>Exams</span>
                      </div>
                    </div>
                  </Link>
                </Accordion.Header>
                {/* <Accordion.Body className={styles['portal__accordion-body']}>
                  <ul className={styles['portal__accordion-list']}>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/portal/exams' className={styles['portal__side-navbar-side-link']}>All exams</Link>
                    </li>
                  </ul>
                </Accordion.Body> */}
            </Accordion.Item>

            {/* Materials */}
            {/* <Accordion.Item eventKey="4" className={styles['portal__accordion-item']}>
                <Accordion.Header  className={`${styles['portal__side-navbar-item-wrapper']} ${window.location.pathname=='/portal/' ?styles['portal__side-navbar-item-wrapper--active']:''}`}>
                  <div className={styles['portal__accordion-header-content']}>
                    <div className={styles['portal__accordion-header-item-cont']}>
                        <MaterialsPortalIcon className={styles['portal__side-navbar-item-icon']}/>
                        <span className={styles['portal__accordion-header']}>Materials</span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className={styles['portal__accordion-body']}>
                  <ul className={styles['portal__accordion-list']}>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                  </ul>
                </Accordion.Body>
            </Accordion.Item> */}

            {/* Members */}
            <Accordion.Item eventKey="5" className={styles['portal__accordion-item']}>
                <Accordion.Header  className={`${styles['portal__side-navbar-item-wrapper']} ${window.location.pathname=='/portal/students' ?styles['portal__side-navbar-item-wrapper--active']:''}`}>
                  <div className={styles['portal__accordion-header-content']}>
                    <div className={styles['portal__accordion-header-item-cont']}>
                        <MembersPortalIcon className={styles['portal__side-navbar-item-icon']}/>
                        <span className={styles['portal__accordion-header']}>Members</span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className={styles['portal__accordion-body']}>
                  <ul className={styles['portal__accordion-list']}>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/portal/students' className={styles['portal__side-navbar-side-link']}>All Students</Link>
                    </li>
                    {/* <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li> */}
                  </ul>
                </Accordion.Body>
            </Accordion.Item>

            {/* To Do List */}
            <Accordion.Item eventKey="6" className={styles['portal__accordion-item']}>
                <Accordion.Header  className={`${styles['portal__side-navbar-item-wrapper']} ${window.location.pathname=='/portal/' ?styles['portal__side-navbar-item-wrapper--active']:''}`}>
                  <div className={styles['portal__accordion-header-content']}>
                    <div className={styles['portal__accordion-header-item-cont']}>
                        <TodolistPortalIcon className={styles['portal__side-navbar-item-icon']}/>
                        <span className={styles['portal__accordion-header']}>To Do List</span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className={styles['portal__accordion-body']}>
                  <ul className={styles['portal__accordion-list']}>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                  </ul>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="7" className={styles['portal__accordion-item']}>
                <Accordion.Header  className={`${styles['portal__side-navbar-item-wrapper']} ${window.location.pathname=='/portal/' ?styles['portal__side-navbar-item-wrapper--active']:''}`}>
                  <div className={styles['portal__accordion-header-content']}>
                    <div className={styles['portal__accordion-header-item-cont']}>
                        <ChatPortalIcon className={styles['portal__side-navbar-item-icon']}/>
                        <span className={styles['portal__accordion-header']}>Message</span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className={styles['portal__accordion-body']}>
                  <ul className={styles['portal__accordion-list']}>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                  </ul>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="8" className={styles['portal__accordion-item']}>
                <Accordion.Header  className={`${styles['portal__side-navbar-item-wrapper']} ${window.location.pathname=='/portal/' ?styles['portal__side-navbar-item-wrapper--active']:''}`}>
                  <div className={styles['portal__accordion-header-content']}>
                    <div className={styles['portal__accordion-header-item-cont']}>
                        <ReportsPortalIcon className={styles['portal__side-navbar-item-icon']}/>
                        <span className={styles['portal__accordion-header']}>Reports</span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className={styles['portal__accordion-body']}>
                  <ul className={styles['portal__accordion-list']}>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                  </ul>
                </Accordion.Body>
            </Accordion.Item>

            <Accordion.Item eventKey="9" className={styles['portal__accordion-item']}>
                <Accordion.Header  className={`${styles['portal__side-navbar-item-wrapper']} ${window.location.pathname=='/portal/' ?styles['portal__side-navbar-item-wrapper--active']:''}`}>
                  <div className={styles['portal__accordion-header-content']}>
                    <div className={styles['portal__accordion-header-item-cont']}>
                        <SettingsPortalIcon className={styles['portal__side-navbar-item-icon']}/>
                        <span className={styles['portal__accordion-header']}>Settings</span>
                    </div>
                  </div>
                </Accordion.Header>
                <Accordion.Body className={styles['portal__accordion-body']}>
                  <ul className={styles['portal__accordion-list']}>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                    <li className={styles['portal__accordion-list-item']}>
                      <Link to='/' className={styles['portal__side-navbar-side-link']}>Homee</Link>
                    </li>
                  </ul>
                </Accordion.Body>
            </Accordion.Item>
      </Accordion>
    </div>
    
  )
}

export default PortalSideNavBar