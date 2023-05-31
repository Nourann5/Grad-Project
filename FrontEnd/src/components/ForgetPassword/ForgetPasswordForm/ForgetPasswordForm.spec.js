import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import ForgetPasswordForm from './ForgetPasswordForm'

describe('Test the Forget Password', () => { 
    it('heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <ForgetPasswordForm/>
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
 })