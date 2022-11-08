import { useState } from 'react'
import Authors from './components/Authors'
import { useApolloClient, useQuery } from '@apollo/client'
import Books from './components/Books'
import NewBook from './components/NewBook'
import Login from './components/Login'
import Navbar from './components/Navbar'

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null)
    const [page, setPage] = useState('authors')
    const client = useApolloClient()
    const [token, setToken] = useState(null)

    const notify = (message) => {
        setErrorMessage(message)
        setTimeout(() => {
            setErrorMessage(null)
        }, 10000)
    }
    console.log(token)
    const logout = () => {
        setToken(null)
        localStorage.clear()
        client.resetStore()
        setPage('authors')
    }

    return (
        <div>
            <Navbar setPage={setPage} token={token} logout={logout} />
            <Authors show={page === 'authors'} />
            <Books show={page === 'books'} />
            <NewBook show={page === 'add'} />
            <Login
                setError={notify}
                setToken={setToken}
                show={page === 'login'}
                setPage={setPage}
            />
        </div>
    )
}

export default App
