import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import TestControls from './TestControls'

describe('Test the Preview Test ', () => { 
    it('Test Controls',()=>{
        const tree =  render(
            <BrowserRouter>
                <TestControls/>
            </BrowserRouter>
        )
        // const headerTitle = screen.getByRole('generic')
        // expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
})