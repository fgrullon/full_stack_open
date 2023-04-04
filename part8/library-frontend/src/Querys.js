import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
    query {
        allAuthors {
            name,
            born,
            id,
            bookCount
        }
    }
`

const BOOK_DETAIL = gql`
  fragment BookDetails on Book {
    title,
    published,
    author{
        name,
        born
    },
    genres
  }
`
export const ALL_BOOKS = gql`
    query {
        allBooks {
            ...BookDetails
        }
    }
    ${BOOK_DETAIL}
`
export const ALL_BOOKS_BY_GENRE = gql`
    query ByGenres ($genre : String!){
        allBooks (genre : $genre) {
        ...BookDetails
        }
    }
    ${BOOK_DETAIL}
`

export const CREATE_BOOK = gql`
    mutation createBook(
        $title: String!, 
        $published: Int!, 
        $author: String!, 
        $genres: [String!]) 
        {
        addBook (
            title: $title,
            published: $published,
            author: $author,
            genres: $genres
        ){
            ...BookDetails
        }
    }
    ${BOOK_DETAIL}
`

export const BOOK_ADDED = gql`
    subscription {
        bookAdded{
            ...BookDetails
        }
    }
    ${BOOK_DETAIL}
`

export const CREATE_AUTHOR =gql`
    mutation createAuthor(
        $name: String!,
        $born: Int,
    ){
        addAuthor(
            name: $name,
            born: $born
        ){
            name,
            born,
            bookCount,
            id
        }
    }
`

export const EDIT_BIRTH_YEAR = gql`
    mutation editBirth($name: String!, $setBornTo: Int!){
        editAuthor(
            name: $name,
            setBornTo: $setBornTo
        ){
            name,
            born,
            bookCount,
            id
        }
    }
`

export const LOGIN = gql`
mutation login($username: String!, $password: String!) {
    login(username: $username, password: $password)  {
      value
    }
  }
`

export const GET_USER = gql`
    query {
        me {
            username,
            favoriteGenre
        }
    }
`