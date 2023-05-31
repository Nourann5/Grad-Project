import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import styles from './AddEditSectionModal.module.css'
import {ReactComponent as ExitIcon} from 'assets/icons/exit.svg'
import { useForm } from 'react-hook-form'
import { emailPattern } from 'utils/features'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import ButtonsLoading from 'components/Global/Elements/ButtonsLoading/ButtonsLoading'
import { useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
function AddEditSectionModal({handleCloseAddSection ,showAddSection,section,getData}) {
    const {register ,getValues,handleSubmit,setValue,formState:{errors}} = useForm({validate:'onChange'})
    const params = useParams()
    const user = useSelector(state=>state.LoginReducer.user)
    const [isSubmitting , setIsSubmitting]=useState(false)
    let submitForm =(data)=>{
        let formData =new FormData()
        Object.keys(getValues()).forEach(key=>{
            formData.append(`${key}`,getValues()[key])
        })
        formData.append('exam_id',params.id)
        formData.append('user_id',user.id)
        // formData.append('type',1)
        setIsSubmitting(true)
        if(section){

            axiosConfig.put(`exams/update-section/${section?.id}`,formData,{
                headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
            }).then(res=>{
                toast.success('Section Updated Successfully')
                handleCloseAddSection()
                setIsSubmitting(false)
                getData()
            }).catch(err=>{
                toast.error(err?.response?.data?.message||'Something went wrong')
                // handleCloseAddSection()
                setIsSubmitting(false)
            })
        }else{
            axiosConfig.post(`exams/create-section/${params?.id}`,formData,{
                headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
            }).then(res=>{
                toast.success('Section Added Successfully')
                handleCloseAddSection()
                setIsSubmitting(false)
                getData()
            }).catch(err=>{
                toast.error(err?.response?.data?.message||'Something went wrong')
                // handleCloseAddSection()
                setIsSubmitting(false)
            })

        }
    }
    useEffect(()=>{
        setValue('name',section?.name)
        setValue('status',section?.status)
        setValue('description',section?.description)
    },[section])

  return (
    <>
        <Modal show={showAddSection} onHide={handleCloseAddSection}  size="lg">
            <div className={`${styles["modal-header"]} modal-header`}>
                <h2 className={styles['modal__title']}>{section?'Update':'Add'} Section</h2>
                <button type="button" className={`${styles["close"]} close ms-auto`} onClick={handleCloseAddSection}>
                    <ExitIcon className={styles['modal__exit-icon']}/>
                </button>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className={`${styles["modal-body"]} modal-body`}>
                    <Row>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='sectionNameInput'>
                                    Section Name <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <input 
                                    type='text' 
                                    className={`${styles['modal__form-input']} ${errors?.name ?styles['modal__form-input--error']:''}`} 
                                    placeholder='Please enter section name' 
                                    id='sectionNameInput'
                                    {...register('name',{required:'Section name is required'})}
                                />
                                {errors?.name &&<span className={styles['modal__form-input-error-message']}>{errors.name?.message}</span>}
                            </div>
                        </Col>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='confirmPasswordInput'>
                                    Status <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <select
                                    // className='form-select mt-3'
                                    className={`${styles['modal__form-input']} px-2 ${errors?.status ?styles['modal__form-input--error']:''}`} 
                                    {...register('status',{required:'Section Status is required'})}
                                >
                                    <option value='1' selected>Active</option>
                                    <option value='2'>Not Active</option>
                                </select>
                                {errors?.status &&<span className={styles['modal__form-input-error-message']}>{errors.status?.message}</span>}
                            </div>
                        </Col>
                        <Col xs='12' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='sectionDescriptionInput'>
                                    Section Description <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <input 
                                    type='text' 
                                    className={`${styles['modal__form-input']} ${errors?.description ?styles['modal__form-input--error']:''}`}  
                                    placeholder='Please enter description' 
                                    id='sectionDescriptionInput'
                                    {...register('description',{required:'Description is required'})}
                                />
                                {errors?.description &&<span className={styles['modal__form-input-error-message']}>{errors.description?.message}</span>}
                            </div>
                        </Col>
                        {/* <Col xs='6' className='mb-3'>
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
                        </Col> */}
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

export default AddEditSectionModal