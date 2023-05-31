import React, { useEffect, useState } from 'react'
import { Collapse } from 'react-bootstrap';
import oneScreenSrc from 'assets/imgs/oneScreen.jpg'
import twoScreenSrc from 'assets/imgs/twoScreen.jpg'

import singleSelectSrc from 'assets/imgs/singleSelectPreview.jpg'
import multiSelectSrc from 'assets/imgs/multiSelectPreview.jpg'
import inputTypeSrc from 'assets/imgs/inputAnswerPreview.jpg'
import styles from './QuestionsControl.module.css'
import {ReactComponent as DeleteIcon} from 'assets/icons/delete.svg'
import {ReactComponent as GoToQuestionIcon} from 'assets/icons/goToQuestion.svg'
import {ReactComponent as CheckedIcon} from 'assets/icons/checked.svg'
import {ReactComponent as DragIcon} from 'assets/icons/DragIcon.svg'
import {ReactComponent as TopArrowIcon} from 'assets/icons/topArrow.svg'
import {ReactComponent as DownArrowIcon} from 'assets/icons/downArrow.svg'

import {useSortable} from '@dnd-kit/sortable'
import {CSS} from '@dnd-kit/utilities'
function QuestionControl({
        questionIndex,
        deleteQuestion,
        activeQuestion,
        setCurrentOpenCollpase,
        currentOpenCollpase,
        setActiveQuestion,
        examData,
        setExamData,
        changeQuestionOrder
    }) 
    {
    const [open, setOpen] = useState(false);

    let changeCollapseItemOpenState=()=>{
        setOpen(prevValue=>!prevValue)
        setCurrentOpenCollpase(questionIndex)
    }
    console.log('QuestionControl')

    let changeExamData =(e,type)=>{
        let modififedExamData =[...examData]
        modififedExamData[questionIndex][type]=e.target.value;
        if(type=='question_answer_type'){
            modififedExamData[questionIndex]['question_correct_answer']=[]
        }else if(type=='question_mark_value'){
            modififedExamData[questionIndex]['question_mark_value']=Number(e.target.value)
        }
        setExamData(modififedExamData)
    }

    // useEffect(() => {
    //     if(activeQuestion-1==questionIndex){
    //         setOpen(true)
    //     }else{
    //         setOpen(false)
    //     }
    //     console.log(open)
    // },[activeQuestion])

    // useEffect(()=>{
    //     setOpen(false)
    //     if(currentOpenCollpase == questionIndex){
    //         setOpen(true)
    //     }
    // },[currentOpenCollpase])

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        handle 
        
    } =useSortable({id:examData[questionIndex].id})
    const style = {
        transform:CSS.Transform.toString(transform),
        transition
    }

  return (
    <div className={styles['question-collapse__wrapper']} ref={setNodeRef} style={style}>
        <div className={styles['question-collpase__button-wrapper']} id={`question-collpase__button-wrapper${examData[questionIndex].id}`}>
            <button  {...listeners} {...attributes} className={styles['question-collpase__drag-button']}>
                <DragIcon className={styles['question-collpase__drag-icon']}/>
            </button>

            <button
                onClick={() =>changeCollapseItemOpenState() }
                aria-controls="example-collapse-text"
                aria-expanded={open}
                className={styles['question__collapse-button']}
            >
                Question {questionIndex+1} {examData[questionIndex].id}
            </button>

            <div className='ms-auto d-flex align-items-center'>
            {/* {
                examData.length >1&&
                    <div className='d-flex flex-column'>
                        {
                            questionIndex !=0 &&
                                <button onClick={()=>{changeQuestionOrder(questionIndex-1,questionIndex)}} className={styles['question__move-question-order']}>
                                    <TopArrowIcon className={styles['question__move-question-order-icon']}/>
                                </button>
                        }
                        {
                            questionIndex !=examData.length-1&&
                                <button onClick={()=>{changeQuestionOrder(questionIndex+1,questionIndex)}} className={styles['question__move-question-order']}>
                                    <DownArrowIcon className={styles['question__move-question-order-icon']}/>
                                </button>
                        }
                    </div>
            } */}
            <button onClick={()=>{setActiveQuestion(questionIndex+1)}} className={styles['question__go-to-question']}>
                <GoToQuestionIcon className={styles['question__go-to-question-icon']}/>
            </button>
            {
                examData.length >1&&
                    <button className={styles['question__delete-button']} onClick={() => deleteQuestion(questionIndex)}>
                        <DeleteIcon className={styles['question__delete-button-icon']}/>
                    </button>
            }
            </div>

        </div>

        <Collapse in={open}>
            <div id="example-collapse-text" className='px-3'>
                <div className={`${styles['question-control__answer-type-wrapper']} d-flex flex-column w-100 mt-3`}>
                    <div className='d-flex align-items-center'>
                        <label className={styles['question-control__answer-type-lable']}>Question Mark</label>
                    </div>
                    <input 
                        type="number" 
                        min='1' 
                        step='1' 
                        className={`${styles['add-test__configuration-input']} form-control`} 
                        placeholder='please add Question Mark'
                        name={`answerMarkValue${examData[questionIndex].id}`} 
                        onChange={(e)=>changeExamData(e,'question_mark_value')}
                        value={examData[questionIndex]['question_mark_value']}
                    />
                </div>

                <div className='d-flex flex-column'>
                    <div className='d-flex align-items-center'>
                        <label>Screen Type</label>
                    </div>
                    <div className={styles['question-control__screens-type-cont']}>
                        <div className={styles['question-control__screen-type']}>
                            <input 
                                type='radio' 
                                name={`questionScreenType${examData[questionIndex].id}`} 
                                value='two' 
                                className={styles['question-control__screen-type-input']}
                                id={`question${examData[questionIndex].id}two`}
                                onChange={(e)=>changeExamData(e,'screen_type')}
                                defaultChecked={examData[questionIndex]['screen_type']=='two'}/>

                            <label htmlFor={`question${examData[questionIndex].id}two`} className={styles['question-control__screen-type-label']}>
                                <img src={twoScreenSrc} alt='one' className={styles['question-control__screen-type-img']}/>
                                <div className={`${styles['question-control__screen-type--selected']}
                                ${examData[questionIndex]['screen_type']=='two'?'':'d-none'}`}>
                                        <CheckedIcon className={styles['question__checked-icon']}/>
                                </div>
                            </label>
                        </div>
                        
                        <div className={styles['question-control__screen-type']}>
                            <input 
                                type='radio' 
                                name={`questionScreenType${examData[questionIndex].id}`} 
                                value='one' 
                                id={`question${examData[questionIndex].id}one`}
                                className={styles['question-control__screen-type-input']}
                                onChange={(e)=>changeExamData(e,'screen_type')}
                                defaultChecked={examData[questionIndex]['screen_type']=='one'}
                            />
                            <label htmlFor={`question${examData[questionIndex].id}one`} className={styles['question-control__screen-type-label']}>
                                <img src={oneScreenSrc} alt='one' className={styles['question-control__screen-type-img']}/>
                                <div className={`${styles['question-control__screen-type--selected']}
                                    ${examData[questionIndex]['screen_type']=='one'?'':'d-none'}`}>
                                        <CheckedIcon className={styles['question__checked-icon']}/>
                                </div>
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles['question-control__answer-type-wrapper']}>
                    <div className='d-flex align-items-center'>
                        <label className={styles['question-control__answer-type-lable']}>Answer Type</label>
                    </div>
                    <div className={`${styles['question-control__screens-type-cont']} ${styles['question-control__screens-type-cont--three-option']}`}>
                        <div className={styles['question-control__screen-type']}>
                            <input 
                                type='radio' 
                                name={`answerInputType${examData[questionIndex].id}`} 
                                value='single'
                                className={styles['question-control__screen-type-input']}
                                id={`answer${examData[questionIndex].id}single`}
                                onChange={(e)=>changeExamData(e,'question_answer_type')}
                                defaultChecked={examData[questionIndex]['question_answer_type']=='single'}/>

                            <label htmlFor={`answer${examData[questionIndex].id}single`} className={styles['question-control__screen-type-label']}>
                                <img src={singleSelectSrc} alt='single select' className={styles['question-control__screen-type-img']}/>
                                <div className={`${styles['question-control__screen-type--selected']}
                                ${examData[questionIndex]['question_answer_type']=='single'?'':'d-none'}`}>
                                        <CheckedIcon className={styles['question__checked-icon']}/>
                                </div>
                            </label>
                        </div>
                        
                        <div className={styles['question-control__screen-type']}>
                            <input 
                            type='radio' 
                            name={`answerInputType${examData[questionIndex].id}`} 
                            value='multi' 
                            id={`answer${examData[questionIndex].id}multi`}
                            className={styles['question-control__screen-type-input']}
                            onChange={(e)=>changeExamData(e,'question_answer_type')}
                            defaultChecked={examData[questionIndex]['question_answer_type']=='multi'}/>
                            <label htmlFor={`answer${examData[questionIndex].id}multi`} className={styles['question-control__screen-type-label']}>
                                <img src={multiSelectSrc} alt='multi select' className={styles['question-control__screen-type-img']}/>
                                <div className={`${styles['question-control__screen-type--selected']}
                                    ${examData[questionIndex]['question_answer_type']=='multi'?'':'d-none'}`}>
                                        <CheckedIcon className={styles['question__checked-icon']}/>
                                </div>
                            </label>

                        </div>

                        <div className={styles['question-control__screen-type']}>
                            <input 
                            type='radio' 
                            name={`answerInputType${examData[questionIndex].id}`} 
                            value='input' 
                            id={`answer${examData[questionIndex].id}input`}
                            className={styles['question-control__screen-type-input']}
                            onChange={(e)=>changeExamData(e,'question_answer_type')}
                            defaultChecked={examData[questionIndex]['question_answer_type']=='input'}/>
                            <label htmlFor={`answer${examData[questionIndex].id}input`} className={styles['question-control__screen-type-label']}>
                                <img src={inputTypeSrc} alt='input' className={styles['question-control__screen-type-img']}/>
                                <div className={`${styles['question-control__screen-type--selected']}
                                    ${examData[questionIndex]['question_answer_type']=='input'?'':'d-none'}`}>
                                        <CheckedIcon className={styles['question__checked-icon']}/>
                                </div>
                            </label>

                        </div>
                    </div>
                </div>
                {/* <div className={styles['question-control__answer-type-wrapper']}>
                    <label className={styles['question-control__answer-type-lable']}>Answer Type</label>
                    <select
                        className='form-select'
                        onChange={(e)=>changeExamData(e,'question_answer_type')}
                        value={examData[questionIndex]['question_answer_type']}
                    >
                        <option value='single' selected>Single select</option>
                        <option value='multi'>Multiselect option</option>
                        <option value='input'>Enter answer in input</option>
                    </select>
                </div> */}
            </div>
        </Collapse>
    </div>
  )
}

export default QuestionControl