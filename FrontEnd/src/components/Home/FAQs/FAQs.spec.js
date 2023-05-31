import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import FAQs from './FAQs'

describe('Test the Home FAQS', () => { 
    it('Heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <FAQs/>
            </BrowserRouter>
        )
        const headerTitle = screen.getByRole('heading',{name:'FREQUENTLY ASKED QUESTIONS'})
        expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
})