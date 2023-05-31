import React, { useState } from 'react'
import {ReactComponent as AddIcon} from 'assets/icons/addIcon.svg'
import styles from './CategoriesTableHeader.module.css'
import AddEditCategoryModal from '../AddEditCategoryModal/AddEditCategoryModal';
function CategoriesTableHeader({getData}) {
    const [showAddCategory, setShowAddCategory] = useState(false);

    const handleCloseAddCategory = () => setShowAddCategory(false);
    const handleShowAddCategory = () => setShowAddCategory(true);
  return (
    // <div className={styles['table__header-wrapper']}>
    <>
        {/* <h1 className={styles['table__title']}>Students</h1> */}
        <button className={styles['table__add-button']} onClick={handleShowAddCategory}>
            <AddIcon className={styles['table__add-icon']}/>Add Category
        </button>
        <AddEditCategoryModal showAddCategory={showAddCategory} handleCloseAddCategory={handleCloseAddCategory} getData={getData}/>
    </>
    // </div>
  )
}

export default CategoriesTableHeader