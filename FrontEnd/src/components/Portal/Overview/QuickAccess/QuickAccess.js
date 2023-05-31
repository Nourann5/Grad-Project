import React from 'react'
import { Link } from 'react-router-dom'
import styles from './QuickAccess.module.css'

import {ReactComponent as OverviewIcon} from 'assets/icons/overview.svg'
import {ReactComponent as CoursePlanPortalIcon} from 'assets/icons/coursePlanPortal.svg'
import {ReactComponent as ExamsPortalIcon} from 'assets/icons/examsPortal.svg'
import {ReactComponent as GroupsPortalIcon} from 'assets/icons/groupsPortal.svg'
import {ReactComponent as MaterialsPortalIcon} from 'assets/icons/materialsPortal.svg'
import {ReactComponent as MembersPortalIcon} from 'assets/icons/membersPortal.svg'
import {ReactComponent as ReportsPortalIcon} from 'assets/icons/reportsPortal.svg'
import {ReactComponent as TodolistPortalIcon} from 'assets/icons/todolistPortal.svg'
import {ReactComponent as ChatPortalIcon} from 'assets/icons/chatPortal.svg'
import {ReactComponent as SettingsPortalIcon} from 'assets/icons/settingsPortal.svg'
import { Col, Row } from 'react-bootstrap'
function QuickAccess() {
  return (
    <div className={styles['quick-access']}>
        <h2 className={styles['quick-access__title']}>
            Quick Access
        </h2>
        <div className={styles['quick-access__items-wrapper']}>
                    <div className={styles['quick-access__item']}>
                        <div className={styles['quick-access__item-content']}>
                        <Link to='/' className={styles['quick-access__link']}></Link>
                            <div className={styles['quick-access__item-icon-wrapper']}>
                                <OverviewIcon className={styles['quick-access__item-icon']}/>
                            </div>
                            <span className={styles['quick-access__item-value']}>Add Test</span>
                        </div>
                    </div>
                    <div className={styles['quick-access__item']}>
                        <div className={styles['quick-access__item-content']}>
                        <Link to='/' className={styles['quick-access__link']}></Link>
                            <div className={styles['quick-access__item-icon-wrapper']}>
                                <CoursePlanPortalIcon className={styles['quick-access__item-icon']}/>
                            </div>
                            <span className={styles['quick-access__item-value']}>All Test</span>
                        </div>
                    </div>
                    <div className={styles['quick-access__item']}>
                        <div className={styles['quick-access__item-content']}>
                        <Link to='/' className={styles['quick-access__link']}></Link>
                            <div className={styles['quick-access__item-icon-wrapper']}>
                                <ExamsPortalIcon className={styles['quick-access__item-icon']}/>
                            </div>
                            <span className={styles['quick-access__item-value']}>Add Group</span>
                        </div>
                    </div>
                    <div className={styles['quick-access__item']}>
                        <div className={styles['quick-access__item-content']}>
                        <Link to='/' className={styles['quick-access__link']}></Link>
                            <div className={styles['quick-access__item-icon-wrapper']}>
                                <GroupsPortalIcon className={styles['quick-access__item-icon']}/>
                            </div>
                            <span className={styles['quick-access__item-value']}>All Groups</span>
                        </div>
                    </div>
                    <div className={styles['quick-access__item']}>
                        <div className={styles['quick-access__item-content']}>
                        <Link to='/' className={styles['quick-access__link']}></Link>
                            <div className={styles['quick-access__item-icon-wrapper']}>
                                <MaterialsPortalIcon className={styles['quick-access__item-icon']}/>
                            </div>
                            <span className={styles['quick-access__item-value']}>All Materials</span>
                        </div>
                    </div>
                    <div className={styles['quick-access__item']}>
                        <div className={styles['quick-access__item-content']}>
                        <Link to='/' className={styles['quick-access__link']}></Link>
                            <div className={styles['quick-access__item-icon-wrapper']}>
                                <MembersPortalIcon className={styles['quick-access__item-icon']}/>
                            </div>
                            <span className={styles['quick-access__item-value']}>Add Member</span>
                        </div>
                    </div>
                    <div className={styles['quick-access__item']}>
                        <div className={styles['quick-access__item-content']}>
                        <Link to='/' className={styles['quick-access__link']}></Link>
                            <div className={styles['quick-access__item-icon-wrapper']}>
                                <ReportsPortalIcon className={styles['quick-access__item-icon']}/>
                            </div>
                            <span className={styles['quick-access__item-value']}>Reports</span>
                        </div>
                    </div>
                    <div className={styles['quick-access__item']}>
                        <div className={styles['quick-access__item-content']}>
                        <Link to='/' className={styles['quick-access__link']}></Link>
                            <div className={styles['quick-access__item-icon-wrapper']}>
                                <TodolistPortalIcon className={styles['quick-access__item-icon']}/>
                            </div>
                            <span className={styles['quick-access__item-value']}>Todolist</span>
                        </div>
                    </div>
                    <div className={styles['quick-access__item']}>
                        <div className={styles['quick-access__item-content']}>
                        <Link to='/' className={styles['quick-access__link']}></Link>
                            <div className={styles['quick-access__item-icon-wrapper']}>
                                <ChatPortalIcon className={styles['quick-access__item-icon']}/>
                            </div>
                            <span className={styles['quick-access__item-value']}>Chats</span>
                        </div>
                    </div>
                    <div className={styles['quick-access__item']}>
                        <div className={styles['quick-access__item-content']}>
                        <Link to='/' className={styles['quick-access__link']}></Link>
                            <div className={styles['quick-access__item-icon-wrapper']}>
                                <SettingsPortalIcon className={styles['quick-access__item-icon']}/>
                            </div>
                            <span className={styles['quick-access__item-value']}>Settings</span>
                        </div>
                    </div>
        </div>
    </div>
  )
}

export default QuickAccess