import { useEffect, useState } from 'react'
import { useQuery } from '@apollo/client'
import { useMutation } from '@apollo/client'
import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const Authors = (props) => {
    const [name, setAuthorName] = useState('')
    const [born, setBorn] = useState('')
    const result = useQuery(ALL_AUTHORS)
    const [editAuthor] = useMutation(EDIT_AUTHOR, {
        refetchQueries: [{ query: ALL_AUTHORS }],
    })

    useEffect(() => {
        if (!result.loading) {
            setAuthorName(result.data.allAuthors[0].name)
        }
    }, [result.loading])

    if (!props.show) {
        return null
    }

    if (result.loading) {
        return <div>loading...</div>
    }

    const authors = result.data.allAuthors

    const updateName = ({ target }) => {
        setAuthorName(target.value)
    }

    const submit = async (event) => {
        event.preventDefault()

        editAuthor({
            variables: {
                name,
                born: parseInt(born),
            },
        })
        setBorn('')
    }

    return (
        <div>
            <h2>Authors</h2>
            <table>
                <tbody>
                    <tr>
                        <th>Name</th>
                        <th>born</th>
                        <th>books</th>
                    </tr>
                    {authors.map((a) => (
                        <tr key={a.name}>
                            <td>{a.name}</td>
                            <td>{a.born}</td>
                            <td>{a.bookCount}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <h2>Set Birthyear</h2>
            <form onSubmit={submit}>
                <div>
                    author
                    <select value={authors[0].name} onChange={updateName}>
                        {authors.map((a) => (
                            <option value={a.name}>{a.name}</option>
                        ))}
                    </select>
                </div>
                <div>
                    born
                    <input
                        value={born}
                        onChange={({ target }) => setBorn(target.value)}
                    />
                </div>
                <button type="submit">Update</button>
            </form>
        </div>
    )
}

export default Authors
