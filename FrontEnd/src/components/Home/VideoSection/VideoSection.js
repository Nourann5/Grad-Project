import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './VideoSection.module.css'
import {ReactComponent as CircleIcon} from 'assets/icons/circle.svg'
import {ReactComponent as PlayIcon} from 'assets/icons/play.svg'
import {ReactComponent as JoinPortalIcon} from 'assets/icons/joinPortal.svg'
import videoImgSrc from 'assets/imgs/video.png'
import { Link } from 'react-router-dom'
function VideoSection() {
  return (
    <section id ={styles["video"]}>
        <Container>
            <Row>
                <Col lg='6' xs='12' className="order-lg-1 order-2">
                    <div className="video__content-cont d-flex flex-column">
                        <h2 className={styles["video__heading"]}>A NICE HEADLINE</h2>
                        <p className={styles["video__para"]}>Lorem ipsum dolor sit amet, consetetur sadipsc ingipsum dolor sit amet, consetetur sadipscing</p>
                        <div className={styles["video__features"]}>
                            <div className={styles["video__feature"]}>
                                <CircleIcon className={styles["video__feature-icon"]}/>
                                LOREM IPSAM
                            </div>
                            <div className={styles["video__feature"]}>
                                <CircleIcon className={styles["video__feature-icon"]}/>
                                LOREM IPSAM
                            </div>
                            <div className={styles["video__feature"]}>
                                <CircleIcon className={styles["video__feature-icon"]}/>
                                LOREM IPSAM
                            </div>
                            <div className={styles["video__feature"]}>
                                <CircleIcon className={styles["video__feature-icon"]}/>
                                LOREM IPSAM
                            </div>
                        </div>
                        <Link to='/register' className={styles["video__join-portal"]}>
                            <JoinPortalIcon className="video__join-portal-icon"/>
                            Join Portal to Unlock all the Features
                        </Link>
                    </div>
                </Col>
                <Col lg='6' xs='12' className="order-lg-2 order-1">
                    <div className={styles["video__container"]}>
                        <div className={styles["video__cont"]}>
                            <div className={styles["video__overlay"]}></div>
                            <img src={videoImgSrc} className={styles["video__img"]} alt="video img"/>
                            <button className={styles["video__open-video"]}>
                                <PlayIcon className={styles["video__play-icon"]}/>
                            </button>
                        </div>
                    </div>
                
                </Col>
            </Row>

        </Container>

    </section>
  )
}

export default VideoSection