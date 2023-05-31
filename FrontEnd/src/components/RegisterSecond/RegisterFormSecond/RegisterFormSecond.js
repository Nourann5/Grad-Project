import React, { useEffect, useRef, useState } from 'react'
import {ReactComponent as FacebookIcon} from 'assets/icons/facebook.svg'
import {ReactComponent as GoogleIcon} from 'assets/icons/google.svg'
import {ReactComponent as LinkedInIcon} from 'assets/icons/linkedin.svg'
import {ReactComponent as PasswordViewed} from 'assets/icons/passwordViewed.svg'
import styles from './RegisterFormSecond.module.css'
import { NavLink } from 'react-router-dom'
import { emailPattern } from 'utils/features'
import ButtonsLoading from 'components/Global/Elements/ButtonsLoading/ButtonsLoading'
import { useFormContext } from 'react-hook-form'
function RegisterFormSecond({isSubmitting}) {
    const {register ,getValues ,formState:{errors},handleSubmit,watch} =useFormContext()
    const [isPasswordVisible , setIsPasswordVisible] = useState(true)
    const [isConfirmPasswordVisible , setIsConfirmPasswordVisible] = useState(true)
    const passwrodInput = useRef(null)

    function showHidePassword(type){
        let passIcon = document.querySelectorAll('svg #Path_3314')
        setIsPasswordVisible((prevState)=>!prevState)
        passIcon[0].classList.toggle(styles['toggle-view-pass'])
    }
    
    function showHideConfirmPassword(){
        let passIcon = document.querySelectorAll('svg #Path_3314')
        setIsConfirmPasswordVisible((prevState)=>!prevState)
        passIcon[1].classList.toggle(styles['toggle-view-pass'])
    }
    
    return (
        <>
            <div className={styles["sign-up-form-content"]}>
                <div className={styles["sign-up__form-content-container"]}>
                    <p className={styles["sign-up-form-title"]}>Getting Started</p>
                    <div className={styles["sign-up-form"]}>
                        <div className={styles["form__grid"]}>
                            <div className={styles["form__input-cont"]}>
                                <label htmlFor="form__input-text" className={styles["form__input-label"]}>Name</label>
                                <input 
                                    type="text" 
                                    className={`${styles["form__input"]} ${errors?.name ?'modal__form-input--error':''}`} 
                                    id="form__input-text" 
                                    placeholder="Type Name Here"
                                    {...register('name',{required:'UserName is required'})}
                                />
                                {errors?.name &&<span className='modal__form-input-error-message'>{errors.name?.message}</span>}
                            </div>
                            <div className={styles["form__input-cont"]}>
                                <label htmlFor="form__input-email" className={styles["form__input-label"]}>Email</label>
                                <input 
                                    type="email" 
                                    className={`${styles["form__input"]} ${errors?.email ?'modal__form-input--error':''}`} 
                                    id="form__input-email"
                                    placeholder="Type Email Here"
                                    
                                    {...register('email',{required:'Email is required',
                                        pattern:{
                                            value:emailPattern,
                                            message:'Email must be like invo***@academy**.***'
                                        }})}
                                />
                                {errors?.email &&<span className='modal__form-input-error-message'>{errors.email?.message}</span>}
                            </div>
                            <div className={styles["form__input-cont"]}>
                                <label htmlFor="form__input-password" className={styles["form__input-label"]}>Password</label>
                                <div className={styles["form__input-password"]}>
                                    <input 
                                    type={`${isPasswordVisible?'password':'text'}`} 
                                    className={`${styles["form__input"]} ${errors?.password ?'modal__form-input--error':''}`} 
                                    ref={passwrodInput}
                                    id="form__input-password" 
                                    placeholder='Type Password Here'
                                    {...register('password',{required:'Password is required'})}
                                    />
                                    <button type="button" onClick={showHidePassword} className={`${styles["form__view-pass"]}`}>
                                        <PasswordViewed className={styles["form__view-pass-icon"]}/>
                                    </button>
                                </div>
                                {errors?.password &&<span className='modal__form-input-error-message'>{errors.password?.message}</span>}

                            </div>
                            <div className={styles["form__input-cont"]}>
                                <label htmlFor="form__input-confirm-password" className={styles["form__input-label"]}>Confirm Password</label>
                                <div className={styles["form__input-password"]}>
                                    <input 
                                        type={`${isConfirmPasswordVisible?'password':'text'}`} 
                                        className={`${styles["form__input"]} ${errors?.password_confirmation ?'modal__form-input--error':''}`} 
                                        ref={passwrodInput}
                                        id="form__input-confirm-password" 
                                        placeholder='Type Password Here'
                                        {...register("password_confirmation",
                                        {required:"Confirm Password is required",validate:{
                                            checkPasswordEqualToConfirmPassword :(value)=>{
                                                let pass = getValues().password
                                                return pass ===value || 'Confirm Password Doesn\'t Equal Password'
                                            }
                                        }})}
                                    />
                                    <button type="button" onClick={showHideConfirmPassword} className={`${styles["form__view-pass"]} js-form__view-pass`}>
                                        <PasswordViewed className={styles["form__view-pass-icon"]}/>
                                    </button>
                                </div>
                                {errors?.password_confirmation &&<span className='modal__form-input-error-message'>{errors.password_confirmation?.message}</span>}

                            </div>
                        </div>
                        <div className={styles["sign-up__remeber-me"]}>
                            <div className={styles["sign-up__remeber-me-cont"]}>
                                <input 
                                    type="checkbox" 
                                    id="sign-up__remeber-me-check" 
                                    className={`${styles["sign-up__remeber-me-check"]} ${errors?.terms_agree ?'modal__form-input--error':''}`} 

                                    {...register("terms_agree",{required:true})}
                                />
                                <label htmlFor="sign-up__remeber-me-check" className={`${styles["sign-up__remeber-me-label"]} ${errors?.terms_agree ?'modal__form-check-error-message':''}`}>
                                    Agree To <NavLink to='' className={`${styles["sign-up-__tems-link"]} ${errors?.terms_agree ?'modal__form-check-error-message':''}`} >Terms and Conditions</NavLink>
                                </label>
                            </div>
                        </div>
                        <button type="submit" className={styles["form__submit"]}>{isSubmitting?<ButtonsLoading/>:'Sign Up'}</button>

                    </div>
                    {/* <p className={styles["sign-up__with-other-ways"]}>
                        Or Login With
                    </p>
                    <div className={styles["sign-up__social-media-cont"]}>
                        <button className={styles["sign-up__social-media-button"]}>
                            <FacebookIcon/>
                        </button>
                        <button className={styles["sign-up__social-media-button"]}>
                            <GoogleIcon/>
                        </button>
                        <button className={styles["sign-up__social-media-button"]}>
                            <LinkedInIcon/>
                        </button>
                    </div> */}
                </div>
            </div>
            <p className={styles["sign-up__alredy-have-accout"]}> 
            Already Have An Account ? <NavLink to='/login' className={styles["sign-up__move-to-login"]}> Log In</NavLink>
            </p>
        </>
    )
}

export default RegisterFormSecond