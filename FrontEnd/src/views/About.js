import React from 'react'
import { useTranslation } from 'react-i18next'

function About() {
    const {t}=useTranslation()
  return (
    <div>{t('login_information')}</div>
  )
}

export default About