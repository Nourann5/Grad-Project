import React from 'react'
import AllTestsSection from 'components/AllTests/AllTestsSection/AllTestsSection'
import PageBreadCrumb from 'components/Global/Layout/PageBreadCrumb/PageBreadCrumb'

function AllTests() {
  const breadCrumbLinks =[
    {
      pageName:'Categories',
      pageLink:'/categories'
    },
    {
      pageName:'Exams',
      pageLink:'/all-exams'
    },
    {
      pageName:'Tests',
      pageLink:''
    }
  ]
  return (
    <>
        <PageBreadCrumb breadCrumbLinks={breadCrumbLinks}/>
        <AllTestsSection/>
    </>

  )
}

export default AllTests