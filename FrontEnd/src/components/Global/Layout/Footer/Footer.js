import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './Footer.module.css'
import {ReactComponent as FacebookFooterIcon} from 'assets/icons/facebookFooter.svg'
import {ReactComponent as TwitterFooterIcon} from 'assets/icons/twitterFooter.svg'
import {ReactComponent as InstagramFooterIcon} from 'assets/icons/linkedinFooter.svg'
import {ReactComponent as LogoFooterIcon} from 'assets/icons/logoFooter.svg'

function Footer() {
  return (
    <footer>
        <Container className="mb-5">
            <Row>
                <Col lg='5' xs='12' className="text-lg-start text-center">
                    <a href="#" className={styles["footer__logo-link"]}>
                        <LogoFooterIcon className={styles["footer__logo"]}/>
                    </a>
                    <h3 className={styles["footer__subscribe-heading"]}>
                        Subscribe to our Newsletter
                    </h3>
                    <p className={styles["footer__subscribe-para"]}>Lorem ipsum dolor sit amet consetetur sadi Lorem ipsum</p>
                    <form className={styles["footer__subscribe-form"]}>
                        <input type="email" className={`${styles['footer__subscribe-email']} form-control`} placeholder='E mail'/>
                        <button type="submit" className={styles["footer__subscribe-submit-button"]}>Subscribe</button>
                    </form>
                </Col>
                <Col lg='7' xs='12'>
                    <Row>
                        <Col md='4' xs='6' className="m-auto">
                            <div className={styles["footer__links-cont"]}>
                                <h4 className={styles["footer__links-heading"]}>PORTALS</h4>
                                <ul className={styles["footer__links-ul"]}>
                                    <li className={styles["footer__links-li"]}>
                                        <a href="#" className={styles["footer__links-link"]}>Student</a>
                                    </li>
                                    <li className={styles["footer__links-li"]}>
                                        <a href="#" className={styles["footer__links-link"]}>Teacher</a>
                                    </li>
                                    <li className={styles["footer__links-li"]}>
                                        <a href="#" className={styles["footer__links-link"]}>Center</a>
                                    </li>
                                    <li className={styles["footer__links-li"]}>
                                        <a href="#" className={styles["footer__links-link"]}>University</a>
                                    </li>
                                </ul>
                            </div>
                        </Col>

                        <Col md='4' xs='6' className="m-auto">
                            <div className={styles["footer__links-cont"]}>
                                <h4 className={styles["footer__links-heading"]}>RESOURCES</h4>
                                <ul className={styles["footer__links-ul"]}>
                                    <li className={styles["footer__links-li"]}>
                                        <a href="#" className={styles["footer__links-link"]}>Features</a>
                                    </li>
                                    <li className={styles["footer__links-li"]}>
                                        <a href="#" className={styles["footer__links-link"]}>Courses</a>
                                    </li>
                                    <li className={styles["footer__links-li"]}>
                                        <a href="#" className={styles["footer__links-link"]}>Pricing</a>
                                    </li>
                                    <li className={styles["footer__links-li"]}>
                                        <a href="#" className={styles["footer__links-link"]}>Get Started</a>
                                    </li>
                                </ul>
                            </div>
                        </Col>
                        
                        <Col md='4' xs='6' className="m-auto">
                            <div className={styles["footer__links-cont"]}>
                                <h4 className={styles["footer__links-heading"]}>LINKS</h4>
                                <ul className={styles["footer__links-ul"]}>
                                <li className={styles["footer__links-li"]}>
                                    <a href="#" className={styles["footer__links-link"]}>Contact us</a>
                                </li>
                                <li className={styles["footer__links-li"]}>
                                    <a href="#" className={styles["footer__links-link"]}>About us</a>
                                </li>
                                <li className={styles["footer__links-li"]}>
                                    <a href="#" className={styles["footer__links-link"]}>Terms & Conditions</a>
                                </li>
                                <li className={styles["footer__links-li"]}>
                                    <a href="#" className={styles["footer__links-link"]}>Privacy Policy</a>
                                </li>
                                </ul>
                            </div>
                        </Col>

                    </Row>
                
                </Col>
            </Row>
        </Container>
        <div className={styles["footer__copyright"]}>
            <h5 className={styles["footer__copyright-cont"]}>Copyright INVO 2022. All Rights Reserved</h5>
            <ul className={styles["footer__copyright-list"]}>
                <li className={styles["footer__copyright-item"]}>
                    <a href="#" className={styles["footer__copyright-link"]}>
                        <FacebookFooterIcon className={styles["footer__copyright-social"]}></FacebookFooterIcon>
                        
                    </a>
                </li>
                <li className={styles["footer__copyright-item"]}>
                    <a href="#" className={styles["footer__copyright-link"]}>
                        <TwitterFooterIcon className={styles["footer__copyright-social"]}/>
                    </a>
                </li>
                <li className={styles["footer__copyright-item"]}>
                    <a href="#" className={styles["footer__copyright-link"]}>
                        <InstagramFooterIcon className={styles["footer__copyright-social"]}/>
                    </a>
                </li>
            </ul>
        </div>
    </footer>
  )
}

export default Footer