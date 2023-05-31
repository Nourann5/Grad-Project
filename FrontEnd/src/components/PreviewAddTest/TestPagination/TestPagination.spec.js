import {render , renderHook, screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import TestPagination from './TestPagination'

const {methods }= renderHook(()=> useForm())


describe('Test the Preview Test ', () => { 
    it('Test Navigation',()=>{
        const tree =  render(
            <BrowserRouter>
                <FormProvider {...methods}>
                    <TestPagination/>
                </FormProvider>
            </BrowserRouter>
        )
        // const headerTitle = screen.getByRole('generic')
        // expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
})