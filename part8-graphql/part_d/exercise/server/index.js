const {
    ApolloServer,
    gql,
    UserInputError,
    AuthenticationError,
} = require('apollo-server')
const { v1: uuid } = require('uuid')
const { Author, Book, User } = require('./mongo')
const jwt = require('jsonwebtoken')

const JWT_SECRET = 'secret'

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

    type User {
        username: String!
        favouriteGenre: String!
        id: ID!
    }

    type Token {
        value: String!
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
        me: User
        users: [User]!
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
        createUser(username: String!, favouriteGenre: String!): User
        login(username: String!, password: String!): Token
    }
`

const resolvers = {
    Query: {
        me: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not logged in')
            }
            return currentUser
        },
        users: async (root, args, { currentUser }) => {
            try {
                const users = await User.find()
                return users
            } catch (e) {
                throw new Error(e.message)
            }
        },
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
        createUser: async (root, args) => {
            try {
                const userParams = {
                    ...args,
                    password: 'password',
                }
                const user = new User({ ...userParams })
                await user.save()
                return user
            } catch (error) {
                throw new UserInputError(error.message, { invalidArgs: args })
            }
        },
        login: async (root, args) => {
            const user = await User.findOne({ username: args.username })
            if (args.password !== 'password' || !user) {
                throw new UserInputError('invalid credentials')
            }
            const userForToken = {
                username: user.username,
                id: user._id,
            }
            return { value: jwt.sign(userForToken, JWT_SECRET) }
        },
        addBook: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not logged in')
            }
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
        editAuthor: async (root, args, { currentUser }) => {
            if (!currentUser) {
                throw new AuthenticationError('not logged in')
            }
            const [author] = await Author.find({ name: args.name })
            if (author) {
                try {
                    await Author.updateOne(
                        { name: args.name },
                        { born: args.setBornTo }
                    )
                    return await Author.findOne({ name: args.name })
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
    context: async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if (auth && auth.toLowerCase().startsWith('bearer ')) {
            const token = auth.substring(7)
            const decodedToken = jwt.verify(token, JWT_SECRET)
            const currentUser = await User.findById(decodedToken.id)
            return { currentUser }
        }
    },
})

server.listen().then(({ url }) => {
    console.log(`Server ready at ${url}`)
})
