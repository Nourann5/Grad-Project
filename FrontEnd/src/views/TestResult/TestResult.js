import TestResultTable from 'components/TestResults/TestResultTable/TestResultTable'
import React, { useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './TestResult.module.css'
import user1Src from 'assets/imgs/user1.jpg'
import user2Src from 'assets/imgs/user2.jpg'
import user3Src from 'assets/imgs/user3.jpg'
import user4Src from 'assets/imgs/user4.jpg'
function TestResult() {
    const [userData ,setUserData] =useState([
        {
            id:1,
            user_img:user1Src,
            user_name:'Esthera Jackson',
            user_email:'esthera@simmmple.com',
            user_group:'Group 1',
            status:2 
        },
        {
            id:2,
            user_img:user2Src,
            user_name:'Esthera Jackson',
            user_email:'esthera@simmmple.com',
            user_group:'Group 1',
            status:1 
        },
        {
            id:3,
            user_img:user3Src,
            user_name:'Esthera Jackson',
            user_email:'esthera@simmmple.com',
            user_group:'Group 1',
            status:2 
        },
        {
            id:4,
            user_img:user4Src,
            user_name:'Esthera Jackson',
            user_email:'esthera@simmmple.com',
            user_group:'Group 1',
            status:1 
        },
        {
            id:5,
            user_img:user2Src,
            user_name:'Esthera Jackson',
            user_email:'esthera@simmmple.com',
            user_group:'Group 1',
            status:2 
        },
        {
            id:6,
            user_img:user4Src,
            user_name:'Esthera Jackson',
            user_email:'esthera@simmmple.com',
            user_group:'Group 1',
            status:0 
        },
        {
            id:7,
            user_img:user2Src,
            user_name:'Esthera Jackson',
            user_email:'esthera@simmmple.com',
            user_group:'Group 1',
            status:1 
        },
        {
            id:8,
            user_img:user1Src,
            user_name:'Esthera Jackson',
            user_email:'esthera@simmmple.com',
            user_group:'Group 1',
            status:0 
        },
    ])
  return (
    <>
        <section id={styles["test-result"]}>
            <Container fluid>
                <Row>
                    <Col lg='4' xs='12'>
                        <div className={styles["test-result__stats-cont"]}>
                            <p className={styles["test-result__test-name"]}>Sat Test Name</p>
                            <p className={styles["test-result__test-degree"]}>
                                Result <span className={styles["test-result__test-degree-num"]}>85%</span>
                            </p>
                            <div className={styles["test-result__answeres-filter"]}>

                                <div className=
                                {`${styles["test-result__answeres-filter-shape"]} ${styles["test-result__answeres-filter-shape--correct"]}}`}></div>
                                <div className=
                                {`${styles["test-result__answeres-filter-shape"]} ${styles["test-result__answeres-filter-shape--not-correct"]}}`}></div>
                                <div className=
                                {`${styles["test-result__answeres-filter-shape"]} ${styles["test-result__answeres-filter-shape--not-answered"]}}`}></div>
                                <div className=
                                {`${styles["test-result__answeres-filter-shape"]} ${styles["test-result__answeres-filter-shape--all-answered"]}}`}></div>
                            </div>
                            <div className={styles["test-result__answeres-stats"]}>
                                <div className={styles["test-result__answeres-stat"]}>
                                    <p className={styles["test-result__answeres-stat-num"]}>18</p>
                                    <div className={`${styles["test-result__answeres-stat-shape"]} 
                                    ${styles["test-result__answeres-stat-shape--answered"]}`}></div>
                                    <p className={styles["test-result__answeres-stat-name"]}>Correct</p>
                                </div>
                                <div className={styles["test-result__answeres-stat"]}>
                                    <p className={styles["test-result__answeres-stat-num"]}>18</p>
                                    <div className={`${styles["test-result__answeres-stat-shape"]} 
                                    ${styles["test-result__answeres-stat-shape--wrong-answered"]}`}></div>
                                    {/* <div className="test-result__answeres-stat-shape test-result__answeres-stat-shape--wrong-answered"></div> */}
                                    <p className={styles["test-result__answeres-stat-name"]}>Not Answered</p>
                                </div>
                                <div className={styles["test-result__answeres-stat"]}>
                                    <p className={styles["test-result__answeres-stat-num"]}>18</p>
                                    <div className={`${styles["test-result__answeres-stat-shape"]} 
                                    ${styles["test-result__answeres-stat-shape--not-answered"]}`}></div>
                                    {/* <div className="test-result__answeres-stat-shape test-result__answeres-stat-shape--not-answered"></div> */}
                                    <p className={styles["test-result__answeres-stat-name"]}>Wrong</p>
                                </div>
                                
                            </div>
                        </div>

                    </Col>
                    <Col lg='8' xs='12'>
                        <TestResultTable userData={userData}/>
                    </Col>
                </Row>
            </Container>
        </section>
    </>
  )
}

export default TestResult