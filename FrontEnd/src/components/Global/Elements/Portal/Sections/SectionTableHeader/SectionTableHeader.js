import React, { useState } from 'react'
import {ReactComponent as AddIcon} from 'assets/icons/addIcon.svg'
import styles from './SectionTableHeader.module.css'
import AddEditSectionModal from '../AddEditSectionModal/AddEditSectionModal';
function SectionTableHeader({getData}) {
    const [showAddSection, setShowAddSection] = useState(false);

    const handleCloseAddSection = () => setShowAddSection(false);
    const handleShowAddSection = () => setShowAddSection(true);
  return (
    // <div className={styles['table__header-wrapper']}>
    <>
        {/* <h1 className={styles['table__title']}>Students</h1> */}
        <button className={styles['table__add-button']} onClick={handleShowAddSection}>
            <AddIcon className={styles['table__add-icon']}/>Add Section
        </button>
        <AddEditSectionModal showAddSection={showAddSection} handleCloseAddSection={handleCloseAddSection} getData={getData}/>
    </>
    // </div>
  )
}

export default SectionTableHeader