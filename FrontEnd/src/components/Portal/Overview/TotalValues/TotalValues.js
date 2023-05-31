import React from 'react'
import styles from './TotalValues.module.css'
import {ReactComponent as CoursePlanPortalIcon} from 'assets/icons/coursePlanPortal.svg'
import {ReactComponent as ExamsPortalIcon} from 'assets/icons/examsPortal.svg'
import {ReactComponent as GroupsPortalIcon} from 'assets/icons/groupsPortal.svg'
import {ReactComponent as MembersPortalIcon} from 'assets/icons/membersPortal.svg'
function TotalValues() {
    return (
        <div className={styles['overview__total-values-statistics-wrapper']}>
            <div className={styles['overview__total-values-statistics']}>
                <div className={styles['overview__total-values-wrapper']}>
                    <h3 className={styles['overview__total-values-statistics-title']}>Total Tests</h3>
                    <h4 className={styles['overview__total-values-statistics-value']}>79</h4>
                </div>
                <div className={styles['overview__total-icon-wrapper']}>
                    <ExamsPortalIcon className={styles['overview__total-icon']}/>
                </div>
            </div>
            <div className={styles['overview__total-values-statistics']}>
                <div className={styles['overview__total-values-wrapper']}>
                    <h3 className={styles['overview__total-values-statistics-title']}>Total Courses</h3>
                    <h4 className={styles['overview__total-values-statistics-value']}>50</h4>
                </div>
                <div className={styles['overview__total-icon-wrapper']}>
                    <CoursePlanPortalIcon className={styles['overview__total-icon']}/>
                </div>
            </div>
            <div className={styles['overview__total-values-statistics']}>
                <div className={styles['overview__total-values-wrapper']}>
                    <h3 className={styles['overview__total-values-statistics-title']}>Total Groups</h3>
                    <h4 className={styles['overview__total-values-statistics-value']}>20</h4>
                </div>
                <div className={styles['overview__total-icon-wrapper']}>
                    <GroupsPortalIcon className={styles['overview__total-icon']}/>
                </div>
            </div>
            <div className={styles['overview__total-values-statistics']}>
                <div className={styles['overview__total-values-wrapper']}>
                    <h3 className={styles['overview__total-values-statistics-title']}>Total Students</h3>
                    <h4 className={styles['overview__total-values-statistics-value']}>1500</h4>
                </div>
                <div className={styles['overview__total-icon-wrapper']}>
                    <MembersPortalIcon className={styles['overview__total-icon']}/>
                </div>
            </div>
            
        </div>
    )
}

export default TotalValues