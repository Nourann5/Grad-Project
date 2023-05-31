import {SAVE_CATEGORIES, SUCCESS_LOGIN} from './LoginActionTypes'
import {LOG_OUT} from './LoginActionTypes'

export const loggingIn = (data)=>{
    return{
        type:SUCCESS_LOGIN,
        userData:data
    }
}
export const saveCategories = (data)=>{
    return{
        type:SAVE_CATEGORIES,
        categoryData:data
    }
}
export const logOut = ()=>{
    return{
        type:LOG_OUT,
    }
}
