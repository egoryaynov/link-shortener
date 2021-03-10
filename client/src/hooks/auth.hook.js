import {useCallback, useState, useEffect} from 'react'

const STORAGE_NAME = 'userData'

export const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const [ready, setReady] = useState(null)

    const login = useCallback((jwtToken, id) => {
        setToken(jwtToken)
        setUserId(id)

        localStorage.setItem(STORAGE_NAME, JSON.stringify({
            token: jwtToken, userId: id
        }))
    }, [])

    const logout = useCallback(() => {
        setToken(null)
        setUserId(null)

        localStorage.removeItem(STORAGE_NAME)
    }, [])

    useEffect(() => {
        const data = JSON.parse(localStorage.getItem(STORAGE_NAME))

        if (data && data.token) {
            login(data.token, data.userId)
        }

        setReady(r => true)
    }, [login])

    return {token, userId, login, logout, ready}
}