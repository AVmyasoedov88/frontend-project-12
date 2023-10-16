import { createContext, useState } from 'react'

const loginContext = createContext({})

export const LoginProvider = ({ children }) => {
    const token = window.localStorage.getItem('token')
    const username = window.localStorage.getItem('username')
    const [auth, setAuth] = useState({ token, username })
    const logIn = (res) => {
        window.localStorage.setItem('token', res.token)
        window.localStorage.setItem('username', res.username)
        setAuth(res)
    }

    const logOut = () => {
        window.localStorage.removeItem('token')
        window.localStorage.removeItem('username')
        //setAuth(null);
    }

    return (
        <loginContext.Provider value={{ auth, logIn, logOut }}>
            {children}
        </loginContext.Provider>
    )
}

export default loginContext
