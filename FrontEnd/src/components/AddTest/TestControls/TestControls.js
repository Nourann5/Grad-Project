import React, { useEffect } from 'react'
import styles from './TestControls.module.css'
import {ReactComponent as InvoLogo} from 'assets/icons/InvoLogo.svg'

import {ReactComponent as QuestionIcon} from 'assets/icons/question.svg'
import {ReactComponent as PlusIcon} from 'assets/icons/plus.svg'
import {ReactComponent as PlayTest} from 'assets/icons/playTest.svg'
import {ReactComponent as DeleteXIcon} from 'assets/icons/deleteX.svg'
import {ReactComponent as MenuIcon} from 'assets/icons/menu.svg'
import {ReactComponent as AminusIcon} from 'assets/icons/aMinus.svg'
import {ReactComponent as TimerIcon} from 'assets/icons/timer.svg'
import TestSubmitModal from '../TestSubmitModal/TestSubmitModal'
import { Link } from 'react-router-dom'
    // console.log('QuestionConfiguration')

function TestControls({addQuestion,deleteQuestion ,questionslCount ,endExam,toggleSideNavBar}) {
    const EndExamButtonComp= ({openSubmitModal})=>{
        return(
            <button type='button' className={`${styles["test__control-end-task"]} btn mx-auto`} onClick={openSubmitModal}>
                Add Questions
            </button>
        )
    }

  return (
        <div className={styles["test__controls"]}>
            <div className={styles["test__controls__cont"]}>

                <button 
                    type='button' 
                    className={`${styles["test__control-button"]} ${styles["test__control-button--rotate"]} ${styles["test__control-button--hidden"]} btn`}
                    onClick={toggleSideNavBar}
                >
                    <MenuIcon className={styles["test__control-button-icon"]}/>
                </button>
                <Link to='/portal/preview-add-test' target='_blank'><PlayTest className={styles["test__control-button-icon"]}/></Link>
                
                {/* <button type='button' className={`${styles["test__control-button"]} btn`}>
                    <APlusIcon className={styles["test__control-button-icon"]}/>
                </button>
                <button type='button' className={`${styles["test__control-button"]} btn`}>
                    <AminusIcon className={styles["test__control-button-icon"]}/>
                </button> */}
            </div>

            <TestSubmitModal EndExamButtonComp={<EndExamButtonComp/>} endExam={endExam}/>
            <div className={styles['add-test__control-wrapper']}>
                {
                    questionslCount>1&&
                        <button type="button" className={styles['add-test__delete-button']} onClick={deleteQuestion}>
                            <DeleteXIcon className={styles['add-test__delete-button-icon']}/>
                        </button>
                }
                <button type="button" className={styles['add-test__add-button']} onClick={addQuestion}>
                    <PlusIcon className={styles['add-test__add-button-icon']}/>
                </button>
            </div>

            {/* <div className={styles["test__timer-cont"]}>
                <TimerIcon className={styles["test__control-button-icon"]}/>
                <span className={styles["test__show-time js-test__show-time-min"]}>
                20
                </span>:
                <span className={styles["test__show-time js-test__show-time-sec"]}>
                85
                </span>
            </div> */}
        </div>
  )
}

export default TestControls