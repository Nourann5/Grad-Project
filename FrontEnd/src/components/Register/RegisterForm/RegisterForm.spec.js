import {render , renderHook, screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import RegisterForm from './RegisterForm'

const methods = renderHook(()=> useForm())

describe('Test the Registeration Form ', () => { 
    it('Registeration Form',()=>{
        const TestInput = () => {
            const methods = useForm();
            return (
                <BrowserRouter>
                    <FormProvider {...methods}>
                        <RegisterForm />
                    </FormProvider>
                </BrowserRouter>
            );
        };
        const tree =  render(<TestInput/>)
        expect(tree).toMatchSnapshot()
    })
})