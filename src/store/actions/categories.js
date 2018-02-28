import axiosInstance from '../axiosRequests'
import {isLoading, hasErrored} from './helper'
import React from 'react'
export const GET_CATEGORIES = 'GET_CATEGORIES'


export const getCategories = (categories) => {
  return {
    type: GET_CATEGORIES,
    categories
  }
}
export const getCategoriesAsync = () => {
  return dispatch => {
    dispatch(isLoading(true))
    axiosInstance.get("/categories")
    .then(({data}) => dispatch(getCategories(data.categories)))
    .then(resp => dispatch(isLoading(false)))

    .catch(err => {
      dispatch(hasErrored(true))
      console.log(err)
    })
  }
}