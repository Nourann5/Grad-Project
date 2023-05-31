import React, { useCallback, useState } from 'react'
import QuestionControl from './QuestionControl';
import styles from './QuestionsControl.module.css'
import {
  DndContext,
  closestCenter
}from '@dnd-kit/core'
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy
}from '@dnd-kit/sortable'
function QuestionsControl({examData,deleteQuestion,activeQuestion,setActiveQuestion,setExamData,changeQuestionOrder}) {
  const [currentOpenCollpase , setCurrentOpenCollpase] =useState(0)
  // const QuestionControlMemo = useCallback(()=>QuestionControl())
  let handleDragEnd =(event)=>{
    const {active,over} =event
    if(active.id!=over.id){
      setExamData(item=>{ 
      const activeIndex = active.data.current.sortable.index
      const overIndex = over.data.current.sortable.index
      // reArrangeOffersOrder(arrayMove(item,activeIndex,overIndex))
      return arrayMove(item,activeIndex,overIndex)
    })
    console.log(document.querySelector(`#question-collpase__button-wrapper${active.id}`))
    document.querySelector(`#question-collpase__button-wrapper${active.id}`).classList.add('active')
   }
  }

  // function reArrangeOffersOrder(data) {
  //   const formData = new FormData()
  //   console.log('datadatadata',data)
  //   data.forEach((item,index)=>{
  //     formData.append(`data[${index}][id]`, item.key)
  //     formData.append(`data[${index}][arrange]`, index+1)
  //   })
    
  //   axiosConfig.post( `${process.env.REACT_APP_API}/offers/arrange`, formData, {
  //     headers: {
  //       "Authorization": `Bearer ${JSON.parse(localStorage.getItem("authUser")).authToken}`
  //     }
  //   })
  //     .then(res => {
  //       setMsg(`Saved!`)
  //       setsuccess_msg(true)
  //       getOffers()
  //     }).catch(err=>{
  //     toast.error(err?.response?.data?.message||'Something went wrong')
  //     })
  // // }
  // }
  return (
    <>
      <DndContext
        collisionDetection={closestCenter}
        onDragEnd={handleDragEnd}
      >
        <SortableContext 
          items={examData?.map((i) => i?.id)}
          strategy={verticalListSortingStrategy}
          >
            {
                examData&&examData?.map((question,questionIndex)=>(
                <div key={'questionIndex'+question.id+`questionIndex${questionIndex}`}>
                  
                    <QuestionControl 
                      question={question} 
                      questionIndex={questionIndex}
                      deleteQuestion={deleteQuestion}
                      activeQuestion={activeQuestion}
                      setActiveQuestion={setActiveQuestion}
                      setCurrentOpenCollpase={setCurrentOpenCollpase}
                      currentOpenCollpase={currentOpenCollpase}
                      setExamData={setExamData}
                      examData={examData}
                      changeQuestionOrder={changeQuestionOrder}
                    />
                    
                </div>
                ))
            }
        </SortableContext>
      </DndContext>
    </>
  )
}

export default QuestionsControl