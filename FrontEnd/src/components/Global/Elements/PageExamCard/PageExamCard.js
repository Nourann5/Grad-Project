import React from 'react'
import styles from './PageExamCard.module.css'
import { NavLink } from 'react-router-dom'
import imageSrc from 'assets/imgs/video.png'
// import {ReactComponent as ExamIcon} from 'assets/icons/examCat.svg'
import ExamIconSrc from 'assets/icons/examCat.svg'

function PageExamCard({examInfo}) {
  // const image = examInfo.cardIcon.type
  console.log('examInfoexamInfoexamInfo',examInfo)
  // const nextPageLink = examInfo?.childrens_id?`/categories/${examInfo?.id}`:`/exams/${examInfo?.id}`
  return (
    <div className={styles["show-categories__cat"]}>
        <NavLink to={`/test/${examInfo?.id}`} className={styles["show-categories__cat-link"]}></NavLink>
        <div className={styles["show-categories__img-container"]}>
            {/* <Icon className={styles["show-categories__img"]}/> */}
            <img src={examInfo?.image?examInfo?.image:ExamIconSrc} className={styles["show-categories__img"]}/>
            {/* <img src={imageSrc} className={styles["show-categories__img"]}/> */}
            <h2 className={styles["show-categories__cat-title"]}>{examInfo?.name}</h2>
            <h3 className={styles["show-categories__cat-date"]}>{examInfo?.year} - {examInfo?.month}</h3>
            {/* {examInfo.cardFilter &&
              <div className={styles["show-categories__exam-types"]}>
                {
                  examInfo.cardFilter && examInfo.cardFilter.split(',').map(filter=>(
                    <div className={styles["show-categories__exam-type"]}>{filter}</div>
                  ))
                }
              </div>
            } */}
        </div>
    </div>
  )
}

export default PageExamCard