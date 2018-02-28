import { DELETE_POST } from './posts';
import axiosInstance from '../axiosRequests';
import { getPostsAsync } from '../actions/posts';
import uuid from 'uuid/v4';
export const ADD_COMMENT = 'ADD_COMMENT';
export const DELETE_COMMENT = 'DELETE_COMMENT';
export const UPDATE_COMMENT = 'UPDATE_COMMENT';
export const GET_COMMENTS = 'GET_COMMENTS';
export const EDIT_COMMENT = 'EDIT_COMMENT';
export const VOTE_COMMENT = 'VOTE_COMMENT';

// SYNCHRONOUS ACTIONS

export const voteComment = (id, vote) => {
  return{
  type: VOTE_COMMENT, id, vote

  }
};


export function voteCommentAsync(id, vote,parentId) {
  // console.log("inside voteComment : parentId:",parentId)
  return dispatch => {
    axiosInstance
      .post('/comments/' + id, {
        option: vote
      })
      .then(resp => dispatch(getCommentsAsync(parentId)));
  };
}

export const updateComment = comment => {
  return {
    type: EDIT_COMMENT,
    comment
  };
};

export function updateCommentAsync(comment) {
  return dispatch => {
    axiosInstance
      .put('/comments/' + comment.id, {
        body: comment.body,
        timestamp: new Date().valueOf()
      })
      .then(resp => dispatch(getCommentsAsync(comment.parentId)));
  };
}

// PARAMS:
//         timestamp: timestamp. Get this however you want.
//         body: String
export const addComment = comment => {
  return {
    type: ADD_COMMENT,
    comment
  };
};

export function addCommentAsync(comment,post) {
  return dispatch => {
    axiosInstance
      .post('/comments', {
        id: uuid(),
        timestamp: new Date().valueOf(),
        body: comment.body,
        author: comment.author,
        parentId: comment.parentId
      })
      .then(resp => dispatch(getPostsAsync()))
      .then(resp => dispatch(getCommentsAsync(comment.parentId)))

  };
}
// id: Any unique ID. As with posts, UUID is probably the best here.
//         timestamp: timestamp. Get this however you want.
//         body: String
//         author: String
//         parentId: Should match a post id in the database.

export const deleteComment = id => {
  return {
    type: DELETE_COMMENT,
    id
  };
};
export const deleteCommentAsync = (comment,post) => {

  return dispatch => {
    axiosInstance
      .delete('/comments/' + comment.id)
      .then(resp => dispatch(getPostsAsync()))
      .then(resp => dispatch(getCommentsAsync(comment.parentId)))
  };
};
export const getComments = comments => {
  return {
    type: GET_COMMENTS,
    comments
  };
};

export const getCommentsAsync = postId => {
  // console.log("inside comments async: postId:",postId)
  return dispatch => {
    axiosInstance
      .get('/posts/' + postId + '/comments')
      .then(postComments => dispatch(getComments(postComments.data)));
  };
};

//i am not so sure, but the comment needs to show that the post has been deleted.
export const deletePost = post => {
  return {
    type: DELETE_POST,
    post
  };
};

// ASYNCHRONOUS actions

// GET /posts/:id/comments
// USAGE:
//   Get all the comments for a single post

// POST /comments
// USAGE:
//   Add a comment to a post

// PARAMS:
//   id: Any unique ID. As with posts, UUID is probably the best here.
//   timestamp: timestamp. Get this however you want.
//   body: String
//   author: String
//   parentId: Should match a post id in the database.
