import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import ForgetPasswordHeader from './ForgetPasswordHeader'

describe('Test the Forget Password', () => { 
    it('heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <ForgetPasswordHeader/>
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
 })