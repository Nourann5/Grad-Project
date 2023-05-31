import React from 'react'
import styles from './LoginHeader.module.css'
import {ReactComponent as LeftAngle} from 'assets/icons/leftAngle.svg'
import {ReactComponent as InvoLogoRegister} from 'assets/icons/invoLogoRegister.svg'
import { NavLink } from 'react-router-dom'

function LoginHeader() {
  return (
    <div className={styles["login__form-head"]}>
      <NavLink to='/' className={styles["login__return-para"]}>
        <LeftAngle className={styles["login__return-icon"]}/>
        <span className={styles["login__return-span"]}>Back To Home</span>
      </NavLink>
      <InvoLogoRegister className={styles["login__logo"]}/>
    </div>
  )
}

export default LoginHeader