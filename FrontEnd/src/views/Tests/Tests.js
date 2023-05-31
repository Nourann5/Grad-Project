import TestControls from 'components/Test/TestControls/TestControls'
import TestPagination from 'components/Test/TestPagination/TestPagination'
import React, { useEffect, useState } from 'react'
import { Container } from 'react-bootstrap'
import TestQuestionsForm from 'components/Test/TestQuestionsForm/TestQuestionsForm'
import { useForm ,FormProvider } from 'react-hook-form'
import Cookies from 'js-cookie'
import { axiosConfig } from 'utils/axiosConfig'
import { useParams } from 'react-router-dom'

function Tests() {
  // let answerModal={
  //   id:dat.id,
  //   question_number:dat.question_number,
  //   questions_group:dat.questions_group,
  //   answer_alpha:dat.question_answer_type == 'multi' ? [] : null,
  //   answer_value:dat.question_answer_type == 'multi' ? [] : null,
  //   flagged:false,
  //   answered:false,
  // }
    let methods = useForm()
    const params = useParams()
    const [data ,setData] =useState([])
    const [testData ,setTestData] =useState(null)
    const [activeQuestion , setActiveQuestion] =useState(1)

    let flaggedCondition =Cookies.get('exam_flagged_questions')?JSON.parse(Cookies.get('exam_flagged_questions')):[]
    const [flaggedQuestions , setFlaggedQuestions] =useState(flaggedCondition)
    const [questionStates , setquestionStates] =useState([])

    let changeQuestionFlagStatus = (flaggedQuestion)=>{
        let flaggedQuestionsModify = [...flaggedQuestions]

        flaggedQuestionsModify.includes(flaggedQuestion)?
            flaggedQuestionsModify =flaggedQuestionsModify.filter(question=>{
            return question !== flaggedQuestion
            })
        :flaggedQuestionsModify.push(flaggedQuestion)
        
        setFlaggedQuestions(flaggedQuestionsModify)
        Cookies.set('exam_flagged_questions',JSON.stringify(flaggedQuestionsModify))
        // console.log(Cookies.get('exam_flagged_questions'))
    }
    

    let changeActiveQuestion = (questionNumber) =>{
        setActiveQuestion(questionNumber)
    }

    let exams =[
      {
          "id" : 1,
          "question_number" : 1,
          "screen_type"   : "two",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-101 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 1,
          "question_answer_type" : "single",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes Ona"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes Onb"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes Onc"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes Ond"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes One"
              }
          ]
      },
      {
          "id" : 2,
          "question_number" : 2,
          "screen_type"   : "one",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-102 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 1,
          "question_answer_type" : "single",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
      {
          "id" : 3,
          "question_number" : 3,
          "screen_type"   : "two",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-103 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 1,
          "question_answer_type" : "multi",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
      {
          "id" : 4,
          "question_number" : 4,
          "screen_type"   : "one",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-104 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 1,
          "question_answer_type" : "multi",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
      {
          "id" : 5,
          "question_number" : 5,
          "screen_type"   : "two",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-105 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 1,
          "question_answer_type" : "multi",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
      {
          "id" : 6,
          "question_number" : 6,
          "screen_type"   : "two",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-106 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 1,
          "question_answer_type" : "input",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
      {
          "id" : 7,
          "question_number" : 7,
          "screen_type"   : "two",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-107 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 1,
          "question_answer_type" : "single",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
      {
          "id" : 8,
          "question_number" : 8,
          "screen_type"   : "two",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-108 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 2,
          "question_answer_type" : "single",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
      {
          "id" : 9,
          "question_number" : 9,
          "screen_type"   : "one",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-109 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 2,
          "question_answer_type" : "single",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
      {
          "id" : 10,
          "question_number" : 10,
          "screen_type"   : "two",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-110 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 2,
          "question_answer_type" : "multi",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
      {
          "id" : 11,
          "question_number" : 11,
          "screen_type"   : "one",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-11 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 2,
          "question_answer_type" : "multi",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
      {
          "id" : 12,
          "question_number" : 12,
          "screen_type"   : "two",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-120 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 2,
          "question_answer_type" : "input",
          "question_correct_number" : 1,
          "question_answers" :null
      },
      {
          "id" : 13,
          "question_number" : 13,
          "screen_type"   : "two",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-130 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 2,
          "question_answer_type" : "multi",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
      {
          "id" : 14,
          "question_number" : 14,
          "screen_type"   : "one",
          "question_info"   : "<h2 class='test__info-heading'>Questions 1-140 are based on the following passage.</h2><p>Akira came directly, breaking all tradition. Was that it? Had he followed form had he asked his mother to speak to his father to approach a Line go-between would Chie have been more receptive? He came on a winter’s eve. He pounded on the door while a cold rain beat on the shuttered veranda, so at first Chie thought him only the wind. The maid knew better. Chie heard her soft scuttling footsteps, the creak of the door. Then the maid brought a 10 calling card to the drawing room, for Chie.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p><p>Chie was reluctant to go to her guest; perhaps she was feeling too cozy. She and Naomi were reading at a low table set atop a charcoal brazier. A thick quilt spread over the sides of the table so their legs were 15 tucked inside with the heat. “Who is it at this hour, in this weather?” Chie questioned as she picked the name card off the maid’s lacquer tray.</p>",
          "question_name"   : "Which choice best describes what happens in the passage?",
          "questions_group" : 2,
          "question_answer_type" : "input",
          "question_correct_number" : 1,
          "question_answers" :[
              {
                  "id" : 1,
                  "answer_alpha" : "a" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 2,
                  "answer_alpha" : "b" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 3,
                  "answer_alpha" : "c" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 4,
                  "answer_alpha" : "d" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              },
              {
                  "id" : 5,
                  "answer_alpha" : "e" ,
                  "answer_name" : "One Character Argues With Another Character Who Intrudes On"
              }
          ]
      },
    ]
    
    let createQuestionStatesArray =(examData)=>{
      let questionStatesModify = []
      examData.forEach(val=>{
        let answerModal={
          id:val.id,
          question_number:val.question_number,
          questions_group:val.questions_group,
          answer_alpha:val.question_answer_type === 'multi' ? [] : null,
          answer_value:val.question_answer_type === 'multi' ? [] : null,
          flagged:false,
          answered:false,
        }
        questionStatesModify.push(answerModal)
      })
      setquestionStates(questionStatesModify)

    }

    useEffect(()=>{
        // setTestData(exams)
        createQuestionStatesArray(exams)
    },[])
    const watchAllFields = methods.watch();

    useEffect(()=>{
        Cookies.set('exam-answers',JSON.stringify(methods.getValues()),{expires:1})
    },[[watchAllFields]])

    const endExam = (data)=>{
      // console.log(methods.getValues())
        alert('asasasas')
    };
    let startAlphaNumber=()=>{
        let startAlpha = 49; 

        switch (data?.question_configration&&data?.question_configration?.question_alpha){
            case 'english':
                startAlpha =97
            break;
            case 'arabic':
                startAlpha =1575
            break;
            case 'roman':
                startAlpha =8544
            break;
            case 'number':
                startAlpha =49
            break;
            default:return 49
        }
        return startAlpha
    }

    let getExam =()=>{
        axiosConfig.get(`exams/exam/${params?.id}`,{
            headers: {"Authorization":`Bearer ${Cookies.get('token')}`}
        }).then(res=>{
            console.log('res?.data?.data',res?.data?.data)
            setData(res?.data?.data)
        }).catch(err=>{
            
        })
    }
    useEffect(()=>{
        getExam()
    },[])
    useEffect(()=>{
        if(data){
            let testData = data &&data?.questions?.map((question,index)=>{
                console.log('question?.question_name',question?.question_name)
                let startAlpha = startAlphaNumber()
                const answers = question?.question_answers?.map(answer=>{
                    return{
                        "id" : answer?.id,
                        "answer_alpha" : `<span>&#${startAlpha++};</span> ` ,
                        "answer_name" : answer?.answer_value
                    }
                    
                })
                return {
                    "id" : question?.id,
                    "question_number" : index,
                    "screen_type"   : question?.screen_type,
                    "question_info"   : question?.question_information,
                    "question_name"   : question?.question_name,
                    "questions_group" : 1,
                    "question_answer_type" : question?.answer_type,
                    "question_correct_number" : 1,
                    "question_answers" :answers
                }
            })
            setTestData(testData)
        }
    },[data])
  return (
    <section className='test'>
        <FormProvider {...methods}> 
            <form onSubmit={methods.handleSubmit(endExam)}>
                <TestControls 
                    activeQuestion={activeQuestion} 
                    changeActiveQuestion={changeActiveQuestion} 
                    testData={testData} 
                    changeQuestionFlagStatus={changeQuestionFlagStatus}
                    flaggedQuestions={flaggedQuestions}
                    endExam={endExam}
                />

                <Container fluid className='px-4'>
                    <TestQuestionsForm 
                        activeQuestion={activeQuestion} 
                        testData={testData}
                    />
                    <TestPagination 
                        activeQuestion={activeQuestion} 
                        changeActiveQuestion={changeActiveQuestion} 
                        testData={testData}
                        flaggedQuestions={flaggedQuestions}
                    />
                </Container>
            </form>
        </FormProvider>
    </section>
  )
}

export default Tests