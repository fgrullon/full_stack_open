const { startStandaloneServer } = require('@apollo/server/standalone')
const mongoose = require('mongoose')
const jwt = require('jsonwebtoken')
const { ApolloServer } = require('@apollo/server')
const { expressMiddleware } = require('@apollo/server/express4')
const { ApolloServerPluginDrainHttpServer } = require('@apollo/server/plugin/drainHttpServer')
const { makeExecutableSchema } = require('@graphql-tools/schema')
const express = require('express')
const cors = require('cors')
const http = require('http')
const { WebSocketServer } = require('ws')
const { useServer } = require('graphql-ws/lib/use/ws')
const typeDefs = require('./schema')
const resolvers = require('./resolvers')
const User = require('./models/User')

mongoose.set('strictQuery')

require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI

console.log('Connecting to ', MONGO_URI)

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB')
  })
  .catch(error => {
    console.log('Error connection to MongoDB: ', error.message)
  })

const start = async () => {
   const app = express()
   const httpServer = http.createServer(app)

   const wsServer = new WebSocketServer({
    server : httpServer,
    path : '/'
   })

   const schema = makeExecutableSchema({ typeDefs, resolvers })
   const serverCleanUp = useServer({ schema }, wsServer)

   const server = new ApolloServer({
      schema,
      plugins : [
          ApolloServerPluginDrainHttpServer({ httpServer }),
          {
            async serverWillStart() {
              return {
                async drainServer() {
                  await serverCleanUp.dispose()
                }
              }
            }
          }
      ]
   })

   await server.start()

   app.use(
    '/',
    cors(),
    express.json(),
    expressMiddleware(server, {
      context : async ({ req }) => {
        const auth = req ? req.headers.authorization : null
        if(auth && auth.startsWith('Bearer ')){
          const decodedToken = jwt.verify(auth.substring(7), process.env.SECRET)
          const currentUser = await User.findById(decodedToken.id)

          return { currentUser }
        }
      }
    })
   )

   const PORT = 4000

   httpServer.listen(PORT, () => {
    console.log(`Server is now running on http://localhost:${PORT}`)
   })
}

start()

