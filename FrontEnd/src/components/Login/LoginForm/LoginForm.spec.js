import {render , screen} from '@testing-library/react'
import { Provider } from 'react-redux'
import { BrowserRouter, Route } from 'react-router-dom'
import store from 'store/store'
import LoginForm from './LoginForm'

describe('Test the Login Form', () => { 
    it('Heading exists',()=>{
        const tree =  render(
            <BrowserRouter>
                <Provider store={store}>
                    <LoginForm />
                </Provider>
            </BrowserRouter>
        )
        // const headerTitle = screen.getByRole('paragraph',{name:'Welcome Back'})
        // expect(headerTitle).toBeInTheDocument()
        expect(tree).toMatchSnapshot()
    })
})