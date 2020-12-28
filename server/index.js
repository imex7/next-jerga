const express = require('express')
const next = require('next')
const {graphqlHTTP} = require('express-graphql')
const { buildSchema } = require('graphql');

const port = parseInt(process.env.PORT, 10) || 7003
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

const {portfolioResolvers} = require('./graphql/resolvers')
const {portfolioTypes} = require('./graphql/types')

app.prepare().then(() => {
  const server = express()

  const schema = buildSchema(`
    ${portfolioTypes}
    type Query {
      hello: String
      portfolio(id: ID): Portfolio
      portfolios: [Portfolio]
    }
    type Mutation {
      createPortfolio(p: PortfolioInp): Portfolio
    }
  `)

  // const root = {
  //   ...portfolioResolvers
  // }

  server.use('/graphql', graphqlHTTP({
    schema,
    rootValue: portfolioResolvers,
    graphiql: true
  }))

  server.all('*', (req, res) => {
    return handle(req, res)
  })

  server.listen(port, (err) => {
    if (err) throw err
    console.log(`>>>> Запущен на http://localhost:${port}`)
  })
})