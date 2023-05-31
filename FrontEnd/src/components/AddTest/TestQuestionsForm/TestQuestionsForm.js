import React from 'react'
import { useFormContext } from 'react-hook-form'
import TestQuestion from '../TestQuestion/TestQuestion'
// import styles from './TestQuestionsForm.module.css'
function TestQuestionsForm({examData , activeQuestion ,changeExamData ,createAnswers,markAsCorrectAnswer ,changeQuestionAlphaAfterDeleteAnswer}) {
  // const current = 
  return (
    <>
        {/* { */}
            {/* // examData && examData.map((question,index)=>( */}
                {
                  examData?.length!=0 &&

                <TestQuestion
                  examData={examData} 
                  activeQuestion={activeQuestion} 
                  changeExamData={changeExamData}
                  createAnswers={createAnswers}
                  markAsCorrectAnswer ={markAsCorrectAnswer }
                  changeQuestionAlphaAfterDeleteAnswer ={changeQuestionAlphaAfterDeleteAnswer }
                  />
                }
                {/* <TestQuestion question ={examData[activeQuestion]} questionNumber={index+1} activeQuestion={activeQuestion}/> */}
            {/* // )) */}
        {/* } */}
    </>
  )
}

export default TestQuestionsForm