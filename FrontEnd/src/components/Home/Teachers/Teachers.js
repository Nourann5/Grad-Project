import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './Teachers.module.css'
import teacherIcon from 'assets/icons/teacherIcon.svg'
import {ReactComponent as PhysicsIcon} from 'assets/icons/pysics.svg'
import {ReactComponent as MathIcon} from 'assets/icons/math.svg'
import {ReactComponent as LiteralIcon} from 'assets/icons/literal.svg'
import {ReactComponent as ChemistryIcon} from 'assets/icons/chemistry.svg'
import { Link } from 'react-router-dom'

function Teachers({teachersData}) {
  return (
    <section id={styles["courses"]}>
        <Container >
            <h2 className={styles["courses__heading"]}>
                Teachers
            </h2>
            {/* <p className={styles["courses__desc"]}>
                Lorem ipsum dolor sit amet, consetetur sadipscing Lorem ipsum dolor sit amet, consetetur sadipscing
            </p> */}
            <Row>
                {
                    teachersData &&teachersData?.map(teacher=>(
                        <Col lg='3' md='4' xs='12' className="m-auto mb-3 mb-md-4 ">
                            <Link to={`/categories/${teacher?.id}`} className={styles["courses__content-link"]}>
                                <img src={teacher?.personal_photo||teacherIcon} className={styles["courses__content-icon"]}/>
                                <span className={styles["courses__content-title"]}>
                                    {teacher?.name}
                                </span>
                            </Link>
                        </Col>
                    ))
                }
                {/* <Col lg='3' md='4' xs='6' className="m-auto mb-3 mb-md-4 ">
                    <a href="#" className={styles["courses__content-link"]}>
                        <PhysicsIcon className={styles["courses__content-icon"]}/>
                        <span className={styles["courses__content-title"]}>
                            PHYSICS
                        </span>
                    </a>
                </Col>
                <Col lg='3' md='4' xs='6' className="m-auto mb-3 mb-md-4">
                    <a href="#" className={styles["courses__content-link"]}>
                        <MathIcon className={styles["courses__content-icon"]}/>
                        <span className={styles["courses__content-title"]}>
                            MATHS
                        </span>
                    </a>
                </Col>
                <Col lg='3' md='4' xs='6' className="m-auto mb-3 mb-md-4">
                    <a href="#" className={styles["courses__content-link"]}>
                        <LiteralIcon className={styles["courses__content-icon"]}/>
                        <span className={styles["courses__content-title"]}>
                            LITERACY
                        </span>
                    </a>
                </Col>
                <Col lg='3' md='4' xs='6' className="m-auto mb-3 mb-md-4">
                    <a href="#" className={styles["courses__content-link"]}>
                        <ChemistryIcon className={styles["courses__content-icon"]}/>
                        <span className={styles["courses__content-title"]}>
                            CHEMISTRY
                        </span>
                    </a>
                </Col>
                <Col lg='3' md='4' xs='6' className="m-auto mb-3 mb-md-4 ">
                    <a href="#" className={styles["courses__content-link"]}>
                        <PhysicsIcon className={styles["courses__content-icon"]}/>
                        <span className={styles["courses__content-title"]}>
                            PHYSICS
                        </span>
                    </a>
                </Col>
                <Col lg='3' md='4' xs='6' className="m-auto mb-3 mb-md-4">
                    <a href="#" className={styles["courses__content-link"]}>
                        <MathIcon className={styles["courses__content-icon"]}/>
                        <span className={styles["courses__content-title"]}>
                            MATHS
                        </span>
                    </a>
                </Col>
                <Col lg='3' md='4' xs='6' className="m-auto mb-3 mb-md-4">
                    <a href="#" className={styles["courses__content-link"]}>
                        <LiteralIcon className={styles["courses__content-icon"]}/>
                        <span className={styles["courses__content-title"]}>
                            LITERACY
                        </span>
                    </a>
                </Col>
                <Col lg='3' md='4' xs='6' className="m-auto mb-3 mb-md-4">
                    <a href="#" className={styles["courses__content-link"]}>
                        <ChemistryIcon className={styles["courses__content-icon"]}/>
                        <span className={styles["courses__content-title"]}>
                            CHEMISTRY
                        </span>
                    </a>
                </Col> */}
            </Row>
        </Container>
    </section>
  )
}

export default Teachers