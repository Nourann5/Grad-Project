import React, { useEffect, useRef, useState } from 'react'
import {ReactComponent as StudentIcon} from 'assets/icons/studentIcon.svg'
import {ReactComponent as TeacherIcon} from 'assets/icons/teacherIcon.svg'
import {ReactComponent as SchoolIcon} from 'assets/icons/schoolIcon.svg'
import {ReactComponent as CenterIcon} from 'assets/icons/centerIcon.svg'
import {ReactComponent as CenterAcademy} from 'assets/icons/centerAcademy.svg'
import {ReactComponent as ColleageIcon} from 'assets/icons/colleageIcon.svg'
import {ReactComponent as UniversityIcon} from 'assets/icons/universityIcon.svg'

import styles from './RegisterForm.module.css'
import { NavLink } from 'react-router-dom'
import { Col, Row } from 'react-bootstrap'
import { useFormContext } from 'react-hook-form'
function RegisterForm({setCurrentActiveForm}) {
    const {register,getValues,watch} = useFormContext()
    useEffect(()=>{
        if(getValues('user_type')){
            setCurrentActiveForm(1)
        }
    },[watch('user_type')])
    return (
        <>
            <div className={styles["first-sign-up-form-content"]}>
                <div className={styles["first-sign-up__form-content-container"]}>
                    <p className={styles["first-sign-up-form-title"]}>Getting Started</p>
                    <p className={styles["first-sign-up-form-second-title"]}>Lorem ipsum dolor sit amet, consetetur sadipscin nsetetur sadipscing</p>
                    <Row className='justify-content-center'>
                        <Col lg='3' md='4' xs='6' className='mb-4 '>
                            <input
                                type='radio' 
                                value='student' 
                                className={styles['first-sign-up__role-input-radio']}
                                id='registerStudentType'
                                {...register('user_type')} 
                            />
                            <label htmlFor='registerStudentType' className={styles["first-sign-up__role"]}>
                                <StudentIcon className={styles["first-sign-up__role-icon"]}/>
                                <p className={styles["first-sign-up__role-name"]}>Student</p>
                            </label>
                        </Col>
                        <Col lg='3' md='4' xs='6' className='mb-4 '>
                            <input
                                type='radio' 
                                value='teacher' 
                                className={styles['first-sign-up__role-input-radio']}
                                id='registerTeacherType'
                                {...register('user_type')} 
                            />
                            <label htmlFor='registerTeacherType' className={styles["first-sign-up__role"]}>
                                <TeacherIcon className={styles["first-sign-up__role-icon"]}/>
                                <p className={styles["first-sign-up__role-name"]}>Teacher</p>
                            </label>
                        </Col>
                        {/* <Col lg='3' md='4' xs='6' className='mb-4 '>
                            <input
                                type='radio' 
                                value='school' 
                                className={styles['first-sign-up__role-input-radio']}
                                id='registerSchoolType'
                                {...register('user_type')} 
                            />
                            <label htmlFor='registerSchoolType' className={styles["first-sign-up__role"]}>
                                <SchoolIcon className={styles["first-sign-up__role-icon"]}/>
                                <p className={styles["first-sign-up__role-name"]}>School</p>
                            </label>
                        </Col>
                        <Col lg='3' md='4' xs='6' className='mb-4 '>
                            <input
                                type='radio' 
                                value='center' 
                                className={styles['first-sign-up__role-input-radio']}
                                id='registerCenterType'
                                {...register('user_type')} 
                            />
                            <label htmlFor='registerCenterType' className={styles["first-sign-up__role"]}>
                                <CenterIcon className={styles["first-sign-up__role-icon"]}/>
                                <p className={styles["first-sign-up__role-name"]}>Center</p>
                            </label>
                        </Col>
                        <Col lg='3' md='4' xs='6' className='mb-4 '>
                            <input
                                type='radio' 
                                value='academyCenter' 
                                className={styles['first-sign-up__role-input-radio']}
                                id='registerCenterAcademyType'
                                {...register('user_type')} 
                            />
                            <label htmlFor='registerCenterAcademyType' className={styles["first-sign-up__role"]}>
                                <CenterAcademy className={styles["first-sign-up__role-icon"]}/>
                                <p className={styles["first-sign-up__role-name"]}>Center Academy</p>
                            </label>
                        </Col>
                        <Col lg='3' md='4' xs='6' className='mb-4 '>
                            <input
                                type='radio' 
                                value='colleage' 
                                className={styles['first-sign-up__role-input-radio']}
                                id='registerColleageType'
                                {...register('user_type')} 
                            />
                            <label htmlFor='registerColleageType' className={styles["first-sign-up__role"]}>
                                <ColleageIcon className={styles["first-sign-up__role-icon"]}/>
                                <p className={styles["first-sign-up__role-name"]}>Colleage</p>
                            </label>
                        </Col>
                        <Col lg='3' md='4' xs='6' className='mb-4 '>
                            <input
                                type='radio' 
                                value='university' 
                                className={styles['first-sign-up__role-input-radio']}
                                id='registerUniversityType'
                                {...register('user_type')} 
                            />
                            <label htmlFor='registerUniversityType' className={styles["first-sign-up__role"]}>
                                <UniversityIcon className={styles["first-sign-up__role-icon"]}/>
                                <p className={styles["first-sign-up__role-name"]}>University</p>
                            </label>
                        </Col> */}
                    </Row>
                </div>
            </div>
            <p className={styles["first-sign-up__alredy-have-accout"]}> Already Have An Account ? 
                <NavLink to='/login' className={styles["first-sign-up__move-to-login"]}> Log In</NavLink>
            </p>
        </>
    )
}

export default RegisterForm