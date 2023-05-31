import PortalSideNavBar from 'components/Global/Layout/PortalSideNavBar/PortalSideNavBar'
import PortalTopNavBar from 'components/Global/Layout/PortalTopNavBar/PortalTopNavBar'
import React, { useEffect, useState } from 'react'
import { Col, Row } from 'react-bootstrap'
import { Outlet, useLocation } from 'react-router-dom'
import styles from './Portal.module.css'
function Portal() {
  const [isSideMenuOpen ,setIsSideMenuOpen] = useState(true)
  const location = useLocation()
  const pagesWithoutNavbar = ['add-test','preview-add-test']
  const [isMainNavBarWillApear,setIsMainNavBarWillApear] =useState(false)

  let closeSideMenu = ()=>{
    setIsSideMenuOpen(prevValue=>!prevValue)
  }
  let chageWindoResize =()=>{
    if(window.innerWidth <992){
      setIsSideMenuOpen(false)
    }
  }
  useEffect(()=>{
    if(window.innerWidth <992){
      setIsSideMenuOpen(false)
    }
    window.addEventListener('resize',chageWindoResize)
    return ()=>window.removeEventListener('resize',chageWindoResize)
  },[])
    
    useEffect(()=>{
      setIsMainNavBarWillApear(!location.pathname.split('/').some(path=>pagesWithoutNavbar.includes(path)) )

  },[location.pathname])

  return (
    <section id ={styles['portal']}>
      {
        isMainNavBarWillApear&&
        <PortalTopNavBar isSideMenuOpen={isSideMenuOpen} closeSideMenu={closeSideMenu} />
      }
      
      <div className={`${isMainNavBarWillApear?styles['portal__layout-wrapper']:''}`}>
        {
          isMainNavBarWillApear&&
          <div className={`${styles['portal__layout-side-navbar-wrapper']}  ${isSideMenuOpen?'':styles['portal__layout-side-navbar-wrapper--closed']}`}>
            <PortalSideNavBar isSideMenuOpen={isSideMenuOpen}/>
          </div>
          }
          <div className={`${isMainNavBarWillApear?styles['portal__layout-content-wrapper']:''}`}>
              <Outlet/>
          </div>
      </div>
    </section>
  )
}

export default Portal