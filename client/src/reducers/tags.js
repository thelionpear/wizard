import axios from 'axios'
import { setHeaders } from './headers'

const ADD_TAG = 'ADD_TAG'
const TAGS = 'TAGS'

export const getTags = () => {
  return (dispatch) => {
    axios.get('/api/tags')
      .then( res => dispatch({ type: TAGS, tags: res.data, headers: res.headers }))
  }
}

export const addTag = (tag) => {
  return (dispatch) => {
    axios.post('/api/tags', { tag })
      .then( res => {
        if (res.data)
          dispatch({ type: ADD_TAG, tag: res.data, headers: res.headers })
        else
          dispatch(setHeaders(res.headers))
      })
  }
}

export default ( state = [], action ) => {
  switch(action.type) {
    case TAGS:
      return action.tags
    case ADD_TAG:
      return [...state, action.tag]
    default: 
      return state
  }
}
