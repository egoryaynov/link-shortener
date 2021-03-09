import {useState, useCallback} from 'react'

export const useHttp = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState(null)

    const request = useCallback(async (url, method = 'GET', body = null, headers = {}) => {
        setIsLoading(true)

        const makeRequest = async () => {
            if (body) {
                body = JSON.stringify(body)
                headers['Content-Type'] = 'application/json'
            }

            const response = await fetch(url, {method, body, headers})
            const data = await response.json()

            if (!response.ok) {
                throw new Error(data.message || 'Что-то пошло не так')
            }

            return data
        }

        try {
            return await makeRequest()
        } catch (e) {
            setError(e.message)
        } finally {
            setIsLoading(false)
        }
    }, [])

    const clearError = () => {
        setError(null)
    }

    return {isLoading, request, error, clearError}
}