import RegisterHeader from 'components/Register/RegisterHeader/RegisterHeader'
import RegisterForm from 'components/Register/RegisterForm/RegisterForm'
import React from 'react'

function RegisterFirst({setCurrentActiveForm}) {
  return (
    <>
        <section className='authentication'>
            <RegisterHeader />
            <RegisterForm setCurrentActiveForm={setCurrentActiveForm}/>
        </section>
    </>
  )
}

export default RegisterFirst