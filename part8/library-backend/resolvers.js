const { GraphQLError } = require('graphql')
const Author = require('./models/Author')
const Book = require('./models/Book')
const User = require('./models/User')
const jwt = require('jsonwebtoken')
const { PubSub } = require('graphql-subscriptions')
const pubsub = new PubSub()

const resolvers = {
    Query: {
        bookCount: async () => Book.collection.countDocuments(),
        authorCount: async () => Author.collection.countDocuments(),
        allBooks: async (root, args) => {
            let allBooks = await Book.find({}).populate('author')
            if(args.genre && args.genre !== 'all genres'){
              allBooks = allBooks.filter(b => b.genres.includes(args.genre))
            }

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
            let author = await Author.findOne({ name : args.author })

            const currentUser = context.currentUser

            if(!currentUser){
              throw new GraphQLError('not authenticated', {
                extensions : {
                  code : 'BAD_USER_INPUT'
                }
              })
            }

            if(!author){
              author = new Author({ name : args.author })
              await author.save()
              try {
             
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
            
            const book = new Book({ ...args, author : author })

            try {
              await book.save()
            } catch (error) {
              throw new GraphQLError('Saving book failed', {
                extension: {
                  code: 'BAD_USER_INPUT',
                  invalidArgs: args.name,
                  error
                }
              })
            }

            pubsub.publish('BOOK_ADDED', { bookAdded : book })

            return book
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
    },
    Subscription : {
      bookAdded : {
        subscribe : () => pubsub.asyncIterator('BOOK_ADDED')
      }
    }
}

module.exports = resolvers