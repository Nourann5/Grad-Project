import Cookies from 'js-cookie'
import React, { useState } from 'react'
import { FormProvider, useForm } from 'react-hook-form'
import { useDispatch } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { loggingIn } from 'store/Login/LoginActions'
import { axiosConfig } from 'utils/axiosConfig'
import RegisterFirst from './RegisterFirst'
import RegisterSecond from './RegisterSecond'

function Register() {
    const methods = useForm()
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [currentActiveForm ,setCurrentActiveForm] = useState(0)
    const [isSubmitting , setIsSubmitting]=useState(false)
    let submitForm =(data)=>{
      let formData =new FormData()
      formData.append(`name`,methods.getValues()['name'])
      formData.append(`email`,methods.getValues()['email'])
      formData.append(`user_type`,methods.getValues()['user_type'])
      formData.append(`password`,methods.getValues()['password'])
      formData.append(`confirm_password`,methods.getValues()['password_confirmation'])
      // Object.keys(methods.getValues()).forEach(key=>{
      //     formData.append(`${key}`,methods.getValues()[key])
      // })
      // formData.append(`permissions[]`,'categories-create')
      setIsSubmitting(true)
      axiosConfig.post('user/create-user',formData).then(res=>{
          setIsSubmitting(false)
          toast.success('User Createrd Successfully')
          
          Cookies.set('token',res?.data?.data?.token)
          Cookies.set('user',JSON.stringify(res?.data?.data?.user))
          // localStorage.setItem('token',res.data.token)
          // Cookies.set('permissions',JSON.stringify(res.data.permission))
          dispatch(loggingIn(res.data))
          navigate('/portal')
      }).catch(err=>{
        setIsSubmitting(false)
        let errors = err.response.data.errors
        Object.keys(errors).forEach(error=>{
          toast.error(errors[error][0])
        })
          // setIsSubmitting(false)
      })
  }
    
  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(submitForm)}>
        {
            currentActiveForm ===0&&<RegisterFirst setCurrentActiveForm={setCurrentActiveForm}/>
        }
        {
            currentActiveForm ===1&&<RegisterSecond setCurrentActiveForm={setCurrentActiveForm} isSubmitting={isSubmitting}/>
        }
      </form>

    </FormProvider>
  )
}

export default Register