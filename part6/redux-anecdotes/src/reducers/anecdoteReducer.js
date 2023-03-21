import { createSlice } from '@reduxjs/toolkit'
import anecdoteService from '../services/anecdotes'

const anecdoteSlice = createSlice({
  name : 'anecdotes',
  initialState : [],
  reducers : {
    addAnecdote( state, action ) {
      state.push( action.payload )
    },
    addVote( state, action ) {
      const votedAnecdote = action.payload
      return state.map(anecdote => 
        anecdote.id !== votedAnecdote.id ? anecdote : votedAnecdote
      ).sort((a, b) => b.votes - a.votes) 
    },
    setAnecdotes( state, action ){
      return action.payload
    }
  }
})

export const {  addVote, setAnecdotes, addAnecdote } = anecdoteSlice.actions

export const initialAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch(setAnecdotes(anecdotes))
  } 
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.create(content)
    dispatch(addAnecdote(newAnecdote))
  }
}

export const voteAnecdote = anecdote => {
  return async dispatch => {
    const votedAnecdote = await anecdoteService.vote(anecdote)
    dispatch(addVote(votedAnecdote))
  }
}
export default anecdoteSlice.reducer

