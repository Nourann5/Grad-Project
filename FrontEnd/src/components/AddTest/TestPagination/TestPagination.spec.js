import {render , renderHook, screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import TestPagination from './TestPagination'

const methods = renderHook(()=> useForm())

describe('Test the Add Test ', () => { 
    it('TestPagination',()=>{
        const TestInput = () => {
            const methods = useForm();
            return (
                <BrowserRouter>
                    <FormProvider {...methods}>
                        <TestPagination />
                    </FormProvider>
                </BrowserRouter>
            );
        };
        const tree =  render(<TestInput/>)
        expect(tree).toMatchSnapshot()
    })
})