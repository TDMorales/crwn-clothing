import { createContext, useState, useEffect, useReducer } from "react";

import { onAuthStateChangedListener, createUserDocFromAuth } from "../utils/firebase/firebase.utils";

export const UserContext = createContext({
    currentUser: null,
    setCurrentUser: () => null
})

const USER_ACTION_TYPES = {
    SET_CURRENT_USER: 'SET_CURRENT_USER'
}

const userReducer = (state, action) => {
    console.log('dispatched')
    console.log(action)
    const { type, payload } = action;
    switch (type) {
        case 'SET_CURRENT_USER':
            return {
                ...state,
                currentUser: payload
            }
        default:
            return new Error(`Unrecognized type ${type} in userReducer`)
    }
}

const INITIAL_STATE = {
    currentUser: null
}

export const UserProvider = ({ children }) => {
    // const [currentUser, setCurrentUser] = useState(null)
    const [{ currentUser }, dispatch] = useReducer(userReducer, INITIAL_STATE)
    const setCurrentUser = (user) => {
        dispatch({ type: USER_ACTION_TYPES.SET_CURRENT_USER, payload: user })
    }
    const value = { currentUser, setCurrentUser }

    useEffect(() => {
        const unsubscribe = onAuthStateChangedListener((user) => {
            if (user) {
                createUserDocFromAuth(user);
            }
            setCurrentUser(user)
        })

        return unsubscribe;
    }, [])

    return <UserContext.Provider value={value}>{children}</UserContext.Provider>
}