import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import Teachers from './Teachers'

describe('Test the home Teachers', () => { 
    it('heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <Teachers/>
            </BrowserRouter>
        )
        const headerTitle = screen.getByRole('heading',{level:2})
        expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
 })