import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import CategoriesSection from './CategoriesSection'

describe('Test the Categories', () => { 
    it('heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <CategoriesSection/>
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
 })