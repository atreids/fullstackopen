import { useQuery } from '@apollo/client'
import Persons from './persons'
import PersonForm from './personForm'
import { ALL_PERSONS } from './queries'

const App = () => {
    const result = useQuery(ALL_PERSONS)

    if (result.loading) {
        return <div>loading...</div>
    }

    return (
        <div>
            <Persons persons={result.data.allPersons} />
            <PersonForm />
        </div>
    )
}

export default App
