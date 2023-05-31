import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import TotalValues from './TotalValues'

describe('Test the Total Value', () => { 
    it('heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <TotalValues/>
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
 })