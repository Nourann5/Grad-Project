import React, { useEffect } from 'react'
import styles from './TestControls.module.css'
import {ReactComponent as InvoLogo} from 'assets/icons/InvoLogo.svg'

import {ReactComponent as QuestionIcon} from 'assets/icons/question.svg'
import {ReactComponent as FlagIcon} from 'assets/icons/flag.svg'
import {ReactComponent as APlusIcon} from 'assets/icons/aPlus.svg'
import {ReactComponent as AminusIcon} from 'assets/icons/aMinus.svg'
import {ReactComponent as TimerIcon} from 'assets/icons/timer.svg'
import TestNavigationModal from '../TestNavigationModal/TestNavigationModal'
import TestSubmitModal from '../TestSubmitModal/TestSubmitModal'

function TestControls({activeQuestion,changeActiveQuestion ,testData ,changeQuestionFlagStatus,flaggedQuestions,endExam}) {
    const OpenNavButtonComp= ({openNavigationModal})=>{
        return(
            <button type='button' className={`${styles["test__control-button"]} btn`} onClick={openNavigationModal} >
                <QuestionIcon className={styles["test__control-button-icon"]}/>
            </button>
        )
    }

    const EndExamButtonComp= ({openSubmitModal})=>{
        return(
            <button type='button' className={`${styles["test__control-end-task"]} btn mx-auto`} onClick={openSubmitModal}>
                End Task
            </button>
        )
    }

    useEffect(()=>{

    },[])

  return (
        <div className={styles["test__controls"]}>
            <div className={styles["test__controls__cont"]}>
                <InvoLogo className={styles['test-controls__logo']}/>

                <TestNavigationModal 
                    OpenNavButtonComp={<OpenNavButtonComp/>}
                    changeActiveQuestion={changeActiveQuestion}
                    testData={testData}
                    changeQuestionFlagStatus={changeQuestionFlagStatus}
                    flaggedQuestions={flaggedQuestions}
                    />
                
                <button type='button' className={`${styles["test__control-button"]} btn`} onClick={()=>{changeQuestionFlagStatus(activeQuestion)}}>
                    <FlagIcon className={styles["test__control-button-icon"]}/>
                </button>
                <button type='button' className={`${styles["test__control-button"]} btn`}>
                    <APlusIcon className={styles["test__control-button-icon"]}/>
                </button>
                <button type='button' className={`${styles["test__control-button"]} btn`}>
                    <AminusIcon className={styles["test__control-button-icon"]}/>
                </button>
            </div>

            <TestSubmitModal EndExamButtonComp={<EndExamButtonComp/>} endExam={endExam}/>

            <div className={styles["test__timer-cont"]}>
                <TimerIcon className={styles["test__control-button-icon"]}/>
                <span className={styles["test__show-time js-test__show-time-min"]}>
                20
                </span>:
                <span className={styles["test__show-time js-test__show-time-sec"]}>
                85
                </span>
            </div>
        </div>
  )
}

export default TestControls