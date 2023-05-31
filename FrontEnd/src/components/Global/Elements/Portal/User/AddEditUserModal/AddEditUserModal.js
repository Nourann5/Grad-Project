import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import styles from './AddEditUserModal.module.css'
import {ReactComponent as ExitIcon} from 'assets/icons/exit.svg'
import { useForm } from 'react-hook-form'
import { emailPattern } from 'utils/features'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import ButtonsLoading from 'components/Global/Elements/ButtonsLoading/ButtonsLoading'
function AddEditUserModal({handleCloseAddUser ,showAddUser,user}) {
    const {register ,getValues,handleSubmit,setValue,formState:{errors}} = useForm({validate:'onChange'})
    const [isSubmitting , setIsSubmitting]=useState(false)
    let submitForm =(data)=>{
        let formData =new FormData()
        Object.keys(getValues()).forEach(key=>{
            formData.append(`${key}`,getValues()[key])
        })
        setIsSubmitting(true)
        axiosConfig.post('dasdasads',formData).then(res=>{
            toast.success('Student Added Successfully')
            handleCloseAddUser()
            setIsSubmitting(false)
        }).catch(err=>{
            toast.error(err?.response?.data?.message||'Something went wrong')
            // handleCloseAddUser()
            setIsSubmitting(false)
        })
    }
    useEffect(()=>{
        setValue('userName',user?.user_name)
        setValue('email',user?.user_email)
    },[user])
  return (
    <>
        <Modal show={showAddUser} onHide={handleCloseAddUser}  size="lg">
            <div className={`${styles["modal-header"]} modal-header`}>
                <h2 className={styles['modal__title']}>{user?'Update':'Add'} Student</h2>
                <button type="button" className={`${styles["close"]} close ms-auto`} onClick={handleCloseAddUser}>
                    <ExitIcon className={styles['modal__exit-icon']}/>
                </button>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className={`${styles["modal-body"]} modal-body`}>
                    <Row>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='userNameInput'>
                                    UserName <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <input 
                                    type='text' 
                                    className={`${styles['modal__form-input']} ${errors?.userName ?styles['modal__form-input--error']:''}`} 
                                    placeholder='Please enter username' 
                                    id='userNameInput'
                                    {...register('userName',{required:'UserName is required'})}
                                />
                                {errors?.userName &&<span className={styles['modal__form-input-error-message']}>{errors.userName?.message}</span>}
                            </div>
                        </Col>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='emailInput'>
                                    Email <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <input 
                                    type='email' 
                                    className={`${styles['modal__form-input']} ${errors?.email ?styles['modal__form-input--error']:''}`}  
                                    placeholder='Please enter email' 
                                    id='emailInput'
                                    {...register('email',{required:'Email is required',
                                    pattern:{
                                        value:emailPattern,
                                        message:'Email must be like invo***@academy**.***'
                                    }})}
                                />
                                {errors?.email &&<span className={styles['modal__form-input-error-message']}>{errors.email?.message}</span>}
                            </div>
                        </Col>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='passwordInput'>
                                    Password <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <input 
                                    type='password' 
                                    className={`${styles['modal__form-input']} ${errors?.password ?styles['modal__form-input--error']:''}`}  
                                    placeholder='Please enter password' 
                                    id='passwordInput'
                                    {...register('password',{required:'Password is required'})}
                                />
                                {errors?.password &&<span className={styles['modal__form-input-error-message']}>{errors.password?.message}</span>}
                            </div>
                        </Col>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='confirmPasswordInput'>
                                    Confirm Password <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <input 
                                    type='password' 
                                    className={`${styles['modal__form-input']} ${errors?.confirmPassword ?styles['modal__form-input--error']:''}`}  
                                    placeholder='Please enter confirm password' 
                                    id='confirmPasswordInput'
                                    {...register('confirmPassword',
                                    {required:'Confirm password is required' ,validate:{
                                        checkPasswordEqualToConfirmPassword :(value)=>{
                                            let pass = getValues().password
                                            return pass ===value || 'Confirm password does\'t equal password'
                                        }
                                    }})}
                                />
                                {errors?.confirmPassword &&<span className={styles['modal__form-input-error-message']}>{errors.confirmPassword?.message}</span>}
                            </div>
                        </Col>
                    </Row>
                    <div className={styles['submit-modal__buttons-cont']}>
                        <button type='submit' className={styles['submit-modal__confirm-button']} disabled={isSubmitting}>{isSubmitting?<ButtonsLoading/>:'Submit'}</button>
                    </div>
                </div>
            </form>

        </Modal>
    </>
  )
}

export default AddEditUserModal