import TestControls from 'components/AddTest/TestControls/TestControls'
import TestPagination from 'components/AddTest/TestPagination/TestPagination'
import TestQuestionsForm from 'components/AddTest/TestQuestionsForm/TestQuestionsForm'
import React, { useEffect, useRef, useState } from 'react'
import { Accordion, Col, Container, Row } from 'react-bootstrap'
import { FormProvider, useForm } from 'react-hook-form'
import styles from './AddTest.module.css'
import './AddTest.css'
import {ReactComponent as InvoLogo} from 'assets/icons/InvoLogo.svg'

import TestConfiguration from 'components/AddTest/TestConfiguration/TestConfiguration'
import QuestionConfiguration from 'components/AddTest/QuestionConfiguration/QuestionConfiguration'
import QuestionsControl from 'components/AddTest/QuestionsControl/QuestionsControl'
import src from 'assets/imgs/pageLoading.gif'
import {ReactComponent as PlusIcon} from 'assets/icons/plus.svg'
import * as XLSX from 'xlsx'
import { toast } from 'react-toastify';
import Cookies from 'js-cookie'
import { axiosConfig } from 'utils/axiosConfig'
import { useNavigate, useParams } from 'react-router-dom'
const QUESTION_MODAL = (questionId,startAlpha,question)=>{
    let excelQuestionAnswers;
    let excelModalQuestionAnswers ;
    let excelCorectAnswer
    let questionKeys = question&& Object.keys(question)
    let acceptAddedQuestion = 
    questionKeys&&(
        questionKeys.includes('correct_answer_number')
        &&questionKeys.includes('question_answer_type')
        &&questionKeys.includes('question_information')
        &&questionKeys.includes('question_name')
        &&questionKeys.includes('question_answers')
        &&questionKeys.includes('screen_type')
    )
        if(acceptAddedQuestion){
            excelQuestionAnswers = (question&&question?.question_answers)&&String(question?.question_answers).split('-')
            excelModalQuestionAnswers = 
            excelQuestionAnswers && excelQuestionAnswers.map((answer,answerIndex)=>QUESTION_ANSWER_MODAL(answerIndex+1,startAlpha++,answer))

            excelCorectAnswer = question&&String(question?.correct_answer_number).split('-').map(ans=>Number(ans))
            return {
                id:questionId,
                screen_type   : question?question.screen_type:"two",
                question_info   : question?`<p>${question?.question_information}</p>`:'<p><br></p>',
                question_name   : question?`<p>${question?.question_name}</p>`:'<p><br></p>',
                questions_group : null,
                question_answer_type : question?question?.question_answer_type:"single",
                question_correct_answer : excelCorectAnswer?excelCorectAnswer:[],
                question_mark_value : 1,
                question_last_answer_id : 2,
                question_answers :excelModalQuestionAnswers?excelModalQuestionAnswers:[QUESTION_ANSWER_MODAL(1,startAlpha),QUESTION_ANSWER_MODAL(2,startAlpha+1)]
            }
        }else if(!question){
            return {
                id:questionId,
                screen_type   : "two",
                question_info   : '<p><br></p>',
                question_name   : '<p><br></p>',
                questions_group : null,
                question_answer_type : "single",
                question_correct_answer : [],
                question_mark_value : 1,
                question_last_answer_id : 2,
                question_answers :[QUESTION_ANSWER_MODAL(1,startAlpha),QUESTION_ANSWER_MODAL(2,startAlpha+1)]
            }
        }
}

const QUESTION_ANSWER_MODAL = (questionAnswerId,startAlpha,answer)=>{
    return {
            id : questionAnswerId,
            answer_alpha : `<span>&#${startAlpha};</span> ` ,
            answer_name : answer? `<p>${answer}</p>`:'<p><br></p>'
        }
    
}

