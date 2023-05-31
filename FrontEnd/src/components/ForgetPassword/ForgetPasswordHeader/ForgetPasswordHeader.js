import React from 'react'
import styles from './ForgetPasswordHeader.module.css'
import {ReactComponent as LeftAngle} from 'assets/icons/leftAngle.svg'
import {ReactComponent as InvoLogoRegister} from 'assets/icons/invoLogoRegister.svg'
import { NavLink } from 'react-router-dom'

function ForgetPasswordHeader() {
  return (
    <div className={styles["forget__form-head"]}>
      <NavLink to='/login' className={styles["forget__return-para"]}>
        <LeftAngle className={styles["forget__return-icon"]}/>
        <span className={styles["forget__return-span"]}>Back To Login</span>
      </NavLink>
      <InvoLogoRegister className={styles["forget__logo"]}/>
    </div>
  )
}

export default ForgetPasswordHeader