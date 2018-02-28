import * as actionType from '../actions/';
import {Map} from 'immutable'

const categories = (state = {}, action) => {
      console.log("ACTION:",action)
  switch (action.type) {
    case actionType.GET_CATEGORIES:
      let categories = action.categories.map(cat => cat.name)
      return {
        categories
      };
    default:
      return {
        ...state
      };
  }
};

export default categories;
