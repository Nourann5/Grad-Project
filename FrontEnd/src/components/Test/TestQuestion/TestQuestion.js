import React, { useEffect } from 'react'
import { useFormContext } from 'react-hook-form';
import styles from './TestQuestion.module.css'
function TestQuestion({question ,questionNumber ,activeQuestion}) {
    const { register } = useFormContext();
   
    return (
        <div className={`${styles["test__content"]} ${questionNumber ===activeQuestion?'':'d-none'}`}>
            <div className={styles["test__info"]} >
                <div  
                dangerouslySetInnerHTML={{__html: question?.question_info}}
                />
            </div>

                <div className={`${styles["test__question"]}`}>
                    <h2 className={styles["test__question-heading"]}>
                        <div  
                            dangerouslySetInnerHTML={{__html: question?.question_name}}
                        />
                        {/* {question?.question_name} */}
                    </h2>
                    {
                        question?.question_answer_type==='input' ?
                            <div className={styles["test__input-answer"]}>
                                <input type="text" className="form-control" {...register(`test__answer${questionNumber}`)} placeholder=""/>
                            </div>
                            :
                            <div className={styles["test__choices"]}>
                                {
                                    question?.question_answers.length!==0 &&
                                        question?.question_answers.map((answer,index)=>(
                                            <div className={styles["test__choice"]} key={answer.id+index}>
                                                <input 
                                                    type= {question?.question_answer_type==='single'?'radio' :'checkbox'}
                                                    className={`${styles["test__choice-radio"]} `} 
                                                    {...register(`test__answer${questionNumber}`)} 
                                                    value={answer?.answer_alpha} 
                                                    id={`test__choices${questionNumber}${index}`}
                                                />

                                                <label htmlFor={`test__choices${questionNumber}${index}`} className='d-flex'>
                                                    {/* <span className={styles["test__choice-alpha"]}>{answer?.answer_alpha} - </span> */}
                                                    {/* <span className={styles["test__choice-alpha"]}>{answer?.answer_alpha} - </span> */}
                                                    {/* {answer?.answer_name} */}
                                                    <span className={styles["test__choice-alpha"]}
                                                        dangerouslySetInnerHTML={{__html: answer?.answer_alpha}}
                                                    /> -
                                                    <div  
                                                        dangerouslySetInnerHTML={{__html: answer?.answer_name}}
                                                    />
                                                </label>
                                            </div>
                                        ))
                                }
                            </div>
                    }
            </div>
        </div>
    )
}

export default TestQuestion