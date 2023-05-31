import React from 'react'
import styles from './PortalTopNavBar.module.css'
import {ReactComponent as InvoLogo} from 'assets/icons/InvoLogo.svg'
import {ReactComponent as InvoLogoMini} from 'assets/icons/invoLogoMini.svg'
import {ReactComponent as MenuIcon} from 'assets/icons/menu.svg'
import {ReactComponent as LogOtMenuIcon} from 'assets/icons/logOutSideBar.svg'
import profileSrc from 'assets/imgs/profile.png'
import { Dropdown } from 'react-bootstrap'
import { logOut } from 'store/Login/LoginActions'
import Cookies from 'js-cookie'
import { useDispatch } from 'react-redux'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import { useNavigate } from 'react-router-dom'
import LoggedProfileMenu from 'components/Global/Elements/LoggedProfileMenu/LoggedProfileMenu'
function PortalTopNavBar({closeSideMenu,isSideMenuOpen}) {
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
    <div className={`${styles['portal__top-navbar']} ${isSideMenuOpen?'':styles['portal__top-navbar--closed']}`}>
        <div className={styles['portal__top-navbar-logo-menu-wrapper']}>
          <button className={styles['portal__top-navbar__logo-button']}>
            <InvoLogo className={`${styles['portal__top-navbar__logo']} ${styles['portal__top-navbar__logo--full']}`}/>
            <InvoLogoMini className={`${styles['portal__top-navbar__logo']} ${styles['portal__top-navbar__logo--mini']}`}/>
          </button>
          <button className={styles['portal__top-navbar__menu-button']} onClick={closeSideMenu}>
            <MenuIcon className={styles['portal__top-navbar__menu-icon']}/>
          </button>
        </div>
        <div className={styles['portal__top-navbar-rest-icons-wrapper']}>
          <div className='ms-auto'></div>
          <LoggedProfileMenu/>
          <button className={styles['portal__top-navbar__logout-button']} onClick={logOutFunction}>
            <LogOtMenuIcon className={styles['portal__top-navbar__logout-icon']}/>
          </button>
        </div>
    </div>
  )
}

export default PortalTopNavBar