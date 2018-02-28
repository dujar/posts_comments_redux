import axiosInstance from '../axiosRequests'
import {isLoading, hasErrored} from './helper'

import uuid from 'uuid/v4'
export const GET_POSTS = 'GET_POSTS'
export const UPDATE_POST = 'UPDATE_POSTS'
export const ADD_POST = 'ADD_POST'
export const DELETE_POST = 'DELETE_POST'
export const GET_POST = 'GET_POST'
export const VOTE_POST = 'VOTE_POST'


export const addPost = post => {
  return {
    type: ADD_POST,
    post
  }
}

export function addPostAsync(post){
  return dispatch => {
    axiosInstance.post("/posts",{
      id: uuid(),
      timestamp: new Date().valueOf(),
      title: post.title,
      body: post.body,
      author: post.author,
      category: post.category
    })
    .then(resp => dispatch(getPostsAsync()))
  }
}
export const getPosts = posts => {
  return {
    type: GET_POSTS,
    posts
  }
}

export function getPostsAsync(){
  return dispatch => {
  //  dispatch(isLoading(true))
   axiosInstance.get("/posts")
   .then(({data}) => dispatch(getPosts(data)))
  //  .then(resp => dispatch(isLoading(false)))
   .catch(err => dispatch(hasErrored(true)))
  }
}

export const updatePost = post => {
  return {
    type: UPDATE_POST,
    post
  }
}

export function updatePostAsync(post){
  return dispatch =>{
    axiosInstance.put("/posts/"+post.id,{
      body: post.body,
      title: post.title
    })
    .then(resp => dispatch(getPostsAsync()))
  }
}
export const getPost = post => {
  return {
    type: GET_POST,
    post
  }
}

export const votePost = vote => {
  return {
    type: GET_POST,
    vote
  }
}
// POST /posts/:id
// USAGE:
//   Used for voting on a post
// PARAMS:
//   option - String: Either "upVote" or "downVote"
export function votePostAsync(id,vote) {
  return dispatch => {
    axiosInstance.post("/posts/"+ id, {
      option: vote
    })
    .then(resp => dispatch(getPostsAsync()))
  }
}

export const deletePost = post => {
  return {
    type: DELETE_POST,
    post
  }
}

export function deletePostAsync(post) {
  return dispatch => {
    axiosInstance.delete("/posts/"+post.id)
    .then(resp => dispatch(getPostsAsync()))
  }
}

