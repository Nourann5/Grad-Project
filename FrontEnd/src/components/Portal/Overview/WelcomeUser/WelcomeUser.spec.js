import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import WelcomeUser from './WelcomeUser'

describe('Test the Welcome User', () => { 
    it('heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <WelcomeUser/>
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
 })