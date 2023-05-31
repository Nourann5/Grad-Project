import {render , renderHook, screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import TestQuestionsForm from './TestQuestionsForm'


describe('Test the Registeration Form ', () => { 
    it('Registeration Form',()=>{
        const TestInput = () => {
            const methods = useForm();
            return (
                <BrowserRouter>
                    <FormProvider {...methods}>
                        <TestQuestionsForm />
                    </FormProvider>
                </BrowserRouter>
            );
        };
        const tree =  render(<TestInput/>)
        expect(tree).toMatchSnapshot()
    })
})