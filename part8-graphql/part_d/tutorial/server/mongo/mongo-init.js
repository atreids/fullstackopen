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

db.createCollection('persons')
db.createCollection('users')

db.users.insertOne({
    username: 'aaron',
})
