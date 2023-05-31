import {render , renderHook, screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import TestSubmitModal from './TestSubmitModal'

// const {methods }= renderHook(()=> useForm())

const EndExamButtonComp= ({openSubmitModal})=>{
    return(
        <button type='button' className={`s`} onClick={openSubmitModal}>
            Add Questions
        </button>
    )
}
describe('Test the Preview Test ', () => { 
    it('Test Navigation',()=>{
        const tree =  render(
            <BrowserRouter>
                {/* <FormProvider {...methods}> */}
                    <TestSubmitModal  EndExamButtonComp={<EndExamButtonComp/>}/>
                {/* </FormProvider> */}
            </BrowserRouter>
        )
        // const headerTitle = screen.getByRole('generic')
        // expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
})