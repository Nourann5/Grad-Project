import ForgetPasswordForm from 'components/ForgetPassword/ForgetPasswordForm/ForgetPasswordForm'
import ForgetPasswordHeader from 'components/ForgetPassword/ForgetPasswordHeader/ForgetPasswordHeader'
import React from 'react'

function Forget() {
  return (
    <>
        <section className='authentication'>
            <ForgetPasswordHeader/>
            <ForgetPasswordForm/>
        </section>
    </>
  )
}

export default Forget