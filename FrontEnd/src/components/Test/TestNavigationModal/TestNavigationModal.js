import React, { useEffect, useState } from 'react'
import {  Container, Modal } from 'react-bootstrap';
import {ReactComponent as ExitIcon} from 'assets/icons/exit.svg'

import styles from './TestNavigationModal.module.css'
import { useFormContext } from 'react-hook-form';
function TestNavigationModal({OpenNavButtonComp ,changeActiveQuestion ,testData ,changeQuestionFlagStatus,flaggedQuestions}) {
    
    const { getValues } = useFormContext();
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const [activeFilter,setActiveFilter] =useState('all')
    const [ filteredTestData , setFilterTestData] =useState([])
    let ButtonComponent = OpenNavButtonComp.type

    let navigateToAuestionFromTable = (questionNumber)=>{
        changeActiveQuestion(questionNumber)
        handleClose()
    }

    let filterNavigationModel = (filterType)=>{
        setActiveFilter(filterType)
        let filterData;
            switch (filterType){
                case 'all':{
                    filterData= testData
                    break;
                }
                case 'answered':{
                    filterData= testData.filter((question,index)=>{
                        return (getValues()[`test__answer${index+1}`] &&getValues()[`test__answer${index+1}`].length !=0) 
                    })
                    break;
                }
                case 'notAnswered':{
                    filterData= testData.filter((question,index)=>{
                        return (getValues()[`test__answer${index+1}`] &&(getValues()[`test__answer${index+1}`] ===null )  ) 
                    })
                    break;
                }
                case 'flagged':{
                    filterData= testData.filter((question,index)=>{
                        console.log(flaggedQuestions.includes(index+1))
                        console.log(flaggedQuestions)

                        return flaggedQuestions.includes(index+1)
                    })
                    break;
                }
                case 'notflagged':{
                    filterData= testData.filter((question,index)=>{
                        console.log(!flaggedQuestions.includes(index+1))
                        return  !flaggedQuestions.includes(index+1)
                    })
                    break;
                }
                default:return testData
            }
        
            setFilterTestData(filterData)
    }
    useEffect(()=>{
        // console.log(getValues())
        setFilterTestData(testData)
    },[testData])
    return (
        <>
        <ButtonComponent openNavigationModal={handleShow}/>

        <Modal show={show} onHide={handleClose} size='xl' className={styles['modal']}>
            <div className={styles["modal-content"]}>
                <Container fluid>
                    
                    <div className={`${styles["modal-header"]} modal-header`}>
                        <h5 className={`${styles["modal-title"]} modal-title`} id="test-navigation-title">Question Navigation</h5>
                        <button type="button" className={`${styles["close"]} close`} onClick={handleClose}>
                            <ExitIcon className={styles['modal__exit-icon']}/>
                        </button>
                    </div>
                    <div className={`${styles["modal-body"]} modal-body`}>
                        <div className={`${styles["test-navigation__filters"]}  m-auto`}>
                            <div className={styles["test-navigation__filter"]}>
                                <button className={`${styles["test-navigation__filter-button"]} 
                                ${activeFilter ==='all' ?styles["active"] :''} btn`} onClick={()=>{filterNavigationModel('all')}}>All</button>
                            </div>
                            <div className={styles["test-navigation__filter"]}>
                                <button className={`${styles["test-navigation__filter-button"]} 
                                ${activeFilter ==='answered' ?styles["active"] :''} btn`} onClick={()=>{filterNavigationModel('answered')}}>Answered</button>
                            </div>
                            <div className={styles["test-navigation__filter"]}>
                                <button className={`${styles["test-navigation__filter-button"]} 
                                ${activeFilter ==='notAnswered' ?styles["active"] :''} btn`} onClick={()=>{filterNavigationModel('notAnswered')}}>Not Answered</button>
                            </div>
                            <div className={styles["test-navigation__filter"]}>
                                <button className={`${styles["test-navigation__filter-button"]} 
                                ${activeFilter ==='flagged' ?styles["active"] :''} btn`} onClick={()=>{filterNavigationModel('flagged')}}>Flagged</button>
                            </div>
                            <div className={styles["test-navigation__filter"]}>
                                <button className={`${styles["test-navigation__filter-button"]} 
                                ${activeFilter ==='notFlagged' ?styles["active"] :''} btn`} onClick={()=>{filterNavigationModel('notFlagged')}}>Not Flagged</button>
                            </div>
                        </div>

                        <table className={`${styles["test-navigation__table"]} table`}>
                            <thead>
                                <tr>
                                    <th scope="col">#</th>
                                    <th scope="col">State</th>
                                    <th scope="col">Flagged</th>
                                    <th scope="col">Your Answer Number</th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    filteredTestData && filteredTestData.map((_,index)=>(
                                        <tr key={index} c>
                                            <th scope="row">
                                                <a className={styles["test-navigation__link"]} onClick={()=>{navigateToAuestionFromTable(index+1)}}></a>
                                                {index+1}
                                            </th>
                                            <td>
                                                {
                                                    (getValues()[`test__answer${index+1}`] &&getValues()[`test__answer${index+1}`].length !==0) 
                                                    ?'Answered'
                                                    :'Not Answered Yet'
                                                }
                                            </td>
                                            <td className={styles["test-navigation__table-cell"]}>
                                                <input 
                                                type="checkbox"
                                                className={`${styles["test-navigation__table-flag"]}`}
                                                onClick={()=>{changeQuestionFlagStatus(index+1)}}
                                                defaultChecked={flaggedQuestions.includes(index+1)}/>
                                            </td>
                                            <td>
                                                {
                                                    (getValues()[`test__answer${index+1}`]&&getValues()[`test__answer${index+1}`].length !==0) 
                                                    ?(<span 
                                                    dangerouslySetInnerHTML={{__html: (getValues()[`test__answer${index+1}`])}}
                                                    />)
                                                    :'Not Answered Yet'
                                                }
                                            </td>
                                        </tr>
                                    ))
                                }
                            </tbody>
                        </table>
                    </div>
                    
                </Container>
            </div>

        </Modal>
        </>
  )
}

export default TestNavigationModal