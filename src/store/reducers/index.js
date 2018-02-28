import categories from './categories';
import posts from './posts';
import comments from './comments';
import helper from './helper';

import { combineReducers } from 'redux';

const rootReducer = combineReducers({
  categories,
  posts,
  comments,
  helper
});

export default rootReducer;
