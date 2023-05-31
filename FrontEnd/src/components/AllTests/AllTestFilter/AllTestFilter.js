import React, { useState } from 'react'
import styles from './AllTestFilter.module.css'
import {ReactComponent as SortByIcon} from 'assets/icons/sortBy.svg'

function AllTestFilter({filterTests,changeFilterData}) {
   
    return (
        <div className={styles["show-categories__filter"]}>
            <span className={styles["show-categories__filter-span"]}>
                Sort By 
                <SortByIcon/>
            </span>
            <div className={styles["show-categories__filter-items"]}>
                <button className={`${styles['show-categories__filter-button']} btn 
                ${filterTests ==='all' ?styles['active'] :''}`} onClick={()=>{changeFilterData('all')}}>All</button>

                <button className={`${styles['show-categories__filter-button']} btn 
                ${filterTests ==='w' ?styles['active'] :''}`} onClick={()=>{changeFilterData('w')}}>Writing</button>

                <button className={`${styles['show-categories__filter-button']} btn 
                ${filterTests ==='r' ?styles['active'] :''}`} onClick={()=>{changeFilterData('r')}}>Reading</button>

                <button className={`${styles['show-categories__filter-button']} btn 
                ${filterTests ==='mwo' ?styles['active'] :''}`} onClick={()=>{changeFilterData('mwo')}}>Math Without Calc</button>

                <button className={`${styles['show-categories__filter-button']} btn 
                ${filterTests ==='mw' ?styles['active'] :''}`} onClick={()=>{changeFilterData('mw')}}>Math With Calc</button>

            </div>
        </div>
    )
}

export default AllTestFilter