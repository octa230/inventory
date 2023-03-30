import { createContext, useReducer } from "react";

export const Store = createContext()

const initialState = {
    userInfoToken: localStorage.getItem('userInfoToken')
    ? JSON.parse(localStorage.getItem('userInfoToken'))
    : null

}


function reducer(state, action){
    switch(action.type){
        case 'SIGN_IN':
            return {...state, userInfoToken: action.payload}
        case 'SIGN_OUT':
            return { ...state, userInfoToken: null }

        default:
            return state;   
    }
}

export function StoreProvider(props){
    const [state, dispatch] = useReducer(reducer, initialState)
    const value = { state, dispatch};
    return <Store.Provider value={value}>{props.children}</Store.Provider>
}