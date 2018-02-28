import * as actionType from '../actions/';
const initialState = []

const comments = (state=initialState, action) => {
  switch (action.type) {
    case actionType.GET_COMMENTS:
      return {
        comments: action.comments
      };
    case actionType.ADD_COMMENT:
      return {
        ...state
      };
    case actionType.DELETE_COMMENT:
      return {
      state
      };
    case actionType.UPDATE_COMMENT:
      return {
        ...state
      };
    default:
      return {
        ...state
      };
  }
};

export default comments;
