import * as actionType from '../actions/';

const helper = (state = [], action) => {
  switch (action.type) {
    case actionType.IS_LOADING:
      return {
        ...state,
        isLoading: action.bool
      };
    case actionType.HAS_ERRORED:
      return {
        ...state,
        hasErrored: action.bool
      };
    default:
      return state;
  }
};

export default helper;
