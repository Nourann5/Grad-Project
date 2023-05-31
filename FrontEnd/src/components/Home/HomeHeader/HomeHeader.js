import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './HomeHeader.module.css'

import {ReactComponent as JoinPortalIcon} from 'assets/icons/joinPortal.svg'
import {ReactComponent as MoreInfoIcon} from 'assets/icons/moreInfo.svg'
import imgSrc from 'assets/imgs/homePageHeaderImg.png'
import { Link } from 'react-router-dom'
function HomeHeader() {
  return (
    <header className={styles['header']}>
        <Container fluid='lg' className='h-100'>
            <Row className='h-100'>
                <Col lg='6' className='h-100'>
                    <div className={styles['header__content-cont']}>
                        <div className={styles['header__content-note-cont']}>
                            <p className={styles['header__content-note']}>
                                <span className={styles['header__content-note-title']}>New!</span>
                                Lorem ipsum dolor sit amet, consetetur sadipscing
                            </p>
                        </div>
                        
                        <div className={styles['header__content']}>
                            <h1 className={`${styles['header__content-title']}`}>
                                A NICE SECTION HEADING
                            </h1>
                            <p className={styles['header__content-desc']}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt ut
                            </p>
                        </div>

                        <div className={styles['header__content-actions-cont']}>
                            <Link to='/register' className={`${styles["header__content-action-button"]}`}>
                                <JoinPortalIcon className={styles['header__content-actions-icon']}/>
                                join portal
                            </Link>
                            <button className={`${styles["header__content-action-button"]} ${styles["header__content-action--bg-dark"]}`}>
                                <MoreInfoIcon className={styles['header__content-actions-icon']}/>
                                More Info
                            </button>
                        </div>
                    </div>
                </Col>
                <Col lg='6'>
                    <div className={styles['header__img-cont']}>
                        <img src={imgSrc} alt='header img' className={styles['header__img']}/> 
                    </div>
                </Col>
            </Row>
        </Container>
    </header>
  )
}

export default HomeHeader