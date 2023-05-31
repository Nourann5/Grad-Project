import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import styles from './AddEditExamModal.module.css'
import {ReactComponent as ExitIcon} from 'assets/icons/exit.svg'
import { useForm } from 'react-hook-form'
import { emailPattern } from 'utils/features'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import ButtonsLoading from 'components/Global/Elements/ButtonsLoading/ButtonsLoading'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
function AddEditExamModal({handleCloseAddExam ,showAddExam,exam,getData}) {
    const {register ,getValues,handleSubmit,setValue,formState:{errors}} = useForm({validate:'onChange'})
    const user = useSelector(state=>state.LoginReducer.user)
    const categories = useSelector(state=>state.LoginReducer.categories)
    let currentYear = new Date().getFullYear()
    console.log(currentYear)
    const [isSubmitting , setIsSubmitting]=useState(false)
    let submitForm =(data)=>{
        let formData =new FormData()
        Object.keys(getValues()).forEach(key=>{
            formData.append(`${key}`,getValues()[key])
        })
        formData.append(`user_id`,user.id)
        formData.append(`category_id`,getValues()['parentCategory'])
        setIsSubmitting(true)
        if(exam){
            axiosConfig.put(`exams/update-exam/${exam?.id}`,formData,{
                headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
            }).then(res=>{
                toast.success('Exam Updated Successfully')
                handleCloseAddExam()
                setIsSubmitting(false)
                getData()
            }).catch(err=>{
                toast.error(err?.response?.data?.message||'Something went wrong')
                setIsSubmitting(false)
            })
        }else{
            axiosConfig.post('exams/create-exam',formData,{
                headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
            }).then(res=>{
                toast.success('Exam Added Successfully')
                handleCloseAddExam()
                setIsSubmitting(false)
                getData()
            }).catch(err=>{
                toast.error(err?.response?.data?.message||'Something went wrong')
                setIsSubmitting(false)
            })

        }
    }
    useEffect(()=>{
        console.log(exam)
        setValue('name',exam?.name)
        setValue('description',exam?.description)
        setValue('year',exam?.year)
        setValue('month',exam?.month)
        setValue('status',exam?.status)
        setValue('has_sections',exam?.has_sections)
        setValue('parentCategory',exam?.category_id)
    },[exam])
  return (
    <>
        <Modal show={showAddExam} onHide={handleCloseAddExam}  size="lg">
            <div className={`${styles["modal-header"]} modal-header`}>
                <h2 className={styles['modal__title']}>{exam?'Update':'Add'} Test</h2>
                <button type="button" className={`${styles["close"]} close ms-auto`} onClick={handleCloseAddExam}>
                    <ExitIcon className={styles['modal__exit-icon']}/>
                </button>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className={`${styles["modal-body"]} modal-body`}>
                    <Row>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='testNameInput'>
                                    Test Name <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <input 
                                    type='text' 
                                    className={`${styles['modal__form-input']} ${errors?.name ?styles['modal__form-input--error']:''}`} 
                                    placeholder='Please enter test name' 
                                    id='testNameInput'
                                    {...register('name',{required:'Test name is required'})}
                                />
                                {errors?.name &&<span className={styles['modal__form-input-error-message']}>{errors.name?.message}</span>}
                            </div>
                        </Col>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='testDescriptionInput'>
                                    Description <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <input 
                                    type='text' 
                                    className={`${styles['modal__form-input']} ${errors?.description ?styles['modal__form-input--error']:''}`}  
                                    placeholder='Please enter description' 
                                    id='testDescriptionInput'
                                    {...register('description',{required:'Test description is required'})}
                                />
                                {errors?.description &&<span className={styles['modal__form-input-error-message']}>{errors.description?.message}</span>}
                            </div>
                        </Col>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='testYearSelect'>
                                    Year
                                </label>
                                <select
                                    id="testYearSelect"
                                    className={`${styles['modal__form-input']} px-2 ${errors?.year ?styles['modal__form-input--error']:''}`} 
                                    {...register('year')}
                                >
                                    <option value='' selected>Please Select Test Year</option>
                                    {
                                        [...Array(100)].map((year,index)=>(
                                            <option value={currentYear - index} key={currentYear - index}>{Number(currentYear) - Number(index)}</option>
                                            )
                                        )
                                    }
                                </select>
                                {errors?.year &&<span className={styles['modal__form-input-error-message']}>{errors.year?.message}</span>}
                            </div>
                        </Col>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='testMonthSelect'>
                                    Month
                                </label>
                                <select
                                    // className='form-select mt-3'
                                    id="testMonthSelect"
                                    className={`${styles['modal__form-input']} px-2 ${errors?.month ?styles['modal__form-input--error']:''}`} 
                                    {...register('month')}
                                >
                                    <option value='' selected>Please Select Test Month</option>
                                    <option value='january'>January</option>
                                    <option value='february'>February</option>
                                    <option value='march'>March</option>
                                    <option value='april'>April</option>
                                    <option value='may'>May</option>
                                    <option value='june'>June</option>
                                    <option value='july'>July</option>
                                    <option value='august'>August</option>
                                    <option value='september'>September</option>
                                    <option value='october'>October</option>
                                    <option value='november'>November</option>
                                    <option value='december'>December</option>
                                </select>
                                {errors?.month &&<span className={styles['modal__form-input-error-message']}>{errors.month?.message}</span>}
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
                                    {...register('status',{required:'Test Status is required'})}
                                >
                                    <option value='1' selected>Active</option>
                                    <option value='2'>Not Active</option>
                                </select>
                                {errors?.status &&<span className={styles['modal__form-input-error-message']}>{errors.status?.message}</span>}
                            </div>
                        </Col>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='confirmPasswordInput'>
                                    Have Sections <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <select
                                    // className='form-select mt-3'
                                    className={`${styles['modal__form-input']} px-2 ${errors?.has_sections ?styles['modal__form-input--error']:''}`} 
                                    {...register('has_sections',{required:'Test Has Sections is required'})}
                                >
                                    <option value='1' selected>Have Sections</option>
                                    <option value='2'>Does'nt Have Sections</option>
                                </select>
                                {errors?.has_sections &&<span className={styles['modal__form-input-error-message']}>{errors.has_sections?.message}</span>}
                            </div>
                        </Col>
                        <Col xs='12' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='confirmPasswordInput'>
                                    Parent Category <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <select
                                    // className='form-select mt-3'
                                    className={`${styles['modal__form-input']} px-2 ${errors?.parentCategory ?styles['modal__form-input--error']:''}`} 
                                    {...register('parentCategory',{required:'Test Status is required'})}
                                >
                                    <option value=''>Please Select Parent Category</option>
                                    {
                                        categories && categories?.map(category=>(
                                            <option value={category?.id} key={category?.id}>{category?.title}</option>
                                        ))
                                    }
                                    {/* <option value='1'>Not Active</option> */}
                                </select>
                                {errors?.parentCategory &&<span className={styles['modal__form-input-error-message']}>{errors.parentCategory?.message}</span>}
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

export default AddEditExamModal