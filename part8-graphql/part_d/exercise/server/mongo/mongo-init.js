db.createUser({
    user: 'the_username',
    pwd: 'the_password',
    roles: [
        {
            role: 'dbOwner',
            db: 'the_database',
        },
    ],
})

db.createCollection('authors')
db.createCollection('books')
db.createCollection('users')

// db.authors.insertMany([
//     {
//         name: 'Robert Martin',
//         born: 1952,
//     },
//     {
//         name: 'Martin Fowler',
//         born: 1963,
//     },
//     {
//         name: 'Fyodor Dostoevsky',
//         born: 1821,
//     },
//     {
//         name: 'Joshua Kerievsky',
//         born: 1821,
//     },
//     {
//         name: 'Sandi Metz',
//         born: 1821,
//     },
// ])

// db.books.insertMany([
//     {
//         title: 'Clean Code',
//         published: 2008,
//         author: '634d6437ee1edf8903fbfcf2',
//         genres: ['refactoring'],
//     },
//     {
//         title: 'Agile software development',
//         published: 2002,
//         author: 'Robert Martin',
//         genres: ['agile', 'patterns', 'design'],
//     },
//     {
//         title: 'Refactoring, edition 2',
//         published: 2018,
//         author: 'Martin Fowler',
//         genres: ['refactoring'],
//     },
//     {
//         title: 'Refactoring to patterns',
//         published: 2008,
//         author: 'Joshua Kerievsky',
//         genres: ['refactoring', 'patterns'],
//     },
//     {
//         title: 'Practical Object-Oriented Design, An Agile Primer Using Ruby',
//         published: 2012,
//         author: 'Sandi Metz',
//         genres: ['refactoring', 'design'],
//     },
//     {
//         title: 'Crime and punishment',
//         published: 1866,
//         author: 'Fyodor Dostoevsky',
//         genres: ['classic', 'crime'],
//     },
//     {
//         title: 'The Demon',
//         published: 1872,
//         author: 'Fyodor Dostoevsky',
//         genres: ['classic', 'revolution'],
//     },
// ])
