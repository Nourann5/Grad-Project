import React from 'react'
import styles from './TestQuestion.module.css'
import ReactQuill from 'react-quill';
import {ReactComponent as PlusIcon} from 'assets/icons/plus.svg'
import {ReactComponent as DeleteIcon} from 'assets/icons/delete.svg'
import {ReactComponent as CorrectIcon} from 'assets/icons/true.svg'
import 'react-quill/dist/quill.snow.css';
function TestQuestion({activeQuestion, changeExamData ,examData,createAnswers,markAsCorrectAnswer,changeQuestionAlphaAfterDeleteAnswer}) {

  let changeData = (data,type)=>{
    let modifiedData = [...examData]
    modifiedData[activeQuestion-1][type]=data
    changeExamData(modifiedData)
  }

  let changeAnswersData = (data,type,answerIndex)=>{
    let modifiedData = [...examData]
    modifiedData[activeQuestion-1].question_answers[answerIndex][type]=data
    changeExamData(modifiedData)
  }

  let deleteAnswer=(answerIndex,answerId)=>{
    let modifiedData = [...examData]
    modifiedData[activeQuestion-1].question_answers.splice(answerIndex,1)
    if(modifiedData[activeQuestion-1].question_correct_answer.includes(answerId)){
      modifiedData[activeQuestion-1].question_correct_answer = modifiedData[activeQuestion-1].question_correct_answer.filter(answer=>answer!=answerId)
    }
    changeExamData(modifiedData)
    changeQuestionAlphaAfterDeleteAnswer()
  }
    return (
        <div className={`${styles["test__content"]}`}>
          {
            examData?.[activeQuestion-1]?.screen_type ==='two'&&
              <div className={styles["test__info"]} >
                  <h2 className={styles["test__question-heading"]}>
                          Question Information {activeQuestion}
                  </h2>
                  <ReactQuill
                    className={styles['test__content-information-editor']}
                      onChange={(data)=>changeData(data,'question_info')}
                      value={examData?.[activeQuestion-1]?.question_info}
                      modules={modulesQuill}
                      formats={formatsQuill}
                    />
              </div>
          }

                <div className={`${styles["test__question"]}`}>
                    <h2 className={styles["test__question-heading"]}>
                        Question Name
                    </h2>
                    <ReactQuill
                      onChange={(data)=>changeData(data,'question_name')}
                      value={examData?.[activeQuestion-1]?.question_name}
                      modules={modulesQuill}
                      formats={formatsQuill}
                    />
                      
                    {
                        examData?.[activeQuestion-1]?.question_answer_type==='input' ?
                            <>
                              <h2 className={`${styles["test__question-heading"]} mt-3`}>
                                Correct Answer
                              </h2>
                              <div className={styles["test__input-answer"]}>
                                  <input type="text" className="form-control" placeholder="Enter correct answer" value={examData?.[activeQuestion-1].question_correct_answer}
                                  onChange={(e)=>changeData(e.target.value,'question_correct_answer')}/>
                              </div>
                            </>

                            :
                            <div className={styles["test__choices"]}>
                                {
                                  examData?.[activeQuestion-1]?.question_answers  &&
                                  examData?.[activeQuestion-1]?.question_answers.map((answerItem,answerIndex)=>(
                                    <div key={answerIndex+answerItem.id+'answer'}>
                                        <div className='d-flex align-items-center my-3'>
                                          <label>
                                            <span className={styles["test__choice-alpha"]} dangerouslySetInnerHTML={{__html: answerItem?.answer_alpha}}/>- Answer
                                          </label>
                                          <button onClick={() => markAsCorrectAnswer(answerItem.id)}
                                          type="button"
                                            className={`${styles['question__mark-as-correct-answer-button']}
                                            ${examData?.[activeQuestion-1].question_correct_answer.includes(answerItem.id)?
                                            styles['question__mark-as-correct-answer-button--marked']:''}`}>
                                                <CorrectIcon className={styles["question__mark-as-correct-answer-icon"]}/>
                                          </button>
                                          {
                                            examData?.[activeQuestion-1]?.question_answers.length>2&&
                                            <button type="button" className={styles['question__delete-button']} onClick={() => deleteAnswer(answerIndex,answerItem?.id)}>
                                                <DeleteIcon className={styles['question__delete-button-icon']}/>
                                            </button>
                                          }
                                        </div>
                                      <ReactQuill
                                          onChange={(data)=>changeAnswersData(data,'answer_name',answerIndex)}
                                          value={answerItem.answer_name}
                                          modules={modulesQuill}
                                          formats={formatsQuill}
                                        />
                                      </div>
                                  ))
                                }
                                <button type='button' onClick={()=>{createAnswers(activeQuestion-1)}} className={styles['add-test__add-button']}>
                                    <PlusIcon className={styles['add-test__add-button-icon']}/>
                                </button>

                            </div>
                    }
            </div>
        </div>
    )
}

export default TestQuestion



const modulesQuill = {
    toolbar: {
      container: [
        [{ "header": [1, 2, 3, 4, 5, 6, false] }],
        [{ "font": [] }],
        [{ "align": [] }],
        ["bold", "italic", "underline"],
        [{ "list": "ordered" }, { "list": "bullet" }, { "color": ["#000000", "#e60000", "#ff9900", "#ffff00", "#008a00", "#0066cc", "#9933ff", "#ffffff", "#facccc", "#ffebcc", "#ffffcc", "#cce8cc", "#cce0f5", "#ebd6ff", "#bbbbbb", "#f06666", "#ffc266", "#ffff66", "#66b966", "#66a3e0", "#c285ff", "#888888", "#a10000", "#b26b00", "#b2b200", "#006100", "#0047b2", "#6b24b2", "#444444", "#5c0000", "#663d00", "#666600", "#003700", "#002966", "#3d1466", "custom-color"] }, { "background": [] }, "link", "emoji"]
      ],
      handlers: {
        "color": function(value) {
          if (value === "custom-color") value = window.prompt("Enter Hex Color Code")
          this.quill.format("color", value)
        }
      }
    },
    keyboard: {
      bindings: {
        tab: false,
        custom: {
          key: 13,
          shiftKey: true,
          handler: function(range, context) {
            this.quill.setSelection(range.index, "silent")
            this.quill.insertText(range.index, "\n", "user")
            this.quill.setSelection(range.index + 1, "silent")
            this.quill.format("linebreak", true, "user")
          }
        },
        handleEnter: {
          key: 13,
          handler: function(range, context) {
            this.quill.setSelection(range.index, "silent")
            this.quill.insertText(range.index, "\n", "user")
            this.quill.setSelection(range.index + 1, "silent")
            this.quill.format("linebreak", true, "user")
          }
        }
      }
    }
  }
  
  const formatsQuill = [
    "header", "font", "size",
    "bold", "italic", "underline", "strike", "blockquote",
    "list", "bullet", "indent", "align",
    "link", "image", "background", "color", "emoji"
  ]