import React from 'react'
import styles from './FAQs.module.css'
import './FAQs.css'
import {ReactComponent as FaqIconIcon} from 'assets/icons/faqIcon.svg'
import {ReactComponent as MinusIcon} from 'assets/icons/minus.svg'
import { Accordion, Container } from 'react-bootstrap'

function FAQs() {
    return (
    <div  className={`${styles["faq"]} faq`}>
        <Container>
            <div className={styles["faq__heading-cont"]}>
                <FaqIconIcon className={styles["faq__icon"]}/>
                <h2 className={styles["faq__heading"]}>FREQUENTLY ASKED QUESTIONS</h2>
            </div>
            <Accordion>
                <Accordion.Item eventKey="0" className={styles['faq__accordion-item']}>
                    <Accordion.Header className={styles['faq__accordion-header']}>
                            <div className={styles['faq__accordion-header-content']}>

                                Lorem ipsum dolor sit amet consetetur sadipscing ?
                                <span className={`${styles["faq__accordion-icon-cont"]}`}>
                                    <MinusIcon className={styles["faq__accordion-icon"]}/>
                                    <MinusIcon className={`${styles["faq__accordion-icon"]} faq__accordion-icon--open`}/>
                                </span>
                            </div>
                    <Accordion.Body className={styles['faq__accordion-body']}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                    </Accordion.Header>
                </Accordion.Item>
                <Accordion.Item eventKey="1" className={styles['faq__accordion-item']}>
                    <Accordion.Header className={styles['faq__accordion-header']}>
                            <div className={styles['faq__accordion-header-content']}>

                                Lorem ipsum dolor sit amet consetetur sadipscing ?
                                <span className={`${styles["faq__accordion-icon-cont"]}`}>
                                    <MinusIcon className={styles["faq__accordion-icon"]}/>
                                    <MinusIcon className={`${styles["faq__accordion-icon"]} faq__accordion-icon--open`}/>
                                </span>
                            </div>
                    <Accordion.Body className={styles['faq__accordion-body']}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                    </Accordion.Header>
                </Accordion.Item>

                <Accordion.Item eventKey="2" className={styles['faq__accordion-item']}>
                    <Accordion.Header className={styles['faq__accordion-header']}>
                            <div className={styles['faq__accordion-header-content']}>

                                Lorem ipsum dolor sit amet consetetur sadipscing ?
                                <span className={`${styles["faq__accordion-icon-cont"]}`}>
                                    <MinusIcon className={styles["faq__accordion-icon"]}/>
                                    <MinusIcon className={`${styles["faq__accordion-icon"]} faq__accordion-icon--open`}/>
                                </span>
                            </div>
                    <Accordion.Body className={styles['faq__accordion-body']}>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                    eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                    minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                    aliquip ex ea commodo consequat. Duis aute irure dolor in
                    reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                    pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                    culpa qui officia deserunt mollit anim id est laborum.
                    </Accordion.Body>
                    </Accordion.Header>
                </Accordion.Item>
            </Accordion>

        </Container>
        </div>

    
  )
}

export default FAQs