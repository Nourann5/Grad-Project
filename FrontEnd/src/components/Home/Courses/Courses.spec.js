import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import Courses from './Courses'

describe('Test the home Courses', () => { 
    it('heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <Courses/>
            </BrowserRouter>
        )
        const headerTitle = screen.getByRole('heading',{level:2})
        expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
 })