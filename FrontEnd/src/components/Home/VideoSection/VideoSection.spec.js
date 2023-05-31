import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import VideoSection from './VideoSection'

describe('Test the Home Videos', () => { 
    it('Heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <VideoSection/>
            </BrowserRouter>
        )
        const headerTitle = screen.getByRole('heading')
        expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
})