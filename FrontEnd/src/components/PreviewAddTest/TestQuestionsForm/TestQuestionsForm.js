import React from 'react'
import TestQuestion from '../TestQuestion/TestQuestion'
// import styles from './TestQuestionsForm.module.css'
function TestQuestionsForm({testData , activeQuestion}) {
  
  return (
    <>
        {
            testData && testData.map((question,index)=>(
                <TestQuestion question ={question} questionNumber={index+1} activeQuestion={activeQuestion} key={question.id+index}/>
            ))
        }
    </>
  )
}

export default TestQuestionsForm