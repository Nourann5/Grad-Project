import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import GetStarted from './GetStarted'

describe('Test the Home Gets Started', () => { 
    it('Heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <GetStarted/>
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
})