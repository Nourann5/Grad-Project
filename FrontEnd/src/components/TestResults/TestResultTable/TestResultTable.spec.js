import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import TestResultTable from './TestResultTable'

describe('Test the Test Result Table', () => { 
    it('heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <TestResultTable/>
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
 })