import React from 'react'
import styles from './PageBreadCrumb.module.css'
import { Container } from 'react-bootstrap'
import { NavLink } from 'react-router-dom'
import {ReactComponent as HomeIcon} from 'assets/icons/home.svg'

function PageBreadCrumb({breadCrumbLinks}) {
    return (
        <nav className={`${styles["breadcrumb-nav"]} breadcrumb-nav`}>
            <Container fluid='lg'>
                <ol className={`${styles["breadcrumb"]} breadcrumb`}>
                    <li className={`${styles["breadcrumb-item"]} breadcrumb-item`}>
                        <NavLink to='/'>
                            <HomeIcon className={styles["breadcrumb-nav__home-icon"]}/>
                        </NavLink>
                    </li>
                    {
                        breadCrumbLinks && breadCrumbLinks.map((link,index)=>(
                            link.pageLink !=='' ?
                            <li className={`${styles["breadcrumb-item"]} breadcrumb-item`} key={link.pageName+index}>
                                <NavLink to={link.pageLink}>
                                    {link.pageName}
                                </NavLink>
                            </li>
                            :
                            <li className={`${styles["breadcrumb-item"]} breadcrumb-item ${styles['active']}`} key={link.pageName+index}>{link.pageName}</li>
                        ))
                    }
                </ol>
            </Container>
        </nav>
    )
}

export default PageBreadCrumb