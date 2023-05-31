import React from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import styles from './CategoriesSection.module.css'

import PageCategoryCard from 'components/Global/Elements/PageCategoryCard/PageCategoryCard'
import PageContentHeader from 'components/Global/Elements/PageContentHeader/PageContentHeader'

import {ReactComponent as AmericanIcon} from 'assets/icons/USA.svg'
import {ReactComponent as AzharIcon} from 'assets/icons/azhar.svg'
import {ReactComponent as LocalIcon} from 'assets/icons/egypt.svg'

function CategoriesSection() {
    const cardData = [
        {
            cardText:'American',
            cardIcon:<AmericanIcon/>,
            cardLink:'/all-exams'
        },
        {
            cardText:'Local',
            cardIcon:<LocalIcon/>,
            cardLink:'/all-exams'
        },
        {
            cardText:'Alazhar',
            cardIcon:<AzharIcon/>,
            cardLink:'/all-exams'
        }
    ]
    return (
        <section className={styles["show-categories"]}>
            <Container fluid='lg'>
                <PageContentHeader content='Choose Your Category'/>
                <div className={styles["show-categories__cats"]}>
                    <Row>
                        {
                            cardData && cardData.map((card,index)=>(
                                <Col md='4' key={card.cardText +index}>
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

export default CategoriesSection