import Cookies from 'js-cookie'
import {LOG_OUT, SAVE_CATEGORIES, SUCCESS_LOGIN} from './LoginActionTypes'

let initialState={
    user:Cookies.get('user')?JSON.parse(Cookies.get('user')): {},
    token:Cookies.get('token')?Cookies.get('token'): null,
    permissions:[],
    isLogged:Cookies.get('token')?true:false,
    categories:[]
}

const LoginReducer = (state=initialState,action)=>{
    switch (action.type){
        case SUCCESS_LOGIN:
            return{
                ...state,
                token:action.userData.token,
                permissions:action.userData.permission,
                isLogged:true,
                user:action.userData.data
            }
        case LOG_OUT:
            return{
                ...state,
                token:null,
                permissions:[],
                isLogged:false,
                user:{}
        }
        case SAVE_CATEGORIES:
            return{
                ...state,
                categories:action?.categoryData,
        }
        default: return state;
    }
}
export default LoginReducer