import {render , screen} from '@testing-library/react'
import HomeHeader from './HomeHeader'
import { BrowserRouter, Route } from 'react-router-dom'

describe('Test the home header', () => { 
    it('heading and buttons exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <HomeHeader/>
            </BrowserRouter>
        )
        const headerTitle = screen.getByRole('heading',{level:1})
        const headerMoreInfo = screen.getByRole('button')
        const headerPortalLink = screen.getByRole('link')
        expect(headerTitle).toBeInTheDocument()
        expect(headerPortalLink).toBeInTheDocument()
        expect(headerMoreInfo).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
 })