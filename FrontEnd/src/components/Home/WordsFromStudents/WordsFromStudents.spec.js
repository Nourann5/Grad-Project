import {render , screen} from '@testing-library/react'
import { BrowserRouter, Route } from 'react-router-dom'
import WordsFromStudents from './WordsFromStudents'

describe('Test the Home Words From Our Students', () => { 
    it('Heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <WordsFromStudents/>
            </BrowserRouter>
        )
        const headerTitle = screen.getByRole('heading',{name:'WORDS FROM OUR STUDENTS'})
        expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
})