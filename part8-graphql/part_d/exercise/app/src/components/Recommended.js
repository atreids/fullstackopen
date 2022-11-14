import { useQuery } from '@apollo/client'
import { ME, ALL_BOOKS } from '../queries'

const Recommended = (props) => {
    const userResult = useQuery(ME)
    const bookResult = useQuery(ALL_BOOKS)

    if (!props.show) {
        return null
    }

    if (userResult.loading || bookResult.loading) {
        ;<div>loading...</div>
    }
    console.log(userResult)
    const favGenre = userResult.data.me.favouriteGenre
    console.log(favGenre)
    const books = bookResult.data.allBooks

    return (
        <div>
            <h2>Recommendations</h2>
            <p>books in your favourite genre: {favGenre}</p>
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
                        if (a.genres.includes(favGenre)) {
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

export default Recommended
