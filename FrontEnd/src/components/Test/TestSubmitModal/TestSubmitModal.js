import React, { useState } from 'react'
import { Modal } from 'react-bootstrap';
import {ReactComponent as ExitIcon} from 'assets/icons/exit.svg'

import styles from './TestSubmitModal.module.css'
function TestSubmitModal({EndExamButtonComp ,endExam}) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    let ButtonComponent = EndExamButtonComp?.type
    
    return (
        <>
        <ButtonComponent openSubmitModal={handleShow}/>

        <Modal show={show} onHide={handleClose}  size="lg" centered>
            <div className={`${styles["modal-header"]} modal-header border-0`}>
                <button type="button" className={`${styles["close"]} close ms-auto`} onClick={handleClose}>
                    <ExitIcon className={styles['modal__exit-icon']}/>
                </button>
            </div>
            <div className={`${styles["modal-body"]} modal-body`}>
                <h5 className={`${styles["modal-title__main"]} modal-title`}>End Exam</h5>
                <h6 className={`${styles["modal-title__second"]} modal-title`}> Are You Sure You Want To End The Exam ?</h6>
                <div className={styles['submit-modal__buttons-cont']}>
                    <button type='button' className={styles['submit-modal__back-button']} onClick={handleClose}>No , Go Back</button>
                    <button className={styles['submit-modal__confirm-button']} onClick={endExam}>Yes , End The Exam</button>
                    {/* <input type='submit'  className={styles['submit-modal__confirm-button']} value='Yes , End The Exam'/> */}
                </div>
            </div>
        </Modal>
        </>
  )
}

export default TestSubmitModal