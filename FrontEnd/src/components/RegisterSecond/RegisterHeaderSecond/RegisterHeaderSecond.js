import React from 'react'
import styles from './RegisterHeaderSecond.module.css'
import {ReactComponent as LeftAngle} from 'assets/icons/leftAngle.svg'

import {ReactComponent as StudentIconSignUp} from 'assets/icons/studentIconSignUp.svg'
import {ReactComponent as TeacherSignUp} from 'assets/icons/teacherSignUp.svg'
import {ReactComponent as SchoolSignUp} from 'assets/icons/schoolSignUp.svg'
import {ReactComponent as CenterSignUp} from 'assets/icons/centerSignUp.svg'
import {ReactComponent as CenterAcademySignUp} from 'assets/icons/centerAcademySignUp.svg'
import {ReactComponent as CollegeSignUp} from 'assets/icons/collegeSignUp.svg'
import {ReactComponent as UniversitySignUp} from 'assets/icons/universitySignUp.svg'

import { NavLink } from 'react-router-dom'
import { useFormContext } from 'react-hook-form'

function RegisterHeaderSecond({setCurrentActiveForm}) {
  const {setValue,getValues}=useFormContext()
  let returnToRegisterFirstStep = ()=>{
    setValue('user_type','')
    setCurrentActiveForm(0)
  }
  return (
    <div className={styles["sign-up__form-head"]}>
      <button onClick={returnToRegisterFirstStep} className={styles["sign-up__return-para"]}>
        <LeftAngle className={styles["sign-up__return-icon"]}/>
        <span className={styles["sign-up__return-span"]}>Back </span>
      </button>
      <div className={styles["sign-up__logo-cont"]}>
        <div className={`${getValues('user_type')=='student'?'d-flex flex-column':'d-none'}`}>
          <StudentIconSignUp className={`${styles["sign-up__logo"]} ${getValues('user_type')=='student'?styles["active"]:''}`}/>
          <p className={styles["sign-up__logo-role"]}>Sign Up as a <span> Student</span></p>
        </div>
        <div className={`${getValues('user_type')=='teacher'?'d-flex flex-column':'d-none'} `}>
          <TeacherSignUp className={`${styles["sign-up__logo"]} ${getValues('user_type')=='teacher'?styles["active"]:''}`}/>
          <p className={styles["sign-up__logo-role"]}>Sign Up as a <span> Teacher</span></p>
        </div>
        <div className={`${getValues('user_type')=='school'?'d-flex flex-column':'d-none'} `}>
          <SchoolSignUp className={`${styles["sign-up__logo"]} ${getValues('user_type')=='school'?styles["active"]:''}`}/>
          <p className={styles["sign-up__logo-role"]}>Sign Up as a <span> School</span></p>
        </div>
        <div className={`${getValues('user_type')=='center'?'d-flex flex-column':'d-none'} `}>
          <CenterSignUp className={`${styles["sign-up__logo"]} ${getValues('user_type')=='center'?styles["active"]:''}`}/>
          <p className={styles["sign-up__logo-role"]}>Sign Up as a <span> Center</span></p>
        </div>
        <div className={`${getValues('user_type')=='academyCenter'?'d-flex flex-column':'d-none'} `}>
          <CenterAcademySignUp className={`${styles["sign-up__logo"]} ${getValues('user_type')=='academyCenter'?styles["active"]:''}`}/>
          <p className={styles["sign-up__logo-role"]}>Sign Up as a <span> Academy Center</span></p>
        </div>
        <div className={`${getValues('user_type')=='colleage'?'d-flex flex-column':'d-none'} `}>
          <CollegeSignUp className={`${styles["sign-up__logo"]} ${getValues('user_type')=='colleage'?styles["active"]:''}`}/>
          <p className={styles["sign-up__logo-role"]}>Sign Up as a <span> Colleage</span></p>
        </div>
        <div className={`${getValues('user_type')=='university'?'d-flex flex-column':'d-none'} `}>
          <UniversitySignUp className={`${styles["sign-up__logo"]} ${getValues('user_type')=='university'?styles["active"]:''}`}/>
          <p className={styles["sign-up__logo-role"]}>Sign Up as a <span> University</span></p>
        </div>
      </div>
      
    </div>
  )
}

export default RegisterHeaderSecond