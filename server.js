const express = require('express')
const expressGraphQL = require('express-graphql')
const schema = require('./schema')
const PORT = 3001
const app = express()

app.use('/graphql', expressGraphQL({
  schema,
  graphiql: true
}))

app.listen(PORT, () => {
  console.log(`Servidor online na porta ${PORT}`)
})