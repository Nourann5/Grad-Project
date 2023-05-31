import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import QuickAccess from './QuickAccess'

describe('Test the Portal Quick Access', () => { 
    it('heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <QuickAccess/>
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
 })