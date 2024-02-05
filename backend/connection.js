const {Client} = require('pg')

const client = new Client({
    host: "localhost",
    user: "postgres",
    port: 5432,
    password: "Sushilkc2002",
    database: "rec-app"
})

module.exports = client
