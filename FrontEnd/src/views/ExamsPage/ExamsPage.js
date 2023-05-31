// import AllExamsSection from 'components/AllExams/AllExamsSection231312321/AllExamsSection'
// import PageBreadCrumb from 'components/Global/Layout/PageBreadCrumb/PageBreadCrumb'
import PageCategoryCard from 'components/Global/Elements/PageCategoryCard/PageCategoryCard'
import PageContentHeader from 'components/Global/Elements/PageContentHeader/PageContentHeader'
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import {ReactComponent as ExamIcon} from 'assets/icons/examCat.svg'
import styles from './ExamsPage.module.css'
import { axiosConfig } from 'utils/axiosConfig'
import { toast } from 'react-toastify'
import { useParams } from 'react-router-dom'
import PageExamCard from 'components/Global/Elements/PageExamCard/PageExamCard'
import loadingSrc from 'assets/imgs/pageLoading.gif'

function ExamsPage() {
  // const breadCrumbLinks =[
  //   {
  //     pageName:'Categories',
  //     pageLink:'/categories'
  //   },
  //   {
  //     pageName:'Exams',
  //     pageLink:''
  //   }
  // ]
  const cardData = [
    {
        cardText:'Est',
        cardIcon:<ExamIcon/>,
        cardLink:'/all-tests'
    },
    {
        cardText:'ACT',
        cardIcon:<ExamIcon/>,
        cardLink:'/all-tests'
    },
    {
        cardText:'SAT',
        cardIcon:<ExamIcon/>,
        cardLink:'/all-tests'
    }
]
const params =useParams()
const [exams ,setExams] = useState([])
const [isLoadingData , setIsLoadingData] = useState(false)
  // const breadCrumbLinks =[
  //     {
  //       pageName:'Categories',
  //       pageLink:''
  //     }
  //   ]
    let getData =(data)=>{
      // setIsSubmitting(true)
        console.log(params.id)
        setIsLoadingData(true)
        // let endPoint = params.id?`/childs/${params.id}`:``
        axiosConfig.get(`exams/all-category-exams/${params.id}`).then(res=>{
            console.log('res.data.data',res.data.data)
            setIsLoadingData(false)
            setExams(res.data.data)
        }).catch(err=>{
            setIsLoadingData(false)
            let errors = err.response.data.errors
            Object.keys(errors).forEach(error=>{
            toast.error(errors[error][0])
            })
        })
    }
    useEffect(()=>{
        console.log('rerender')
        setExams([])
        getData()
    },[params.id])
  return (
    <>
        {/* <PageBreadCrumb breadCrumbLinks={breadCrumbLinks}/> */}
        {/* <AllExamsSection/> */}
        
        <section className={styles["show-exams"]}>
            <Container fluid='lg'>
                {!isLoadingData&&
                    <PageContentHeader content='Choose Your Exam'/>
                }
                <div className={styles["show-exams__cats"]}>
                    <Row>
                        {isLoadingData?
                            <img src={loadingSrc} alt="element loading" className={styles['element-loading']}/>
                        :
                            exams && exams.map((exam,index)=>(
                                <Col md='4' className='mb-4' key={exam.name+exam.id}>
                                    <PageExamCard examInfo={exam} />
                                </Col>
                                
                            ))
                        }
                    </Row>
                </div>
            </Container>
        </section>
    </>

  )
}

export default ExamsPage