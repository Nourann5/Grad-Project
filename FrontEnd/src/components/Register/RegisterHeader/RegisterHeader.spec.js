import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import RegisterHeader from './RegisterHeader'

describe('Test the Register Header', () => { 
    it('Heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <RegisterHeader/>
            </BrowserRouter>
        )
        // const headerTitle = screen.getByRole('generic')
        // expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
})