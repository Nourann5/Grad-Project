import React from 'react'
import { Link } from 'react-router-dom'
import './PortalTablePagination.css'
import {ReactComponent as NextIcon} from 'assets/icons/nextArrow.svg'
import {ReactComponent as PrevIcon} from 'assets/icons/prevArrow.svg'
import { Pagination } from 'react-bootstrap'
function PortalTablePagination() {
  return (
    // <div className={styles['table-pagination__wrapper']}>
    //     <ul className={styles['table-pagination__list']}>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={`${styles['table-pagination__button']} ${styles['table-pagination__button--prev']}`}>
    //                 <PrevIcon className={`${styles['table-pagination__prev-next-icon']} ${styles['table-pagination__prev-icon']}`}/>
    //             </button>
    //         </li>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={styles['table-pagination__button']}>1</button>
    //         </li>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={styles['table-pagination__button']}>2</button>
    //         </li>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={styles['table-pagination__button']}>3</button>
    //         </li>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={styles['table-pagination__button']}>4</button>
    //         </li>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={styles['table-pagination__button']}>5</button>
    //         </li>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={styles['table-pagination__button']}>6</button>
    //         </li>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={styles['table-pagination__button']}>7</button>
    //         </li>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={styles['table-pagination__button']}>8</button>
    //         </li>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={styles['table-pagination__button']}>9</button>
    //         </li>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={styles['table-pagination__button']}>10</button>
    //         </li>
    //         <li className={styles['table-pagination__item']}>
    //             <button className={`${styles['table-pagination__button']} ${styles['table-pagination__button--next']}`}>
    //                 <NextIcon className={`${styles['table-pagination__prev-next-icon']} ${styles['table-pagination__next-icon']}`}/>
    //             </button>
    //         </li>
    //     </ul>
    // </div>
    <>
    <Pagination>
      {/* <Pagination.First /> */}
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>
      <Pagination.Ellipsis />

        <Pagination.Item>{10}</Pagination.Item>
        <Pagination.Item>{11}</Pagination.Item>
        <Pagination.Item active>{12}</Pagination.Item>
        <Pagination.Item>{13}</Pagination.Item>
        <Pagination.Item>{14}</Pagination.Item>

      <Pagination.Ellipsis />
      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      {/* <Pagination.Last /> */}
    </Pagination>
    </>
  )
}

export default PortalTablePagination