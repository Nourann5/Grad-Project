import React, { useEffect, useRef, useState } from 'react'
import {ReactComponent as FacebookIcon} from 'assets/icons/facebook.svg'
import {ReactComponent as GoogleIcon} from 'assets/icons/google.svg'
import {ReactComponent as LinkedInIcon} from 'assets/icons/linkedin.svg'
import {ReactComponent as PasswordViewed} from 'assets/icons/passwordViewed.svg'
import styles from './LoginForm.module.css'
import { NavLink, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { toast } from 'react-toastify'
import ButtonsLoading from 'components/Global/Elements/ButtonsLoading/ButtonsLoading'
import { axiosConfig } from 'utils/axiosConfig'
import { emailPattern } from 'utils/features'
import { useDispatch, useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import { loggingIn } from 'store/Login/LoginActions'
import jwtDecode from 'jwt-decode'
function LoginForm() {
    const {register ,getValues,handleSubmit ,formState:{errors}} = useForm({validate:'onChange'})
    const navigate = useNavigate()
    const passwrodInput = useRef(null)
    const googleRef = useRef(null)

    const [isPasswordVisible , setIsPasswordVisible] = useState(false)
    const [isSubmitting , setIsSubmitting]=useState(false)
    const userr=  useSelector(state=>state.LoginReducer.user)
    const dispatch = useDispatch()

    function showHidePassword(){
        let passIcon = document.getElementById('Path_3314')
        setIsPasswordVisible((prevState)=>!prevState)
        passIcon.classList.toggle(styles['toggle-view-pass'])
    }

    let submitForm =(data)=>{
            let formData =new FormData()
            Object.keys(getValues()).forEach(key=>{
                formData.append(`${key}`,getValues()[key])
            })
            setIsSubmitting(true)
            axiosConfig.post('user/login-user',formData,{
        }).then(res=>{
            toast.success('User Logged Successfully')
            setIsSubmitting(false)
            console.log(res.data)
            Cookies.set('token',res?.data?.data?.token)
            Cookies.set('user',JSON.stringify(res?.data?.data?.user))
            // localStorage.setItem('token',res.data.token)
            Cookies.set('permissions',JSON.stringify(res.data.permission))
            dispatch(loggingIn(res.data))
            navigate('/portal')
        }).catch(err=>{
            toast.error(err?.response?.data?.message||'Something went wrong')
            setIsSubmitting(false)
        })
    }

    // function signInWithGoogle(){
    //     console.log('adsdasdsa',googleRef.current,googleRef.current.querySelector('iframe').querySelector('.nsm7Bb-HzV7m-LgbsSe'))
    //     googleRef.current.querySelector('iframe').click()
    // }

    // function handleCallBackResponse(response){
    //     console.log('dasdsdas',response.credential)
    //     let userObject = jwtDecode(response.credential)
    //     console.log('userObjectuserObject',userObject)
    // }

    // useEffect(()=>{
    // /* global google*/
    //     google.accounts.id.initialize({
    //         client_id:'829484648717-dgvvef2h3q23aslobuo4h993kagt1333.apps.googleusercontent.com',
    //         callback:handleCallBackResponse
    //     })
    //     google.accounts.id.renderButton(
    //         document.getElementById('googleCont'),
    //         {theme:'outline',size:'large'}
    //     ) 
    // },[])

    return (
        <>
            <div className={styles["login-form-content"]}>
                <div className={styles["login__form-content-container"]}>
                    <p className={styles["login-form-title"]}>Welcome Back</p>
                    <form className={styles["login-form"]} onSubmit={handleSubmit(submitForm)}>
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
                            {errors?.email &&<span className={'modal__form-input-error-message'}>{errors.email?.message}</span>}
                        </div>
                        <div className={styles["form__input-cont"]}>
                            <label htmlFor="form__input-password" className={styles["form__input-label"]}>Password</label>
                            <div className={styles["form__input-password"]}>
                                <input 
                                    type={`${isPasswordVisible?'text':'password'}`} 
                                    className={`${styles["form__input"]} ${errors?.password ?'modal__form-input--error':''}`} 
                                    ref={passwrodInput}
                                    id="form__input-password" 
                                    placeholder='Type Password Here'
                                    {...register('password',{required:'Password is required'})}
                                />
                                {errors?.password &&<span className={'modal__form-input-error-message'}>{errors.password?.message}</span>}
                                <button type="button" onClick={showHidePassword} className={styles["form__view-pass"]}>
                                    <PasswordViewed className={styles["form__view-pass-icon"]}/>
                                </button>
                            </div>
                        </div>
                        <div className={styles["login__remeber-me"]}>
                            <div className={styles["login__remeber-me-cont"]}>
                                <input type="checkbox" id="login__remeber-me-check" className={styles["login__remeber-me-check"]}/>
                                <label htmlFor="login__remeber-me-check" className={styles["login__remeber-me-label"]}>Remember Me</label>
                            </div>
                            <NavLink to='/forget' className={styles["login__forget-password"]}>Forgot Password?</NavLink>
                        </div>
                        <button type="submit" className={styles["form__submit"]}>{isSubmitting?<ButtonsLoading/>:'Login'}</button>
                    </form>
                    {/* <p className={styles["login__with-other-ways"]}>
                        Or Login With
                    </p>
                    <div className={styles["login__social-media-cont"]}>
                        <button className={styles["login__social-media-button"]}>
                            <FacebookIcon/>
                        </button>
                        <button className={styles["login__social-media-button"]}>
                            <GoogleIcon/>
                        </button>
                        <button className={styles["login__social-media-button"]}>
                            <LinkedInIcon/>
                        </button>
                    </div> */}
                </div>
            </div>
            <p className={styles["login__dont-have-accout"]}>
                Don't Have An Account ? 
                <NavLink to='/register' className={styles["login__move-to-register"]}> Register</NavLink>
            </p>
        </>
    )
}

export default LoginForm