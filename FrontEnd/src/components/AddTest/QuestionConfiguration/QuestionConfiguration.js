import React, { useEffect, useState } from 'react'
import styles from './QuestionConfiguration.module.css'
import { useFormContext } from 'react-hook-form';
import {ReactComponent as PlusIcon} from 'assets/icons/plus.svg'
import arabicAlphabetSrc from 'assets/imgs/arabicAlphabet.jpg'
import englishAlphabetSrc from 'assets/imgs/englishAlphabet.jpg'
import numberAlphabetSrc from 'assets/imgs/numberAlphaBet.jpg'
import romanAlphabetSrc from 'assets/imgs/romanAlpha.jpg'
import {ReactComponent as CheckedIcon} from 'assets/icons/checked.svg'
import {ReactComponent as DownladExcelIcon} from 'assets/icons/downladExcel.svg'
import * as XLSX from 'xlsx'
import {QUESTION_MODAL ,QUESTION_ANSWER_MODAL} from 'views/PortalPages/AddTest/AddTest'
import { Link } from 'react-router-dom';
import fileSrc from 'assets/files/questions-modal.xlsx'
function QuestionConfiguration({addQuestionByExcelFile}) {

    const { register ,setValue ,getValues} = useFormContext({
        defaultValues:{
            examConfiguration:{
                no_of_question:1,
                alpha_type:'number'
            }
        }
    });
    
    const [questionNumber , setQuestionNumber] =useState(getValues('examConfiguration.no_of_question'))

    // let changeExamData =(e,type)=>{
    //     let modififedExamData =[...examData]
    //     modififedExamData[questionIndex][type]=e.target.value;
    //     console.log(modififedExamData)
    //     setExamData(modififedExamData)
    // }
    let changeQuestionNumber= (e)=>{
        let modifiedData =  e.target.value>600? 600  
                            :e.target.value<1 ?1:e.target.value
        setQuestionNumber(modifiedData)
    }
    // let addQuestionByExcelFile =async (e)=>{
    //     const file = e.target.files[0];
    //     const data = await file.arrayBuffer();
    //     const workbook = XLSX.read(data);
    //     const workSheet = workbook.Sheets[workbook.SheetNames[0]]
    //     const jsonData = XLSX.utils.sheet_to_json(workSheet) 
    //     console.log(jsonData)
    //     addExcelFileQuestionsToExamData(jsonData)
    // }
    
    // let addExcelFileQuestionsToExamData = (excelData)=>{
    //     let modifiedExamData = [];
    //     console.log(modifiedExamData)
    //     excelData.forEach((question,questionIndex)=>{
    //         modifiedExamData.push(QUESTION_MODAL(questionIndex+1,49,question))
    //     })
    //     setExamData(modifiedExamData)
    // }
    useEffect(()=>{
        setQuestionNumber(getValues('examConfiguration.no_of_question'))
    },[getValues('examConfiguration.no_of_question')])
  return (
    <>
        
        <div className={styles['add-test__configuration-field-cont']}>
            <div className={`${styles['add-test__configuration-label-cont']} d-flex flex-column align-items-start`}>
                <label className={styles["add-test__config-label"]}>Question Number</label>
                <div className='d-flex w-100 mt-3'>
                    <input 
                        type="number" 
                        min='1' 
                        step='1' 
                        className={`${styles['add-test__configuration-input']} form-control`} 
                        placeholder='please add Exam Time'
                        value={questionNumber}
                        onChange={(e)=>{changeQuestionNumber(e)}}
                    />
                    <button 
                    className={`${styles['question-number__add-button']}
                    ${getValues('examConfiguration.no_of_question')===questionNumber ?styles['question-number__add-button--not-allowed']:''}`}
                    onClick={()=>{setValue('examConfiguration.no_of_question',questionNumber)}}
                    disabled={getValues('examConfiguration.no_of_question')===questionNumber}
                    >
                        <PlusIcon className={styles['question-number__add-button-icon']}/>
                    </button>
                </div>
            </div>
        </div>

        <div className={styles['question-control__answer-type-wrapper']}>
            <div className='d-flex align-items-center'>
                <label className={styles['question-control__answer-type-lable']}>Question Alpha</label>
            </div>
            <div className={`${styles['question-control__screens-type-cont']}`}>
                <div className={styles['question-control__screen-type']}>
                    <input 
                            type='radio' 
                            value='number'
                            className={styles['question-control__screen-type-input']}
                            id='answernumber'
                            {...register('examConfiguration.alpha_type')}
                            defaultChecked={getValues('examConfiguration.alpha_type')=='number'}
                        />

                    <label htmlFor='answernumber' className={styles['question-control__screen-type-label']}>
                        <img src={numberAlphabetSrc} alt='number select' className={styles['question-control__screen-type-img']}/>
                        <div className={`${styles['question-control__screen-type--selected']}
                        ${getValues('examConfiguration.alpha_type')=='number'?'':'d-none'}`}>
                                <CheckedIcon className={styles['question__checked-icon']}/>
                        </div>
                    </label>
                </div>
                
                <div className={styles['question-control__screen-type']}>
                    <input 
                        type='radio' 
                        value='english' 
                        id='answerEnglish'
                        className={styles['question-control__screen-type-input']}
                        {...register('examConfiguration.alpha_type')}
                        defaultChecked={getValues('examConfiguration.alpha_type')=='english'}
                    />
                    <label htmlFor='answerEnglish' className={styles['question-control__screen-type-label']}>
                        <img src={englishAlphabetSrc} alt='english select' className={styles['question-control__screen-type-img']}/>
                        <div className={`${styles['question-control__screen-type--selected']}
                            ${getValues('examConfiguration.alpha_type')=='english'?'':'d-none'}`}>
                                <CheckedIcon className={styles['question__checked-icon']}/>
                        </div>
                    </label>
                </div>

                {/* <div className={styles['question-control__screen-type']}>
                        <input 
                        type='radio' 
                        value='arabic' 
                        id='answerarabic'
                        className={styles['question-control__screen-type-input']}
                        {...register('examConfiguration.alpha_type')}
                    defaultChecked={getValues('examConfiguration.alpha_type')=='arabic'}
                    />
                    <label htmlFor='answerarabic' className={styles['question-control__screen-type-label']}>
                        <img src={arabicAlphabetSrc} alt='arabic' className={styles['question-control__screen-type-img']}/>
                        <div className={`${styles['question-control__screen-type--selected']}
                            ${getValues('examConfiguration.alpha_type')=='arabic'?'':'d-none'}`}>
                                <CheckedIcon className={styles['question__checked-icon']}/>
                        </div>
                    </label>
                </div> */}

                <div className={styles['question-control__screen-type']}>
                    <input 
                        type='radio' 
                        value='roman' 
                        id='answerRoman'
                        className={styles['question-control__screen-type-input']}
                        {...register('examConfiguration.alpha_type')}
                        defaultChecked={getValues('examConfiguration.alpha_type')=='roman'}
                    />
                    <label htmlFor='answerRoman' className={styles['question-control__screen-type-label']}>
                        <img src={romanAlphabetSrc} alt='roman' className={styles['question-control__screen-type-img']}/>
                        <div className={`${styles['question-control__screen-type--selected']}
                            ${getValues('examConfiguration.alpha_type')=='roman'?'':'d-none'}`}>
                                <CheckedIcon className={styles['question__checked-icon']}/>
                        </div>
                    </label>

                </div>
            </div>
        </div>
        
        <div className={styles['add-test__configuration-field-cont']}>
            <div className={`${styles['add-test__configuration-label-cont']} d-flex flex-column align-items-start`}>
                <div className='d-flex align-items-center w-100'>

                    <label className={styles["add-test__config-label"]}>Add Question By Excel File</label>
                    <a download href={fileSrc} className={styles['add-test__config-download-button']}>
                        <DownladExcelIcon className={styles['add-test__config-download-icon']}/>
                    </a>
                </div>
                <div className='d-flex w-100 mt-3'>
                    <div className={styles['add-test__configuration-custom-input-wrapper']}>
                        <label htmlFor='add-test__configuration-input' className={styles['add-test__configuration-custom-input-label']}>
                            Upload File
                        </label>
                        <input 
                            type="file" 
                            className={`${styles['add-test__configuration-input--file']} form-control`} 
                            placeholder='please add Exam Time'
                            accept='.xlsx,.xls'
                            id='add-test__configuration-input'
                            onChange={(e)=>{addQuestionByExcelFile(e)}}
                        />
                    </div>
                </div>
            </div>
        </div>
        
    </>
  )
}

export default QuestionConfiguration