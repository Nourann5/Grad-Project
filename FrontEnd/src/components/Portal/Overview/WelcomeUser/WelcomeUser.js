import React from 'react'
import styles from './WelcomeUser.module.css'
import {ReactComponent as StudentIcon} from 'assets/icons/studentIcon.svg'
import {ReactComponent as TeacherIcon} from 'assets/icons/teacherIcon.svg'
import {ReactComponent as SchoolIcon} from 'assets/icons/schoolIcon.svg'
import {ReactComponent as CenterIcon} from 'assets/icons/centerIcon.svg'
import {ReactComponent as CenterAcademy} from 'assets/icons/centerAcademy.svg'
import {ReactComponent as ColleageIcon} from 'assets/icons/colleageIcon.svg'
import {ReactComponent as UniversityIcon} from 'assets/icons/universityIcon.svg'
import {ReactComponent as MembersPortalIcon} from 'assets/icons/membersPortal.svg'
function WelcomeUser() {
  return (
    <div className={styles['overview__welcome-user']}>
        <div className={styles['overview__welcome-user-type-wrapper']}>
          <MembersPortalIcon className={styles['overview__welcome-user-type-icon']}/>
        </div>
        <div className={styles['overview__welcome-user-info']}>
          <h2 className={styles['overview__welcome-user-info-title']}>Teacher Portal</h2>
          <h3 className={styles['overview__welcome-user-info-welcome']}>Welcome ali mohammed In your dashboard</h3>
        </div>
        <div>

        </div>
    </div>

  )
}

export default WelcomeUser