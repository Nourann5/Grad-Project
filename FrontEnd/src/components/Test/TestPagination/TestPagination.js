import React from 'react'
import styles from './TestPagination.module.css'
import {ReactComponent as RightAnglePagIcon} from 'assets/icons/rightAnglePag.svg'
import {ReactComponent as LeftAnglePagIcon} from 'assets/icons/leftAnglePag.svg'
import { useFormContext } from 'react-hook-form'

function TestPagination({testData,activeQuestion,changeActiveQuestion,flaggedQuestions}) {
    const { getValues } =useFormContext()
  return (
    <div className={styles["test__pagination"]}>
        <button type='button' className={`${styles["test__pagintaion-control-button"]} ${styles["test__prev-button"]}`} 
            onClick={() => changeActiveQuestion(activeQuestion <=1 ?activeQuestion:activeQuestion-1)}>
            <LeftAnglePagIcon/>
        </button>
        <ul className={`${styles["test__pagination-list"]}`}>
            {
                testData&& testData.map((_,index)=>(
                    <li key={index}>
                        <button type='button'
                            className=
                            {`
                                ${styles["test__pagination-link"]} 
                                ${activeQuestion ===index+1? styles["active"]:''}
                                ${flaggedQuestions.includes(index+1) ?styles["flagged-question"]:''}
                                ${(getValues()[`test__answer${index+1}`] &&getValues()[`test__answer${index+1}`].length !==0) ?styles["answered"]:''}
                            `}
                            onClick={() => changeActiveQuestion(index+1)}>
                            {index+1}
                        </button>
                    </li>
                ))
            }
            {/* <li className={`${styles["test__pagination-item"]} `}>
                <a className={`${styles["test__pagination-link"]} ${styles["active"]} js-test__pagination-link`}
                    data-question-number="1">1</a>
            </li>
            <li className={styles["test__pagination-item"]}>
                <a className={`${styles["test__pagination-link"]} ${styles["answered"]}  js-test__pagination-link`}
                    data-question-number="2">2</a>
            </li>
            <li className={styles["test__pagination-item"]}>
                <a className={`${styles["test__pagination-link"]} ${styles["flagged-question"]} js-test__pagination-link`}
                    data-question-number="3">3</a>
            </li>
            <li className={styles["test__pagination-item"]}>
                <a className={`${styles["test__pagination-link"]} js-test__pagination-link active`}>4</a>
            </li> */}
            
        </ul>
        <button type='button' className={`${styles["test__pagintaion-control-button"]} ${styles["test__next-button"]}`}
            onClick={() => changeActiveQuestion(activeQuestion >= testData.length ?activeQuestion:activeQuestion+1)}>
            <RightAnglePagIcon/>
        </button>
    </div>
  )
}

export default TestPagination