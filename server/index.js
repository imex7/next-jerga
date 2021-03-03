const express = require('express')
const next = require('next')
const {ApolloServer, gql} = require('apollo-server-express')

const port = parseInt(process.env.PORT, 10) || 7003
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const {portfolioQueries, portfolioMutations} = require('./graphql/resolvers')
const {portfolioTypes} = require('./graphql/types')

const db = require('./database')
db.connect()

app.prepare().then(() => {
  const server = express()

  const typeDefs = gql`
    ${portfolioTypes}
    type Query {
      hello: String
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }
    type Mutation {
      createPortfolio(p: PortfolioInp): Portfolio
      updatePortfolio(id: ID, p: PortfolioInp): Portfolio
      deletePortfolio(id: ID): ID
    }
  `

  const resolvers = {
    Query: {
      ...portfolioQueries
    },
    Mutation: {
      ...portfolioMutations
    }
  }

  const apolloServer = new ApolloServer({typeDefs, resolvers})
  apolloServer.applyMiddleware({app: server})

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`>>>> Запущен на http://localhost:${port}`)
  })
})