const { ApolloServer } = require('@apollo/server')
const { startStandaloneServer } = require('@apollo/server/standalone')
const { v1: uuid } = require('uuid')
const mongoose = require('mongoose')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const { GraphQLError } = require('graphql')

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

/*
  you can remove the placeholder query once your first own has been implemented 
*/
const typeDefs = `
  type Author {
    name: String!
    id: ID!
    born: Int
    bookCount: Int
  }
  
  type Book {
    title: String!
    published: Int
    author: Author!
    id: ID!
    genres: [String]
  }

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    bookCount: Int!
    authorCount: Int!
    allBooks(author: String, genre: String): [Book!]
    allAuthors: [Author!]!
    me: User!
  }

  type Mutation{
    addBook(
        title: String!
        published: Int
        author: String!
        genres: [String]
    ): Book

    addAuthor(
      name: String!
      born: Int
    ): Author

    editAuthor(
      name: String! 
      setBornTo: Int!
    ): Author

    createUser(
      username: String!
    ): User

    login(
      username: String!
      password: String!
    ): Token

  }

`
const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let allBooks = await Book.find({}).populate('author')
            if(args.genre){
              allBooks = allBooks.filter(b => b.genres.includes(args.genre))
            }
            console.log(allBooks)
            if(args.author){
              allBooks = allBooks.filter(b => {
                if(b.author?.name){
                  return b.author.name === args.author
                }
              })
            }

            return allBooks
        },
        allAuthors: async () => Author.find({}),
        me: async (root, args, context) => context.currentUser
    },
    Author : {
        name: (root) => root.name,
        born: (root) => root.born,
        id: (root) => root.id,
        bookCount: async (root, args) => {
          return await Book.find({ "author" : root.id }).count()
      }

    },
    Mutation: {
        addBook: async (root, args, context) => {
            const author = await Author.findOne({ name : args.author })
            const book = new Book({ ...args, author : author })

            if(!author){
              try {
                const newAuthor = new Author({ name : args.author })
                return await newAuthor.save()
              } catch (error) {
                throw new GraphQLError('creating author failed', {
                  extension: {
                    code: 'BAD_USER_INPUT',
                    invalidArgs: args.name,
                    error
                  }
                })
              }
            }
            
            const currentUser = context.currentUser

            if(!currentUser){
              throw new GraphQLError('not authenticated', {
                extensions : {
                  code : 'BAD_USER_INPUT'
                }
              })
            }

            try {
              return await book.save()
            } catch (error) {
              throw new GraphQLError('Saving book failed', {
                extension: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
              })
            }
        },
        addAuthor: async (root, args, context) => {
          const author = new Author({ ...args })

          const currentUser = context.currentUser

          if(!currentUser){
            throw new GraphQLError('not authenticated', {
              extensions : {
                code : 'BAD_USER_INPUT'
              }
            })
          }

          try {
            return await author.save()
          } catch (error) {
            throw new GraphQLError('Saving author failed', {
              extension: {
                code: 'BAD_USER_INPUT',
                invalidArgs: args.name,
                error
              }
            })
          }
        },
        editAuthor: async (root, args, context) => {

          const author = await Author.findOne({ name: args.name })
          author.born = args.setBornTo


          const currentUser = context.currentUser

          if(!currentUser){
            throw new GraphQLError('not authenticated', {
              extensions : {
                code : 'BAD_USER_INPUT'
              }
            })
          }
          

          try {
              return await author.save()
          } catch (error) {
              throw new GraphQLError('Saving birth year failed', {
                extension: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
              })
          }
            
        },
        createUser : async (root, args) => {
          const user = new User({ username : args.username })

          try {
           return await user.save()
          } catch (error) {
            throw new GraphQLError('Creating the user failed', {
               extension : {
                code : 'BAD_USER_INPUT',
                invalidArgs : args.name,
                error
               }
            })
          }
       
        },
        login : async (root, args) => {
          const user = await User.findOne({ username : args.username })

          if( !user || args.password !== 'secret' ){
            throw new GraphQLError('wrong credentials', {
              extension : {
                code : 'BAD_USER_IMPUT'
              }
            })
          }

          const userForToken = {
            username : user.username,
            id : user._id
          }

          return { value : jwt.sign(userForToken, process.env.SECRET )}
        }
    }
}

const server = new ApolloServer({
    typeDefs,
    resolvers
})

startStandaloneServer(server, {
    listen : { port : 4000 },
    context : async ({ req, res }) => {
      const auth = req ? req.headers.authorization : null

      if(auth && auth.startsWith('Bearer ')){
        const decodedToken = jwt.verify(
          auth.substring(7), process.env.SECRET
        )
        const currentUser = await User.findById(decodedToken.id)
        return { currentUser }
      }
    }
}).then(({ url }) => {
    console.log(`Server ready at ${url}`)
})