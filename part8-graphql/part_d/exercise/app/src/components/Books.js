import { useState } from 'react'
import { useQuery } from '@apollo/client'
import { ALL_BOOKS } from '../queries'

const Books = (props) => {
    const result = useQuery(ALL_BOOKS)
    const [genre, setGenre] = useState('all genres')

    if (!props.show) {
        return null
    }

    if (result.loading) {
        ;<div>loading...</div>
    }

    const books = result.data.allBooks
    let genres = [...new Set(books.flatMap((book) => book.genres))]
    genres.push('all genres')
    console.log(genre)

    return (
        <div>
            <h2>books</h2>
            {genres.map((g) => (
                <button onClick={() => setGenre(g)}>{g}</button>
            ))}
            <table>
                <tbody>
                    <tr>
                        <th>Title</th>
                        <th>Author</th>
                        <th>Author DOB</th>
                        <th>Published Year</th>
                        <th>Genres</th>
                    </tr>
                    {books.map((a) => {
                        if (genre === 'all genres') {
                            return (
                                <tr key={a.title}>
                                    <td>{a.title}</td>
                                    <td>{a.author.name}</td>
                                    <td>{a.author.born}</td>
                                    <td>{a.published}</td>
                                    <td>{a.genres}</td>
                                </tr>
                            )
                        } else if (a.genres.includes(genre)) {
                            return (
                                <tr key={a.title}>
                                    <td>{a.title}</td>
                                    <td>{a.author.name}</td>
                                    <td>{a.author.born}</td>
                                    <td>{a.published}</td>
                                    <td>{a.genres}</td>
                                </tr>
                            )
                        }
                    })}
                </tbody>
            </table>
        </div>
    )
}

export default Books
