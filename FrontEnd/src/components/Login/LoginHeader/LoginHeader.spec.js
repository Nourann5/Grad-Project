import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import LoginHeader from './LoginHeader'

describe('Test the Login Header', () => { 
    it('Heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <LoginHeader/>
            </BrowserRouter>
        )
        // const headerTitle = screen.getByRole('generic')
        // expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
})