import {render , screen} from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from 'store/store'
import AllTestsSection from './AllTestsSection'

describe('Test the All Tests Section', () => { 
    it('Heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <AllTestsSection />
            </BrowserRouter>
        )
        // const headerTitle = screen.getByRole('paragraph',{name:'Welcome Back'})
        // expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
})