function AddTest() {

    let methods = useForm({defaultValues:JSON.parse(localStorage.getItem('addedTestConfiguration'))?JSON.parse(localStorage.getItem('addedTestConfiguration')):{
        examConfiguration:{
            no_of_question:1,
            alpha_type:'number'
        }
    }})

    const [testData ,setTestData] =useState(null)
    const [excelData , setExcelData] = useState([])
    const [activeQuestion , setActiveQuestion] =useState(1)
    const [lastQuestionId , setLastQuestionId] = useState(1)
    const addTestRef=useRef(null)
    const loadDivRef=useRef(null)
    const params = useParams()
    const navigate = useNavigate()
    const [testConfiguration ,setTestConfiguration] =useState({
        exam_time:{
            active:false,
            value:undefined
        },
        exam_available_for_who:{
            active:false,
            value:undefined,
            groups:[],
            no_of_codes:undefined
        },
        exam_available_for_when:{
            active:false,
            value:undefined,
            start_date:new Date(),
            end_date:new Date()
        },
        show_exam_answers:{
            active:false,
            value:undefined
        },
        show_exam_questions:{
            active:false,
            value:undefined
        },
        exam_language:'english'
    })

    const [examConfiguration ,setExamConfiguration] =useState({
        no_of_question:1,
        alpha_type:'number'
    })

    const [examData ,setExamData] = useState(localStorage.getItem('addedExamData')?JSON.parse(localStorage.getItem('addedExamData')) :[QUESTION_MODAL(1)])
    
    const [prevExamData , setPrevExamData] =useState(1)

    let getExam =()=>{
        axiosConfig.get(`exams/exam/${params?.id}`,{
            headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
        }).then(res=>{
            console.log('res.data.datares.data.data',res.data.data)
            setTestData(res.data.data)
        }).catch(err=>{
            
        })
    }

    let changeActiveQuestion = (questionNumber) =>{
        setActiveQuestion(questionNumber)
    }

    let startAlphaNumber=()=>{
        let startAlpha = 49; 

        switch (methods.getValues('examConfiguration.alpha_type')&&methods.getValues('examConfiguration.alpha_type')){
            case 'english':
                startAlpha =97
            break;
            case 'arabic':
                startAlpha =1575
            break;
            case 'roman':
                startAlpha =8544
            break;
            case 'number':
                startAlpha =49
            break;
            default:return 49
        }
        return startAlpha
    }

    let createQuestionModal = (questionId)=>{
        setExamData(prevValue=>{
            return[
                ...prevValue,
                QUESTION_MODAL(questionId,startAlphaNumber())
            ]
            
        })
        setPrevExamData()
    }

    let createAnswers = (questionId)=>{
        let modifiedData = [...examData]
        modifiedData[questionId]={...modifiedData[questionId],question_last_answer_id:modifiedData[questionId].question_last_answer_id+1}
        modifiedData[questionId].question_answers.push(QUESTION_ANSWER_MODAL(modifiedData[questionId].question_last_answer_id,startAlphaNumber()+modifiedData[questionId].question_answers.length))
        setExamData(modifiedData)
    }

    let deleteQuestion = (questionIndex=activeQuestion)=>{
        let modifiedExamData = [...examData]
        if(modifiedExamData.length <= 1){
            return
        }
        modifiedExamData.splice(questionIndex,1)
        setExamData(modifiedExamData)
        methods.setValue('examConfiguration.no_of_question',methods.getValues('examConfiguration.no_of_question')-1)
    }

    let addQuestion = ()=>{
        methods.setValue('examConfiguration.no_of_question',Number(methods.getValues('examConfiguration.no_of_question'))+1)
    }

    let changeQuestionsDefaultAlpha =()=>{
        let modifiedExamData = [...examData]
        let startAlpha = startAlphaNumber()
        modifiedExamData &&modifiedExamData.forEach(question=>{
            let changedStartAlpha = startAlpha
            question?.question_answers?.map(answer=>{
                answer.answer_alpha=`<span>&#${changedStartAlpha};</span> `
                changedStartAlpha++
            })
        })
        setExamData(modifiedExamData)
    }

    let changeQuestionAlphaAfterDeleteAnswer =()=>{
        let modifiedExamData = [...examData]
        let startAlpha = startAlphaNumber()
        modifiedExamData[activeQuestion-1].question_answers.map(answer=>{
            answer.answer_alpha=`<span>&#${startAlpha};</span> `
            startAlpha++
        })
        setExamData(modifiedExamData)
    }
    const [isSubmitting , setIsSubmitting]=useState(false)
    let endExam =(data)=>{
        let formData =new FormData()
        // Object.keys(methods.getValues()).forEach(key=>{
        //     formData.append(`${key}`,methods.getValues()[key])
        // })
        // formData.append(`user_id`,user.id
        console.log(methods.getValues()['test_configuration']?.['exam_time']?.['active'])
        if(methods.getValues()['test_configuration']?.['exam_time']?.['active']){
            formData.append(`exam_time`,methods.getValues()['test_configuration']?.['exam_time']?.['value'])
        }

        formData.append(`exam_available_for_who`,methods.getValues()['test_configuration']?.['exam_available_for_who']?.['value'])
        if(methods.getValues()['test_configuration']?.['exam_available_for_who']?.['value']==2){
            formData.append(`exam_available_for_who_groups`,methods.getValues()['test_configuration']?.['exam_available_for_who']?.['groups'])
        }else if(methods.getValues()['test_configuration']?.['exam_available_for_who']?.['value']==3){
            formData.append(`no_of_generated_code`,methods.getValues()['test_configuration']?.['exam_available_for_who']?.['no_of_codes'])
        }

        formData.append(`exam_available_for_when`,methods.getValues()['test_configuration']?.['exam_available_for_when']?.['value'])
        if(methods.getValues()['test_configuration']?.['exam_available_for_when']?.['value']==2){
            formData.append(`exam_available_for_when_start_date`,methods.getValues()['test_configuration']?.['exam_available_for_when']?.['start_date'])
            formData.append(`exam_available_for_when_end_date`,methods.getValues()['test_configuration']?.['exam_available_for_when']?.['end_date'])
        }
        formData.append(`show_exam_questions`,methods.getValues()['test_configuration']?.['show_exam_questions']?.['value'])
        formData.append(`show_exam_correct_answer`,methods.getValues()['test_configuration']?.['show_exam_answers']?.['value'])
        formData.append(`question_numbers`,methods.getValues()['examConfiguration']?.['no_of_question'])
        formData.append(`question_alpha`,methods.getValues()['examConfiguration']?.['alpha_type'])

        examData && examData?.forEach((question,index)=>{
            formData.append(`questions[${index}][question_mark]`,question?.question_mark_value)
            formData.append(`questions[${index}][screen_type]`,question?.screen_type)
            formData.append(`questions[${index}][answer_type]`,question?.question_answer_type)
            formData.append(`questions[${index}][question_information]`,question?.question_info)
            formData.append(`questions[${index}][question_name]`,question?.question_name)
            // formData.append(`questions[${index}][question_correct_answer]`,question?.)
            question?.question_answers &&question?.question_answers?.forEach((answer,answerIndex)=>{
                formData.append(`questions[${index}][answers][${answerIndex}][answer_value]`,answer?.answer_name)
                // formData.append(`questions[${index}][question_Answers][${answerIndex}][is_correct_answer]`,question?.)
            })
        })

        setIsSubmitting(true)
        axiosConfig.post(`exams/add-exam-configuration/${params?.id}`,formData,{
            headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
        }).then(res=>{
            toast.success('Exam Updated Successfully')
            // handleCloseAddExam()
            setIsSubmitting(false)
            localStorage.removeItem('addedExamData')
            localStorage.removeItem('addedTestConfiguration')
            navigate('/portal/exams')
            // getData()
        }).catch(err=>{
            toast.error(err?.response?.data?.message||'Something went wrong')
            setIsSubmitting(false)
        })
    }

    let changeExamData= (examData)=>{
        setExamData(examData)
    };

    let changeExamDataAccordion =(e,type,questionIndex)=>{
        let modififedExamData =[...examData]
        modififedExamData[questionIndex][type]=e.target.value;
        if(type=='question_answer_type'){
            modififedExamData[questionIndex]['question_correct_answer']=[]
        }else if(type=='question_mark_value'){
            modififedExamData[questionIndex]['question_mark_value']=Number(e.target.value)
        }
        setExamData(modififedExamData)
    }
    
    let markAsCorrectAnswer =(selectedAnswer)=>{
        let modifiedExamData = [...examData]
        if(modifiedExamData[activeQuestion-1]['question_answer_type'] =='single'||modifiedExamData[activeQuestion-1]['question_answer_type'] =='input'){
            modifiedExamData[activeQuestion-1].question_correct_answer = [selectedAnswer]
        }else if(modifiedExamData[activeQuestion-1]['question_answer_type'] =='multi'){
            if(modifiedExamData[activeQuestion-1].question_correct_answer.includes(selectedAnswer) ){
                modifiedExamData[activeQuestion-1].question_correct_answer = 
                modifiedExamData[activeQuestion-1].question_correct_answer.filter(val=>val!=selectedAnswer)
            }else{
                modifiedExamData[activeQuestion-1].question_correct_answer.push(selectedAnswer)
            }
        }else{
            modifiedExamData[activeQuestion-1].question_correct_answer = selectedAnswer
        }
        console.log(modifiedExamData)
        setExamData(modifiedExamData)
    };

    let toggleSideNavBar=()=>{
        addTestRef.current.classList.toggle(styles['close-side-menu'])
        console.log(addTestRef.current.classList)
    };

    let changeQuestionOrder=(changedQuestionIndex,currentQuestionIndex)=>{
        let modifiedExamData = [...examData]
        let changedQuestion = modifiedExamData.splice(currentQuestionIndex,1)[0]
        modifiedExamData.splice(changedQuestionIndex,0,changedQuestion)
        if(currentQuestionIndex==activeQuestion-1){
            changeActiveQuestion(changedQuestionIndex+1)
        }
        setExamData(modifiedExamData)
    }

    let addQuestionByExcelFile =async (e)=>{
        loadDivRef.current.classList.remove('d-none')
        const file = e.target.files[0];
        let extension = file.name.split('.').pop().toLowerCase();
        let allowed = [ 'xls', 'xlsx'];

        if(file){
            if(allowed.indexOf(extension) === -1) {
                toast.error('File type is not supported. file type must be .xlsx or .xls')
                loadDivRef.current.classList.add('d-none')
                return ;
            }else{

            const data = await file.arrayBuffer();
            const workbook = XLSX.read(data);
            const workSheet = workbook.Sheets[workbook.SheetNames[0]]
            let jsonData = XLSX.utils.sheet_to_json(workSheet)
            if(jsonData.length>600){
                jsonData = jsonData.slice(0,600)
            }
            jsonData=jsonData.filter(question=>question)
            setExcelData(jsonData)
            methods.setValue('examConfiguration.no_of_question',jsonData.length)
            }
        }
    }

    useEffect(()=>{
        let modifiedExamData = [...examData]
        const MAX_QUESTIO_NNUMBER =600
        let currentExamQuestionNumber = methods.getValues('examConfiguration.no_of_question')
        let modifiedPrevExamData = prevExamData
        let lastQuestionIdModified = lastQuestionId

        if(currentExamQuestionNumber > MAX_QUESTIO_NNUMBER) {
            methods.setValue('examConfiguration.no_of_question',MAX_QUESTIO_NNUMBER)
            return 
        }else if( currentExamQuestionNumber == 0){
            methods.setValue('examConfiguration.no_of_question',1)
            return 
        }

        if(excelData.length!=0){
            modifiedExamData = [];
            excelData.forEach((question,questionIndex)=>{
                modifiedExamData.push(QUESTION_MODAL(questionIndex+1,49,question))
                lastQuestionIdModified++
            })
            modifiedExamData=modifiedExamData.filter(question=>question)
        }else{

            if(Number(modifiedPrevExamData) < Number(currentExamQuestionNumber)){
                for(let i =Number(modifiedPrevExamData); i < currentExamQuestionNumber ; i++){
                    modifiedExamData.push(QUESTION_MODAL(lastQuestionIdModified+1,startAlphaNumber()))
                    lastQuestionIdModified++
                }
            }else{
                modifiedExamData =modifiedExamData.slice(0,currentExamQuestionNumber)
            }
        }
        setLastQuestionId(Number(lastQuestionIdModified))
        setExamData(modifiedExamData)
        setPrevExamData(methods.getValues('examConfiguration.no_of_question'))
        setExcelData([])
        methods.setValue('examConfiguration.no_of_question',modifiedExamData.length)
        loadDivRef.current.classList.add('d-none')

    },[methods.watch('examConfiguration.no_of_question')])

    useEffect(()=>{
        localStorage.setItem('addedExamData',JSON.stringify(examData))
        window.dispatchEvent(new Event("storage"));
    },[examData])

    useEffect(()=>{
        changeQuestionsDefaultAlpha()
    },[methods.watch('examConfiguration.alpha_type')])

    useEffect(()=>{
        // localStorage.removeItem('addedTestConfiguration')
        localStorage.setItem('addedTestConfiguration',JSON.stringify(methods.getValues()))
    },[methods.watch()])
    useEffect(()=>{
        getExam()
    },[])
    useEffect(()=>{
        if(testData){
            let testConfiguration = {
                exam_time:{
                    active:Boolean(testData?.exam_configuration?.exam_time),
                    value:testData?.exam_configuration?.exam_time
                },
                exam_available_for_who:{
                    active:false,
                    value:testData?.exam_configuration?.exam_available_for_who,
                    groups:testData?.exam_configuration?.exam_available_for_who_groups||[],
                    no_of_codes:testData?.exam_configuration?.no_of_generated_code
                },
                exam_available_for_when:{
                    active:false,
                    value:testData?.exam_configuration?.exam_available_for_when,
                    start_date:new Date(testData?.exam_configuration?.exam_available_for_when_start_date),
                    end_date:new Date(testData?.exam_configuration?.exam_available_for_when_end_date)
                },
                show_exam_answers:{
                    active:false,
                    value:testData?.exam_configuration?.show_exam_correct_answer
                },
                show_exam_questions:{
                    active:false,
                    value:testData?.exam_configuration?.show_exam_questions
                },
                exam_language:'english'
            }
            
            setTestConfiguration(testConfiguration)
            let examConfiguration = {
                no_of_question:testData?.question_configration?.question_numbers,
                alpha_type:testData?.question_configration?.question_alpha
            }
            let addedTestConfiguration = {
                test_configuration:testConfiguration,
                examConfiguration:examConfiguration,
            }
            setExamConfiguration(examConfiguration)
            console.log('addedTestConfigurationaddedTestConfiguration',addedTestConfiguration)
            methods.setValue('examConfiguration',examConfiguration)
            methods.setValue('test_configuration',testConfiguration)
            localStorage.setItem('addedTestConfiguration',JSON.stringify(addedTestConfiguration))
            console.log('methods.getValues()',methods.getValues())
            // return {
            //     id:questionId,
            //     screen_type   : question?question.screen_type:"two",
            //     question_info   : question?`<p>${question?.question_information}</p>`:'<p><br></p>',
            //     question_name   : question?`<p>${question?.question_name}</p>`:'<p><br></p>',
            //     questions_group : null,
            //     question_answer_type : question?question?.question_answer_type:"single",
            //     question_correct_answer : excelCorectAnswer?excelCorectAnswer:[],
            //     question_mark_value : 1,
            //     question_last_answer_id : 2,
            //     question_answers :excelModalQuestionAnswers?excelModalQuestionAnswers:[QUESTION_ANSWER_MODAL(1,startAlpha),QUESTION_ANSWER_MODAL(2,startAlpha+1)]
            // }
            let startAlpha = startAlphaNumber()
            let examData = testData?.questions?.map(question=>{
                let questionData = {
                    screen_type:question?.screen_type,
                    question_information:question?.question_information,
                    question_name:question?.question_name,
                    question_answer_type:question?.question_answer_type,
                }
                return QUESTION_MODAL(question?._id,startAlpha,questionData)

                
            })
            setExamData(examData)
        }
    },[testData])
    

  return (
    <section id='add-exam'>
        <FormProvider {...methods}> 
            <form className={styles['add-test__form']} onSubmit={methods.handleSubmit(endExam)} ref={addTestRef}>
                <div className={`${styles['add-test__load-wrapper']} d-none`} ref={loadDivRef}>
                    <img src={src} alt="loading" className={styles['add-test__load-img']}/>
                </div>
                <Row className='w-100 m-0'>
                    <Col lg='3' className={`${styles['add-test__form-left-section']} p-0`}>
                        <div className={styles['add-test__form-configration']}>
                            <div className={styles['add-test__configuration__logo-cont']}>
                                <InvoLogo className={styles['add-test__configuration__logo']}/>
                            </div>
                            
                            <Accordion className={styles['accordion']}>
                                <Accordion.Item eventKey="0" className={styles['add-test__configuration-accordion-item']}>
                                    <Accordion.Header>Test Confguration</Accordion.Header>
                                    <Accordion.Body className={styles['add-test__configuration-accordion-body']}>
                                        <TestConfiguration 
                                            testConfiguration={testConfiguration} />
                                    </Accordion.Body>
                                </Accordion.Item>

                                <Accordion.Item eventKey="1">
                                    <Accordion.Header>Question Configuration</Accordion.Header>
                                    <Accordion.Body className={styles['add-test__configuration-accordion-body']}>
                                        <QuestionConfiguration 
                                            examConfiguration={examConfiguration} 
                                            createQuestionModal={createQuestionModal}
                                            examData={examData}
                                            setExamData={setExamData}
                                            addQuestionByExcelFile={addQuestionByExcelFile}
                                        />
                                    </Accordion.Body>
                                </Accordion.Item>
                                
                                <Accordion.Item eventKey="2">
                                    <Accordion.Header>Questions</Accordion.Header>
                                    <Accordion.Body className={`${styles['add-test__configuration-accordion-body']} px-0    `}>
                                        <QuestionsControl
                                            examData={examData}
                                            deleteQuestion={deleteQuestion}
                                            setActiveQuestion={setActiveQuestion}
                                            activeQuestion={activeQuestion}
                                            setExamData={setExamData}
                                            changeExamDataAccordion={changeExamDataAccordion}
                                            changeQuestionOrder={changeQuestionOrder}
                                            />
                                        <button type="button" className={styles['add-test__add-button']} onClick={addQuestion}>
                                            <PlusIcon className={styles['add-test__add-button-icon']}/>
                                        </button>
                                    </Accordion.Body>
                                </Accordion.Item>

                            </Accordion>
                        </div>
                    </Col>
                    
                    <Col lg='9' className={`${styles['add-test__form-right-section']} p-0`}>
                        <div className={styles['add-test__form-view']}>
                            
                            <TestControls 
                                questionslCount={examData.length}
                                endExam={endExam}
                                addQuestion={addQuestion}
                                deleteQuestion={deleteQuestion}
                                toggleSideNavBar={toggleSideNavBar}
                            />
                            <Container fluid className='px-4'>
                                <TestQuestionsForm 
                                    activeQuestion={activeQuestion} 
                                    examData={examData}
                                    changeExamData={changeExamData}
                                    createAnswers={createAnswers}
                                    markAsCorrectAnswer={markAsCorrectAnswer}
                                    changeQuestionAlphaAfterDeleteAnswer={changeQuestionAlphaAfterDeleteAnswer}
                                />
                                <TestPagination 
                                    activeQuestion={activeQuestion} 
                                    changeActiveQuestion={changeActiveQuestion} 
                                    examData={examData}
                                />
                            </Container>
                        </div>
                    </Col>
                </Row>
                
                

            </form>
        </FormProvider>
    </section>
  )
}

export default AddTest
export { QUESTION_MODAL , QUESTION_ANSWER_MODAL}