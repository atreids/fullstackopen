import { useState } from 'react'
import { useQuery } from '@apollo/client'
import Persons from './persons'
import PersonForm from './personForm'
import PhoneForm from './phoneForm'
import { ALL_PERSONS } from './queries'

const App = () => {
    const [errorMessage, setErrorMessage] = useState(null)

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

    return (
        <div>
            <Notify errorMessage={errorMessage} />
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
