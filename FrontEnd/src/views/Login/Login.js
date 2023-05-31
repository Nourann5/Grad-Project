import LoginForm from 'components/Login/LoginForm/LoginForm'
import LoginHeader from 'components/Login/LoginHeader/LoginHeader'
import React from 'react'

function Login() {
  return (
    <>
        <section className='authentication'>
            <LoginHeader/>
            <LoginForm/>
        </section>
    </>
  )
}

export default Login