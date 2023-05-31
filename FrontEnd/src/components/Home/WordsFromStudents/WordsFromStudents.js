import React, { useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import Carousel from 'react-bootstrap/Carousel';
import styles from './WordsFromStudents.module.css'

import {ReactComponent as CommentsIcon} from 'assets/icons/comments.svg'
import {ReactComponent as QuoteDownIcon} from 'assets/icons/quoteDown.svg'
import {ReactComponent as QuoteTopIcon} from 'assets/icons/quoteTop.svg'
import {ReactComponent as LeftAnglePagIcon} from 'assets/icons/leftAnglePag.svg'
import {ReactComponent as RightAnglePagIcon} from 'assets/icons/rightAnglePag.svg'
import imgSrc from 'assets/icons/comments.png'

function WordsFromStudents() {
    const [index, setIndex] = useState(0);
    const handleSelect = (selectedIndex, e) => {
        setIndex(selectedIndex);
    };
  return (
    
    <div id={styles["comments"]}>
        <Container>
            <Row>
                <div className={`${styles["comments__content-cont"]} ${styles["comments__content-cont--responsive"]} d-none`}>
                    <h2 className={styles["comments__content-heading"]}>
                        WORDS FROM OUR STUDENTS
                    </h2>
                    <CommentsIcon className={styles["comments__content-heading-icon"]}/>
                </div>

                <Col lg='5' xs='12'>
                    <div className={`${styles["comments__img-cont"]} d-flex`}>
                        <img src={imgSrc} alt="comments" className={`${styles["comments__img"]} m-auto`}/>
                    </div>
                </Col>

                <Col lg='7' xs='12'>
                    <div className={styles["comments__content"]}>
                        <div className={styles["comments__content-cont"]}>
                            <h2 className={styles["comments__content-heading"]}>
                            WORDS<br/> FROM OUR Students
                            </h2>
                            <CommentsIcon className={styles["comments__content-heading-icon"]}/>

                        </div>
                        <div className={styles["comments__comments"]}>
                            <Carousel 
                            activeIndex={index} 
                            onSelect={handleSelect}
                            className={`${styles["carousel"]}`} 
                            indicators={false} >
                                <Carousel.Item className={`${styles["carousel-item"]}`}>
                                    
                                    <Carousel.Caption className={`${styles["carousel-caption"]}`}>
                                        <div className={styles["comments__comments-top-quote"]}>
                                            <QuoteTopIcon
                                            className={`${"comments__comments-quote"} ${"comments__comments-top-quote-icon"}`}/>
                                        </div>
                                        <p className={styles["comments__para"]}>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing Lorem ipsum dolor sit amet, consetetur sadipscing Lorem ipsum dolor sit amet consetetur sadipscing Lorem ipsum
                                        </p>
                                        <div className={styles["comments__comments-foot"]}>
                                            <QuoteDownIcon
                                                className={`${"comments__comments-quote"} ${"comments__comments-down-quote-icon"}`}/>
                                            <p className={styles['comments__owner']}>
                                                Ahmed H. Ibrahim
                                            </p>
                                            <div className={styles["comments__comments-nav"]}>
                                                <button className={`${styles["carousel-control-prev"]}`} >
                                                    <LeftAnglePagIcon  className={styles["carousal__nav-icon"]} onClick={() => handleSelect('prev')}/>
                                                </button>
                                                <button className={`${styles["carousel-control-next"]}`} >
                                                    <RightAnglePagIcon className={styles["carousal__nav-icon"]} onClick={() => handleSelect('next')}/>
                                                </button>
                                            </div>

                                        </div>

                                    </Carousel.Caption>
                                </Carousel.Item>
                                <Carousel.Item className={`${styles["carousel-item"]}`}>
                                    
                                    <Carousel.Caption className={`${styles["carousel-caption"]}`}>
                                        <div className={styles["comments__comments-top-quote"]}>
                                            <QuoteTopIcon
                                            className={`${"comments__comments-quote"} ${"comments__comments-top-quote-icon"}`}/>
                                        </div>
                                        <p className={styles["comments__para"]}>
                                            Lorem ipsum dolor sit amet, consetetur sadipscing Lorem ipsum dolor sit amet, consetetur sadipscing Lorem ipsum dolor sit amet consetetur sadipscing Lorem ipsum
                                        </p>
                                        <div className={styles["comments__comments-foot"]}>
                                            <QuoteDownIcon
                                                className={`${"comments__comments-quote"} ${" comments__comments-down-quote-icon"}`}/>
                                            <p className={styles['comments__owner']}>
                                                Ahmed H. Ibrahim
                                            </p>
                                            <div className={styles["comments__comments-nav"]}>
                                            <button className={`${styles["carousel-control-prev"]}`} onClick={() => this.toggleCarousel('prev')}>
                                                    <LeftAnglePagIcon  className={styles["carousal__nav-icon"]}/>
                                                </button>
                                                <button className={`${styles["carousel-control-next"]}`} onClick={() => this.toggleCarousel('next')}>
                                                    <RightAnglePagIcon className={styles["carousal__nav-icon"]}/>
                                                </button>
                                            </div>

                                        </div>

                                    </Carousel.Caption>
                                </Carousel.Item>
                            </Carousel>
                        
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    </div>
        
  );
}
export default WordsFromStudents