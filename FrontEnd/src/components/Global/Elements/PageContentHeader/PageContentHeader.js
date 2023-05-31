import React from 'react'
import styles from './PageContentHeader.module.css'
function PageContentHeader({content}) {
  return (
    <h2 className={styles['page-content__header']}>
        {content}
    </h2>
  )
}

export default PageContentHeader