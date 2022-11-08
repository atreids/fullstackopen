import { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'
import Persons from './persons'
import PersonForm from './personForm'
import PhoneForm from './phoneForm'
import LoginForm from './loginForm'
import { ALL_PERSONS } from './queries'

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [token, setToken] = useState(null)
    const client = useApolloClient()
    const result = useQuery(ALL_PERSONS)

    if (result.loading) {
        return <div>loading...</div>
    }

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }

    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
    }

    if (!token) {
        return (
            <div>
                <Notify errorMessage={errorMessage} />
                <h2>Login</h2>
                <LoginForm setToken={setToken} setError={notify} />
            </div>
        )
    }

    return (
        <div>
            <Notify errorMessage={errorMessage} />
            <button onClick={logout}>logout</button>
            <Persons persons={result.data.allPersons} />
            <PersonForm setError={notify} />
            <PhoneForm setError={notify} />
        </div>
    )
}

const Notify = ({ errorMessage }) => {
    if (!errorMessage) {
        return null
    }
    return <div style={{ color: 'red' }}>{errorMessage}</div>
}

export default App
