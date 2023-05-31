import React from 'react'
import styles from './RegisterHeader.module.css'
import {ReactComponent as LeftAngle} from 'assets/icons/leftAngle.svg'
import {ReactComponent as InvoLogoRegister} from 'assets/icons/invoLogoRegister.svg'
import { NavLink } from 'react-router-dom'

function RegisterHeader() {
  return (
    <div className={styles["register__form-head"]}>
      <NavLink to='/' className={styles["register__return-para"]}>
        <LeftAngle className={styles["register__return-icon"]}/>
        <span className={styles["register__return-span"]}>Back To Home</span>
      </NavLink>
      <InvoLogoRegister className={styles["register__logo"]}/>
    </div>
  )
}

export default RegisterHeader