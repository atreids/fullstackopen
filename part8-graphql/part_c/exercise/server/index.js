const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const { Author, Book } = require('./mongo')

const typeDefs = gql`
    type Author {
        name: String!
        id: ID!
        born: Int!
    }

    type Book {
        title: String!
        published: Int!
        author: Author!
        id: ID!
        genres: [String!]!
    }

    type allAuthors {
        name: String!
        bookCount: Int
        born: Int
        id: ID
    }

    type Query {
        bookCount: Int!
        authorCount: Int!
        allBooks(author: String, genre: String): [Book!]!
        allAuthors: [allAuthors!]!
    }

    type Mutation {
        addBook(
            title: String!
            author: String!
            published: Int!
            genres: [String!]!
        ): Book!
        editAuthor(name: String!, setBornTo: Int!): Author
        addAuthor(name: String!, born: Int!): Author!
    }
`

const resolvers = {
    Query: {
        bookCount: async () => {
            try {
                const books = await Book.find()
                return books.length
            } catch (e) {
                throw new Error(e.message)
            }
        },
        authorCount: async () => {
            try {
                const authors = await Author.find()
                return authors.length
            } catch (e) {
                throw new Error(e.message)
            }
        },
        allBooks: async () => {
            try {
                const books = await Book.find()
                const authors = await Author.find()
                const allBooks = books.map(
                    ({ title, published, author_id, genres, id }) => {
                        const [author] = authors.filter(
                            (author) =>
                                author.id.toString() === author_id.toString()
                        )
                        return {
                            title,
                            published,
                            author: {
                                name: author.name,
                                born: author.born,
                                id: author.id,
                            },
                            genres,
                            id,
                        }
                    }
                )
                return allBooks
            } catch (e) {
                throw new Error(e.message)
            }
        },
        allAuthors: async () => {
            try {
                const authors = await Author.find()
                const books = await Book.find()
                const allAuthors = authors.map((author) => {
                    const bookcount = books.filter(
                        (book) => book.author === author.id
                    ).length
                    return {
                        name: author.name,
                        bookCount: bookcount,
                        born: author.born,
                        id: author.id,
                    }
                })
                return allAuthors
            } catch (error) {
                throw new Error(error.message)
            }
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            try {
                const [author] = await Author.find({ name: args.author })
                if (!author) {
                    throw new UserInputError('Author not found')
                }
                const book = new Book({ ...args, author_id: author.id })
                const currentYear = new Date().getFullYear()
                if (
                    book.title.length < 2 ||
                    book.published < 0 ||
                    book.published > currentYear ||
                    book.genres.length === 0
                ) {
                    throw new UserInputError('Invalid book details')
                }
                await book.save()
                return {
                    title: book.title,
                    published: book.published,
                    author: {
                        name: author.name,
                        id: author.id,
                        born: author.born,
                    },
                    id: book.id,
                    genres: book.genres,
                }
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        addAuthor: async (root, args) => {
            try {
                const author = new Author({ ...args })
                const currentYear = new Date().getFullYear()
                if (
                    author.name.length < 2 ||
                    author.born < 0 ||
                    author.born > currentYear
                ) {
                    throw new UserInputError('Invalid Author Details')
                }
                await author.save()
                return author
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        editAuthor: async (root, args) => {
            const [author] = await Author.find({ name: args.name })
            if (author) {
                try {
                    await Author.updateOne(
                        { name: args.name },
                        { born: args.setBornTo }
                    )
                    return author
                } catch (error) {
                    throw new UserInputError('Author Not Found', {
                        invalidArgs: args,
                    })
                }
            }
            return null
        },
    },
}

const server = new ApolloServer({
    typeDefs,
    resolvers,
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
