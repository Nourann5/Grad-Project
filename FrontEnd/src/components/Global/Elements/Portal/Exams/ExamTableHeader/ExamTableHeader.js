import React, { useState } from 'react'
import {ReactComponent as AddIcon} from 'assets/icons/addIcon.svg'
import styles from './ExamTableHeader.module.css'
import AddEditExamModal from '../AddEditExamModal/AddEditExamModal';
function ExamTableHeader({getData}) {
    const [showAddExam, setShowAddExam] = useState(false);

    const handleCloseAddExam = () => setShowAddExam(false);
    const handleShowAddExam = () => setShowAddExam(true);
  return (
    // <div className={styles['table__header-wrapper']}>
    <>
        {/* <h1 className={styles['table__title']}>Students</h1> */}
        <button className={styles['table__add-button']} onClick={handleShowAddExam}>
            <AddIcon className={styles['table__add-icon']}/>Add Test
        </button>
        <AddEditExamModal showAddExam={showAddExam} handleCloseAddExam={handleCloseAddExam} getData={getData}/>
    </>
    // </div>
  )
}

export default ExamTableHeader