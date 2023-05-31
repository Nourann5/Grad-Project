import React from 'react'
import { Link } from 'react-router-dom'
import styles from './ReportsInfo.module.css'
function ReportsInfo() {
  return (
    <div className={styles['reports']}>
        <p className={styles['reports__description']}>
            You can see summary of your tests and other staff in the reports page
        </p>
        <Link to='/portal/reports' className={styles['reports__button']}>Reports</Link>
    </div>
  )
}

export default ReportsInfo