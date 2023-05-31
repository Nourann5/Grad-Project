import React, { useEffect } from 'react'
import styles from './PageCategoryCard.module.css'
import { NavLink, useParams } from 'react-router-dom'
import imageSrc from 'assets/imgs/video.png'
function PageCategoryCard({categoryInfo}) {
  // const image = categoryInfo.cardIcon.type
  const params = useParams()
  let nextPageLink = 
  categoryInfo?.children_categories?.length!=0?`/categories/${params?.id}?category_id=${categoryInfo?.id}`
  :`/exams/${categoryInfo?.id}`
  useEffect(()=>{
    nextPageLink = 
    categoryInfo?.children_categories?.length!=0?`/categories/${params?.id}?category_id=${categoryInfo?.id}`
    :`/exams/${categoryInfo?.id}`
  },[categoryInfo])
  return (
    <div className={styles["show-categories__cat"]}>
        <NavLink to={nextPageLink} className={styles["show-categories__cat-link"]}></NavLink>
        <div className={styles["show-categories__img-container"]}>
            {/* <Icon className={styles["show-categories__img"]}/> */}
            <img src={categoryInfo?.image} className={styles["show-categories__img"]}/>
            {/* <img src={imageSrc} className={styles["show-categories__img"]}/> */}
            <h2 className={styles["show-categories__cat-title"]}>{categoryInfo?.title}</h2>
            {/* {categoryInfo.cardFilter &&
              <div className={styles["show-categories__exam-types"]}>
                {
                  categoryInfo.cardFilter && categoryInfo.cardFilter.split(',').map(filter=>(
                    <div className={styles["show-categories__exam-type"]}>{filter}</div>
                  ))
                }
              </div>
            } */}
        </div>
    </div>
  )
}

export default PageCategoryCard