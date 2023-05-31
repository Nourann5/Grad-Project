import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './GetStarted.module.css'
import {ReactComponent as StarIcon} from 'assets/icons/star.svg'


function GetStarted() {
  return (
    <section id={styles["get-started"]}>
        <Container>
            <Row>
                
                <Col md='6' xs='12'>
                    <div className={styles["get-started__img"]}></div>
                </Col>
                <Col md='6' xs='12'>
                    <h2 className={styles["get-started__heading"]}>
                        HOW TO <span className={styles["get-started__heading-span"]}>GET STARTED</span> .. !
                    </h2>
                    <p className={styles["get-started__para"]}>
                        Lorem ipsum dolor sit amet, consetetur sadipscing Lorem ipsum dolor sit amet, consetetur sadipscing
                    </p>
                    <div className={styles["get-started__features"]}>
                        <div className={styles["get-started__feature"]}>
                            <div className={styles["get-started__icon"]}>
                                <StarIcon className={styles['get-started__icon-svg']}/>
                            </div>
                            <div className={styles["get-started__feature-desc"]}>
                                <h3 className={styles["get-started__feature-heading"]}>
                                HEADLINE
                                </h3>
                                <p className={styles["get-started__feature-para"]}>
                                Lorem ipsum dolor sit amet, consetetur sadipscing Lorem
                                </p>
                            </div>
                        </div>
                        <div className={styles["get-started__feature"]}>
                            <div className={styles["get-started__icon"]}>
                                <StarIcon className={styles['get-started__icon-svg']}/>
                            </div>
                            <div className={styles["get-started__feature-desc"]}>
                                <h3 className={styles["get-started__feature-heading"]}>
                                    HEADLINE
                                </h3>
                                <p className={styles["get-started__feature-para"]}>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing Lorem
                                </p>
                            </div>
                        </div>
                        <div className={styles["get-started__feature"]}>
                            <div className={styles["get-started__icon"]}>
                                <StarIcon className={styles['get-started__icon-svg']}/>
                            </div>
                            <div className={styles["get-started__feature-desc"]}>
                                <h3 className={styles["get-started__feature-heading"]}>
                                    HEADLINE
                                </h3>
                                <p className={styles["get-started__feature-para"]}>
                                    Lorem ipsum dolor sit amet, consetetur sadipscing Lorem
                                </p>
                            </div>
                        </div>

                    </div>
                </Col>
            </Row>
        </Container>
    </section>
  )
}

export default GetStarted