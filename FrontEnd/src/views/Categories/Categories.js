import CategoriesSection from 'components/Categories/CategoriesSection/CategoriesSection'
import PageBreadCrumb from 'components/Global/Layout/PageBreadCrumb/PageBreadCrumb'
import React, { useEffect, useState } from 'react'
import { useLocation, useParams, useSearchParams } from 'react-router-dom'
import { toast } from 'react-toastify'
import { axiosConfig } from 'utils/axiosConfig'


import PageContentHeader from 'components/Global/Elements/PageContentHeader/PageContentHeader'

import {ReactComponent as AmericanIcon} from 'assets/icons/USA.svg'
import {ReactComponent as AzharIcon} from 'assets/icons/azhar.svg'
import {ReactComponent as LocalIcon} from 'assets/icons/egypt.svg'
import { Col, Container, Row } from 'react-bootstrap'
import PageCategoryCard from 'components/Global/Elements/PageCategoryCard/PageCategoryCard'
import ButtonsLoading from 'components/Global/Elements/ButtonsLoading/ButtonsLoading'

import loadingSrc from 'assets/imgs/pageLoading.gif'
import styles from './Categories.module.css'
function Categories() {
  const params = useParams()
  let [searchParams, setSearchParams] = useSearchParams();
  const location = useLocation()
  const [categories ,setCategories] = useState([])
  const [isLoadingData , setIsLoadingData] = useState(false)
    // const breadCrumbLinks =[
    //     {
    //       pageName:'Categories',
    //       pageLink:''
    //     }
    //   ]
      let getData =(data)=>{
        // setIsSubmitting(true)
        setIsLoadingData(true)
        // let endPoint = params.id?`/childs/${params.id}`:``
        axiosConfig.get(`category/all-user-categories?user_id=${params.id}&category_id=${searchParams.get('category_id')}`).then(res=>{
            console.log('res.data.data',res.data.data)
          setIsLoadingData(false)
            setCategories(res.data.data)
        }).catch(err=>{
          setIsLoadingData(false)
          let errors = err.response.data.errors
          Object.keys(errors).forEach(error=>{
            toast.error(errors[error][0])
          })
        })
    }
    useEffect(()=>{
      setCategories([])
      getData()
    },[location])
  return (
    <>
        {/* <PageBreadCrumb breadCrumbLinks={breadCrumbLinks}/> */}
        {/* <section className={styles["show-categories"]}> */}
        <section>
            <Container fluid='lg'>
            {!isLoadingData&&
              <PageContentHeader content='Choose Your Category'/>
            }
                <div>
                    <Row>
                      {isLoadingData?
                          <img src={loadingSrc} alt="element loading" className={styles['element-loading']}/>
                      :
                          categories && categories.map((category,index)=>(
                              <Col md='4' className='mb-4' key={category.id}>
                                  <PageCategoryCard categoryInfo={category} />
                              </Col>
                          ))
                        }
                    </Row>
                </div>
            </Container>
        </section>

        {/* <CategoriesSection/> */}
    </>

  )
}

export default Categories