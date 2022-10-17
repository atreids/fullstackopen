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
                console.log(books)
                return books
            } catch (e) {
                throw new Error(e.message)
            }
        },
        allAuthors: async () => {
            try {
                const authors = await Author.find()
                // const books = await Book.find()
                // const bookcount = books.filter(
                //     (b) => b.author === author.name
                // ).length
                console.log(authors)
                return author
            } catch (error) {
                throw new Error(error.message)
            }
        },
    },
    Mutation: {
        addBook: async (root, args) => {
            try {
                const author = await Author.find({ name: args.author })
                console.log(author)
                const book = new Book({ ...args, author: author._id })
                await book.save()
                return book
            } catch (error) {
                throw new UserInputError(error.message, {
                    invalidArgs: args,
                })
            }
        },
        editAuthor: (root, args) => {
            const author = authors.find((a) => a.name === args.name)
            if (author) {
                authors = authors.map((a) =>
                    a.name === author.name ? { ...a, born: args.setBornTo } : a
                )
                return {
                    name: author.name,
                    id: author.id,
                    born: args.setBornTo,
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
