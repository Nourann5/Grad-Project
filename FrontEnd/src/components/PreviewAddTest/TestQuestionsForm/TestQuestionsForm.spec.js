import {render , renderHook, screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import TestQuestionsForm from './TestQuestionsForm'

const {methods }= renderHook(()=> useForm())


describe('Test the Preview Test ', () => { 
    it('Test Navigation',()=>{
        const tree =  render(
            <BrowserRouter>
                <FormProvider {...methods}>
                    <TestQuestionsForm />
                </FormProvider>
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
})