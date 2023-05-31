import {render , screen} from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import AllTestFilter from './AllTestFilter'

describe('Test the All Tests Form', () => { 
    it('Heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <AllTestFilter />
            </BrowserRouter>
        )
        expect(tree).toMatchSnapshot()
    })
})