import React, { useEffect, useState } from 'react'
import { Button, Col, Modal, Row } from 'react-bootstrap'
import styles from './AddEditCategoryModal.module.css'
import {ReactComponent as ExitIcon} from 'assets/icons/exit.svg'
import { useForm } from 'react-hook-form'
import { emailPattern } from 'utils/features'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import ButtonsLoading from 'components/Global/Elements/ButtonsLoading/ButtonsLoading'
import { useSelector } from 'react-redux'
import Cookies from 'js-cookie'
import Resizer from "react-image-file-resizer";
function AddEditCategoryModal({handleCloseAddCategory ,showAddCategory,category,getData}) {
    const {register ,getValues,handleSubmit,setValue,formState:{errors}} = useForm({validate:'onChange'})
    const user = useSelector(state=>state.LoginReducer.user)
    const categories = useSelector(state=>state.LoginReducer.categories)
    let currentYear = new Date().getFullYear()
    const [isSubmitting , setIsSubmitting]=useState(false)
    const [image,setImage]=useState([])
    
async function handleUploadedImage(e){
    let image = await new Promise((resolve) => {
    Resizer.imageFileResizer(
        e.target.files[0],
        200,
        200,
        "JPEG",
        50,
        0,
        (uri) => {
            console.log(uri)
            resolve(uri);
        },
        "file",
        200,
        200,
    );
    });
    Object.assign(image, {
        preview: URL.createObjectURL(image),
    })
    setImage(image)
  }
    let submitForm =(data)=>{
        let formData =new FormData()
        // Object.keys(getValues()).forEach(key=>{
        //     formData.append(`${key}`,getValues()[key])
        // })
        
        formData.append(`title_en`,getValues()['titleEn'])
        formData.append(`title_ar`,getValues()['titleEn'])
        formData.append(`parent_category_id`,getValues()['parentCategory'])
        formData.append(`status`,getValues()['status'])  
        formData.append(`image`,image)

        setIsSubmitting(true)
        if(category){
            
            axiosConfig.put(`category/update-category/${category?.id}`,formData,{
                headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
            }).then(res=>{
                toast.success('Category Updated Successfully')
                handleCloseAddCategory()
                setImage([])
                setIsSubmitting(false)
                getData()
            }).catch(err=>{
                toast.error(err?.response?.data?.message||'Something went wrong')
                setIsSubmitting(false)
            })
        }else{
            axiosConfig.post('category/create-category',formData,{
                headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
            }).then(res=>{
                toast.success('Category Added Successfully')
                handleCloseAddCategory()
                setImage([])
                setIsSubmitting(false)
                getData()
            }).catch(err=>{
                toast.error(err?.response?.data?.message||'Something went wrong')
                setIsSubmitting(false)
            })

        }
    }
    useEffect(()=>{
        setValue('titleEn',category?.title)
        setValue('status',category?.status)
        setValue('parentCategory',category?.parent_category)
        setImage(category?.image)
    },[category])
   
  return (
    <>
        <Modal show={showAddCategory} onHide={handleCloseAddCategory}  size="lg">
            <div className={`${styles["modal-header"]} modal-header`}>
                <h2 className={styles['modal__title']}>{category?'Update':'Add'} Category</h2>
                <button type="button" className={`${styles["close"]} close ms-auto`} onClick={handleCloseAddCategory}>
                    <ExitIcon className={styles['modal__exit-icon']}/>
                </button>
            </div>
            <form onSubmit={handleSubmit(submitForm)}>
                <div className={`${styles["modal-body"]} modal-body`}>
                    <Row>
                        <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='testNameInput'>
                                    Title <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <input 
                                    type='text' 
                                    className={`${styles['modal__form-input']} ${errors?.titleEn ?styles['modal__form-input--error']:''}`} 
                                    placeholder='Please enter Category Title' 
                                    id='testNameInput'
                                    {...register('titleEn',{required:'Category Title is required'})}
                                />
                                {errors?.titleEn &&<span className={styles['modal__form-input-error-message']}>{errors.titleEn?.message}</span>}
                            </div>
                        </Col>
                        {/* <Col xs='6' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='testDescriptionInput'>
                                    Description <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <input 
                                    type='text' 
                                    className={`${styles['modal__form-input']} ${errors?.description ?styles['modal__form-input--error']:''}`}  
                                    placeholder='Please enter Category ' 
                                    id='testDescriptionInput'
                                    {...register('description',{required:'Test description is required'})}
                                />
                                {errors?.description &&<span className={styles['modal__form-input-error-message']}>{errors.description?.message}</span>}
                            </div>
                        </Col> */}

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
                                    <option value=''>Please Select Active Status</option>
                                    <option value='1' selected>Active</option>
                                    <option value='2'>Not Active</option>
                                </select>
                                {errors?.status &&<span className={styles['modal__form-input-error-message']}>{errors.status?.message}</span>}
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
                        <Col xs='12' className='mb-3'>
                            <div className={styles['modal__form-input-wrapper']}>
                                <label className={styles['modal__form-input-label']} htmlFor='confirmPasswordInput'>
                                    Image <span className={styles['modal__form-input-required']}>*</span>
                                </label>
                                <input
                                    type='file'
                                    data-kt-user-table-filter='search'
                                    className='form-control form-control-solid mb-3 ps-14'
                                    placeholder='Type Icon'
                                    id='carImage'
                                    onChange={(e) => handleUploadedImage(e)}
                                    accept={'.jpg,.png,.gif,.jpeg'}
                                />
                                {
                                    image&&(image?.preview||image?.length!=0)&&
                                        <div>
                                            <div className='mb-2 d-flex align-items-center justify-content-between'>
                                                <img src={image?.preview ?image?.preview:image} alt='img' style={{width:'100px',height:'100px'}}/>
                                                <button onClick={()=>{setImage(null)}}
                                                className='btn btn-danger ms-auto'>Delete</button>
                                            </div>
                                        </div>
                                }
                                {errors?.status &&<span className={styles['modal__form-input-error-message']}>{errors.status?.message}</span>}
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

export default AddEditCategoryModal