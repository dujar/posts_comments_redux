import * as actionType from '../actions/'

const posts = (state = [], action) => {
  switch(action.type){
    case actionType.ADD_POST:
    return {
      ...state
    }
    case actionType.DELETE_POST:
    return {
      ...state
    }
    case actionType.GET_POST:
    return {
      ...state
    }
    case actionType.GET_POSTS:
    return {
      ...state,
      posts: action.posts
    }
    case actionType.UPDATE_POST:
    return {
      ...state
    }
    default:
    return {
      ...state
    }
  }
}

export default posts