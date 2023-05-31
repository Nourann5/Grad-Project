import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import TestResultTableRow from './TestResultTableRow'

describe('Test the Test Reuslt Table', () => { 
    it('heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <TestResultTableRow/>
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
 })