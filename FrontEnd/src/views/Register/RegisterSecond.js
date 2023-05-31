import React from 'react'
import RegisterHeaderSecond from 'components/RegisterSecond/RegisterHeaderSecond/RegisterHeaderSecond'
import RegisterFormSecond from 'components/RegisterSecond/RegisterFormSecond/RegisterFormSecond'
import { FormProvider, useFormContext } from 'react-hook-form'

function RegisterSecond({setCurrentActiveForm,isSubmitting}) {
  const methods =useFormContext()
  return (
    <>
        <section className='authentication'>
            <RegisterHeaderSecond setCurrentActiveForm={setCurrentActiveForm}/>
            <RegisterFormSecond isSubmitting={isSubmitting}/>
        </section>
    </>
  )
}

export default RegisterSecond