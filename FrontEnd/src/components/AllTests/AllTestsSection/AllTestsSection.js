import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './AllTestsSection.module.css'

import PageCategoryCard from 'components/Global/Elements/PageCategoryCard/PageCategoryCard'

import {ReactComponent as ExamIcon} from 'assets/icons/examCat.svg'
import AllTestFilter from '../AllTestFilter/AllTestFilter'

function AllTestsSection() {
    const cardData = [
        {
            cardText:'Sat Test Name1',
            cardIcon:<ExamIcon/>,
            cardLink:'/test',
            cardFilter:'r,w,mwo'
        },
        {
            cardText:'Sat Test Name2',
            cardIcon:<ExamIcon/>,
            cardLink:'/test',
            cardFilter:'r,w,mw'
        },
        {
            cardText:'Sat Test Name3',
            cardIcon:<ExamIcon/>,
            cardLink:'/test',
            cardFilter:'mw,mwo'
        },
        {
            cardText:'Sat Test Name4',
            cardIcon:<ExamIcon/>,
            cardLink:'/test',
            cardFilter:'r'
        },
        {
            cardText:'Sat Test Name5',
            cardIcon:<ExamIcon/>,
            cardLink:'/test',
            cardFilter:'w'
        },
        {
            cardText:'Sat Test Name6',
            cardIcon:<ExamIcon/>,
            cardLink:'/test',
            cardFilter:'r,w,mw,mwo'
        },
        {
            cardText:'Sat Test Name7',
            cardIcon:<ExamIcon/>,
            cardLink:'/test',
            cardFilter:'mwo'
        }
    ]

    const [filterTests ,setFilterTests] =useState('all')
    const [filterData , setFilterData] =useState(cardData)
    let changeFilterData = (type)=>{
        setFilterTests(type)
    }
    useEffect(()=>{
        if(filterTests ==='all'){
            setFilterData(cardData)
        }else{
            let filterData = cardData.filter(card=>{
                return card.cardFilter.includes(filterTests)
            })
            setFilterData(filterData)
        }
    },[filterTests])
    return (
        <section className={styles["show-tests"]}>
            <Container fluid='lg'>
                <AllTestFilter changeFilterData={changeFilterData} filterTests={filterTests} />
                <div className={styles["show-tests__cats"]}>
                    <Row>
                        {
                            filterData && filterData.map((card,index)=>(
                                <Col lg='4' md='6' className='mb-4' key={card.cardText +index} data-filter={card.cardFilter}>
                                    <PageCategoryCard cardInfo={card} />
                                </Col>
                            ))
                        }
                    </Row>
                </div>
            </Container>
        </section>
    )
}

export default AllTestsSection