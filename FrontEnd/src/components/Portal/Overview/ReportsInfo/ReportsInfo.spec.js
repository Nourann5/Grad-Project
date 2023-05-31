import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import ReportsInfo from './ReportsInfo'

describe('Test the Report Info', () => { 
    it('heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <ReportsInfo/>
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
 })