import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './Courses.module.css'
import {ReactComponent as PhysicsIcon} from 'assets/icons/pysics.svg'
import {ReactComponent as MathIcon} from 'assets/icons/math.svg'
import {ReactComponent as LiteralIcon} from 'assets/icons/literal.svg'
import {ReactComponent as ChemistryIcon} from 'assets/icons/chemistry.svg'

function Courses() {
  return (
    <section id={styles["courses"]}>
        <Container >
            <h2 className={styles["courses__heading"]}>
                Courses
            </h2>
            <p className={styles["courses__desc"]}>
                Lorem ipsum dolor sit amet, consetetur sadipscing Lorem ipsum dolor sit amet, consetetur sadipscing
            </p>
            <Row>
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
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default Courses